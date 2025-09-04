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

console.log(objPeriods)
return objPeriods
}

getAllDisciplines("https://uspdigital.usp.br/jupiterweb/listarGradeCurricular?codcg=48&codcur=48015&codhab=103&tipo=N")