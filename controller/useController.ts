import { Request , Response } from "express";
import { userUtil } from "../util/userUtil";
import { IGroup } from "../models/IGroup";

export const getAlluser = async (request:Request,response:Response)=>{
        try{
            let useData:IGroup[] = await userUtil.getAllUserByDB()
            return response.status(200).json(useData)
        }catch(error){
            return response.status(500).json({msg:"Server Error"})
        }
}