import { Request , Response } from "express";
import { userUtil } from "../util/userUtil";
import { IBooks } from "../models/IBooks";

export const getAlluser = async (request:Request,response:Response)=>{
        try{
            let useData:IBooks[] = await userUtil.getAllUserByDB()
            return response.status(200).json(useData)
        }catch(error){
            return response.status(500).json({msg:"Server Error"})
        }
}