import * as cheerio from 'cheerio'

export async function getAllDisciplines (URL){
 
async function getHtml(URL) {
    let date = await fetch(URL);
    date = await date.arrayBuffer()
    const decoder = new TextDecoder('iso-8859-1')
    const html = decoder.decode(date);
    return html;
}

//Principais tópicos #658CCF

function indexSection (textHtml, keyWord){
    let indexArr = []
    let indexWord = textHtml.indexOf(keyWord)

    while(indexWord != -1){
        indexArr.push(indexWord)
        indexWord = textHtml.indexOf(keyWord, indexWord + 1)
    }

    return indexArr
}

function getDiscipline (htmlCheerio, objPeriod){
    let codDiscipline, nameDiscipline
    htmlCheerio('tr.txt_verdana_8pt_gray').each((i,discipline)=>{
        let bruteCod = htmlCheerio(discipline).find('td:eq(0)').text()
        let bruteDiscipline = htmlCheerio(discipline).find('td:eq(1)').text()

        //Tratando código disciplina
        bruteCod = bruteCod.replace('\n', '')
        codDiscipline = bruteCod.replace(/\s+/g, '')

        //Tratando título discplina
        bruteDiscipline = bruteDiscipline.split("").slice(1)
        nameDiscipline = bruteDiscipline.join("")

        objPeriod[i+1] = [codDiscipline,nameDiscipline]
    })
    return objPeriod

}

let objPeriods

await getHtml(URL).then((res)=>{
    let indexSubTitles = indexSection(res, '#658CCF')

    const mainDiscipline = res.slice(indexSubTitles[0], indexSubTitles[0+1])
    
    let indexPeriod = indexSection(mainDiscipline,'Período')

    objPeriods = new Object

    for (let c = 0; c < indexPeriod.length ; c++){
        let objPeriod = new Object
        let begin = indexPeriod[c]
        let end =  indexPeriod[c+1]
        let period = mainDiscipline.slice(begin, end)

        period = cheerio.load("<table>"+period+"</table>")
    
        let objDisciplines = getDiscipline(period,objPeriod)

        objPeriods[`period ${c+1} `] = objDisciplines
    }    
})

return objPeriods
}