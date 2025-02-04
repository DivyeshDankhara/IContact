import path, { resolve } from "path"
const jsonfile  = require('jsonfile')
import { IBooks } from "../models/IBooks"

export class userUtil{
    private static userJsonPath = path.join(__dirname,"..","db","books.json")

    public static getAllUserByDB():Promise<IBooks[]>{
            return new Promise((resolve,rejects)=>{
                jsonfile.readFile(this.userJsonPath,(err:any,data:any)=>{
                    if(err){
                        rejects(err)
                    }else{
                        resolve(data)
                    }
                })
            })
    }


}
