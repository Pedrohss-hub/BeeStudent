import * as cheerio from 'cheerio';
import fs from 'fs';

const urlUSP = 'https://uspdigital.usp.br/jupiterweb/jupColegiadoLista?tipo=D'

async function getHtml(URL) {
    let date = await fetch(URL);
    date = await date.arrayBuffer()
    const decoder = new TextDecoder('iso-8859-1')
    const html = decoder.decode(date);
    return html;
}

export async function getAllCourses() {
    let objCourses = new Object()
    let result = []

    const res = await getHtml(urlUSP)
    let $ = cheerio.load(res)

    for(let link of $('a.link_gray')){
        let unity = $(link).text().trim()
        let hrefUnity = $(link).attr('href')

        let $resp = await getHtml(`https://uspdigital.usp.br/jupiterweb/${hrefUnity}`)
        $resp = cheerio.load($resp)
        let hrefCourses = $resp('a.link_gray')[0]
        hrefCourses = $(hrefCourses).attr('href')

        let $respo = await getHtml(`https://uspdigital.usp.br/jupiterweb/${hrefCourses}`)
        $respo = cheerio.load($respo)
        let warning = $respo('span.txt_verdana_10pt_red')[0]

        if(warning == undefined){ 
            let i = 1

            let objUnity = {[`${unity}`]:{[`${i}`]:{}}}
            //Iterar sobre cada curso da Unidade
            for(let link of $respo('a.link_gray')){

                let nameCourse = $respo(link).text().trim()
                if(!nameCourse.includes("Anteriores")){                    
                    let hrefCourse = $respo(link).attr('href') 
                    objUnity[unity][i] = [nameCourse, hrefCourse]

                    i++
                }
            }

            objCourses[unity] = objUnity[unity]
        }
    }

    return objCourses
}

async function createJson() {
    const jsonString = JSON.stringify(await getAllCourses(), null, 2)

    fs.writeFileSync("dataCourses.json", jsonString)

    //console.log("Salvo")
}

//createJson()
    