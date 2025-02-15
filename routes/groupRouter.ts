import {  Request , Response , Router} from "express"
import * as groupController from "../controller/groupController"
import { body } from "express-validator"

const groupRouter:Router = Router()

/**
@usage : to get all groups 
@method: GET
@params : no-params
@url : http://localhost:9988/groups
*/
groupRouter.get("/",async (requset:Request,response:Response)=>{
    await groupController.getAllGroups(requset,response)
})


/**
 @usage : create group
@methodm: POST
@params : name
@url : http://localhost:9988/groups
*/
groupRouter.post("/", [body('name').not().isEmpty().withMessage("Name is Required")],
    async (requset:Request,response:Response)=>{
    console.log("post");
    await groupController.createGroups(requset,response)
})

/**
@usage : to get group by id
@methodm: GET
@params : groupId
@url : http://localhost:9988/groups/:groupId
*/
groupRouter.get("/:groupId",async (requset:Request,response:Response)=>{
    await groupController.getGroup(requset,response)
})

/**
@usage : to update group by id
@methodm: PUT
@params : groupId
@url : http://localhost:9988/groups/:groupId
*/
groupRouter.put("/:groupId", async (request: Request, response: Response) => {
    await groupController.updateGroup(request, response)
})

/**
@usage : to delete group by id
@methodm: DELETE
@params : groupId
@url : http://localhost:9988/groups/:groupId
*/
groupRouter.delete("/:groupId", async (request: Request, response: Response) => {
    await groupController.deleteUser(request, response)
})

export default groupRouter