import { Request , Response } from "express";
import { userUtil } from "../util/userUtil";
import { IGroup } from "../models/IGroup";
import mongoose from "mongoose";
import GroupsTable from "../database/GroupSchema";


/**1
@usage : to get all contacts
@methodm: GET
@params : no-params
@url : http://localhost:9999/contacts
*/
export const getAllGroups = async (request:Request, response:Response) => {
    try {
        let groups: IGroup[] | undefined = await GroupsTable.find();
        if(groups) {
            return response.status(200).json(groups);
        }
    } catch (error: any) {
        return response.status(500).json({"msg":"Data not found"});
    }
}
