const cheerio = require('cheerio')
const URL = 'https://uspdigital.usp.br/jupiterweb/listarGradeCurricular?codcg=45&codcur=45024&codhab=4&tipo=N'

async function getHtml(URL) {
    const date = await fetch(URL);
    const html = await date.text();
    return html;
}

//Principais tópicos #658CCF

getHtml(URL).then((res)=>{
    let indexSubTitles = []
    let indexHtml = res.indexOf('#658CCF')
    
    while(indexHtml !== -1){    
        indexSubTitles.push(indexHtml)

        indexHtml = res.indexOf('#658CCF', indexHtml + 1)
    }

    //console.log(indexSubTitles)

    const mainDiscipline = res.slice(indexSubTitles[0], indexSubTitles[0+1])


    const $ = cheerio.load(mainDiscipline);

    
    $('tr.txt_verdana_8pt_gray').each((i,discipline)=>{
        const codDiscipline = $(discipline).find('td:eq(0)').text()
        const nameDiscipline = $(discipline).find('td:eq(1)').text()
        console.log(`${codDiscipline} ${nameDiscipline}`)
    })
      
    
})