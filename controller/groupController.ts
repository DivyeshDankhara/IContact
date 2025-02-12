import { Request , Response } from "express";
import { userUtil } from "../util/userUtil";
import { IGroup } from "../models/IGroup";
import mongoose from "mongoose";
import GroupsTable from "../database/GroupSchema";


/**1
@usage : to get all contacts
@methodm: GET
@params : no-params
@url : http://localhost:9988/contacts
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


/**1
 @usage : create group
@methodm: POST
@params : name
@url : http://localhost:9988/groups
*/
export const getGroups = async (request:Request, response:Response) => {
    let {name} = request.body;
    let theGroup: IGroup | null | undefined = await new GroupsTable({
        name: name,
    }).save();
    
    if(theGroup) {
        return response.status(200).json({
            data: theGroup,
            msg: "Group is Created",
        })
    }
}

/**1
@usage : to get all contacts
@methodm: GET
@params : no-params
@url : http://localhost:9988/groups/:groupId
*/
export const getGroup = async (request:Request, response:Response) => {
    let { groupId } = request.params;
    const mongoGroupId = new mongoose.Types.ObjectId(groupId);
    let theGroup : IGroup | undefined | null = await GroupsTable.findById(
        mongoGroupId
    );
    if(!theGroup){
        return response.status(404).json({
            data: null,
            error: "No Group is found",
        });
    }
    return response.status(200).json(theGroup);
}