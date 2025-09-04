import { getAllDisciplines } from "./getAllDisciplines.js";
//import { getAllCourses } from "./getAllCourses.js";
import dados from "./dados.json" with {type: "json"};
import fs from 'fs';

async function constructJson (){
    //let objAllCourses = await getAllCourses()
    let objAllCourses = dados

    let dataUSP = new Object()

    for (const [nameUnity, objCourses] of Object.entries(objAllCourses)){
        console.log(nameUnity)

        let i = 1
        let objUnity = {[`${nameUnity}`]:{}}

        for(const value of Object.entries(objCourses)){
            let nameCurse = value[1][0]
            let href = `https://uspdigital.usp.br/jupiterweb/${value[1][1]}`

            objUnity[nameUnity][nameCurse] = await getAllDisciplines(href)
            i++
            //console.log(await getAllDisciplines(href))
        }
        //console.log(objUnity)

        dataUSP[nameUnity] = objUnity[nameUnity]

    }
      
    return dataUSP
}

async function createJson() {
    let t0 = performance.now()

    const jsonString = JSON.stringify(await constructJson(), null, 2)

    fs.writeFileSync("dataUSP.json", jsonString)

    let t1 = performance.now()
    
    console.log(`Tempo de execução: 00:${(t1-t0)/60000}`)
}

createJson()

