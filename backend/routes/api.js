import {insertTH} from '../controllers/controllers.js'

export function apiIndex (req){
    let method = req.method
    let body = ''

    if(method == "POST"){
        req.on("data", async chunck=>{
            body = await chunck.toString()
            body = await JSON.parse(body)
            insertTH(body.row)
        })
    }

}