import dados from "./dataUSP.json" with {type: "json"};


for (let i of Object.entries(dados)){
    for (let c of Object.entries(i[1])){
        
        for(let o of Object.entries(c[1])){

            for(let p of Object.entries(o[1])){

                    for(let q of Object.entries(p[1])){
                        
                        let atpa = q[1]["ATPA"]
                        if(q[1]["EXT"] != "" && q[1]["EXT"] != 0 && c[0] == "Matemática - Licenciatura"){
                            console.log(c[0])
                            console.log(o[0])
                            console.log(p[0])
                            //console.log(atpa)
                            console.log(q[1]["EXT"])
                            console.log()

                        }
                    }
            }
        }
    }
}