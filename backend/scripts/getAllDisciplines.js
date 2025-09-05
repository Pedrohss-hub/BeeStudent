import * as cheerio from 'cheerio'

function indexSection (textHtml, keyWord, type){
    let indexArr = []
    let indexWord = textHtml.indexOf(keyWord)

    if (keyWord == "Período") {
        while(indexWord != -1){
        for (let i = indexWord; i>=0; i--){
            if (/\d/.test(textHtml[i])){
                indexArr.push(i)
                break                
            }
        }
        indexWord = textHtml.indexOf(keyWord, indexWord + 1)
        } 

    } else {
        while(indexWord != -1){
        indexArr.push(indexWord)
        indexWord = textHtml.indexOf(keyWord, indexWord + 1)
        }
    }
    
    return indexArr
}

function getDiscipline (htmlCheerio, objPeriod){
    let codDiscipline, nameDiscipline, credAula, credTrab, CH, CE, CP, ATPA, EXT
    let c = 0
    htmlCheerio('tr.txt_verdana_8pt_gray').each((i,tr)=>{
        codDiscipline = htmlCheerio(tr).find('td:eq(0)').text().trim()

        if(codDiscipline != "ou"){
            nameDiscipline = htmlCheerio(tr).find('td:eq(1)').text().trim()
            credAula = htmlCheerio(tr).find('td:eq(2)').text().trim()
            credTrab = htmlCheerio(tr).find('td:eq(3)').text().trim()
            CH = htmlCheerio(tr).find('td:eq(4)').text().trim()
            CE = htmlCheerio(tr).find('td:eq(5)').text().trim()
            CP = htmlCheerio(tr).find('td:eq(6)').text().trim()
            ATPA = htmlCheerio(tr).find('td:eq(7)').text().trim()
            EXT = htmlCheerio(tr).find('td:eq(8)').text().trim()

            c++
            objPeriod[c] = {"Nome":nameDiscipline,"Cod":codDiscipline,"credAula":credAula,"credTrab":credTrab,"CH":CH,"CE":CE,"CP":CP,"ATPA":ATPA,"EXT":EXT}
        }

    })

    return objPeriod

}

function constructDisciplines (arrIndexPeriod, tableDisciplines, objPeriods) {
    for (let c = 0; c < arrIndexPeriod.length ; c++){

    let objPeriod = new Object
    let begin = arrIndexPeriod[c]
    let end =  arrIndexPeriod[c+1]
    let period = tableDisciplines.slice(begin, end)
    let periodNumber = tableDisciplines[arrIndexPeriod[c]]

    period = cheerio.load("<table>"+period+"</table>")

    let objDisciplines = getDiscipline(period,objPeriod)

    objPeriods[`period ${periodNumber} `] = objDisciplines
    }

    return objPeriods    
}

async function getHtml(URL) {
        let date = await fetch(URL);
        date = await date.arrayBuffer()
        const decoder = new TextDecoder('iso-8859-1')
        const html = decoder.decode(date);
        return html;
}

export async function getAllDisciplines(URL){
    //Principais tópicos #658CCF

    const res = await getHtml(URL)

    let objPeriods
    let objAllDisciplines = new Object()
    let indexSubTitles = indexSection(res, '#658CCF')

    for(let i = 0; i < 3; i++){
        let tableDisciplines = res.slice(indexSubTitles[i], indexSubTitles[i+1])
        let sectionName = cheerio.load("<table>"+tableDisciplines+"</table>")
        let indexPeriod = indexSection(tableDisciplines,'Período')

        sectionName = sectionName('b:contains("Disciplinas")').text().replace(/\s+/g, ' ').trim()

        objPeriods = new Object()
        objAllDisciplines[`${sectionName}`] = constructDisciplines(indexPeriod, tableDisciplines, objPeriods)
    }

    return objAllDisciplines
}

//getAllDisciplines("https://uspdigital.usp.br/jupiterweb/listarGradeCurricular?codcg=48&codcur=48015&codhab=103&tipo=N")