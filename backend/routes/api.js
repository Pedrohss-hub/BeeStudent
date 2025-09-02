import {insertTH, getAllRows} from '../controllers/controllers.js'

export function apiIndex (req, res){
    let method = req.method
    let body = ''

    if(method == "POST"){
        req.on("data", async chunck=>{
            body = await chunck.toString()
            body = await JSON.parse(body)
            insertTH(body.row)
        })
    }

    if (method == "GET"){
        getAllRows().then((response)=>{
            //res.end(JSON.stringify({mesage:response}))
        
            res.end(JSON.stringify({mesage:"Teste"}))
        })
    }

}