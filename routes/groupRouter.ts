import {  Request , Response , Router} from "express"
import * as groupController from "../controller/groupController"
import { body } from "express-validator"


const userRouter:Router = Router()

/**
@usage : to get all contacts
@methodm: GET
@params : no-params
@url : http://localhost:9988/groups
*/
userRouter.get("/",async (requset:Request,response:Response)=>{
    await groupController.getAllGroups(requset,response)
})



/**
 @usage : create group
@methodm: POST
@params : name
@url : http://localhost:9988/groups
*/
userRouter.post("/", [body('name').not().isEmpty().withMessage("Name is Required")],
    async (requset:Request,response:Response)=>{
    console.log("post");
    await groupController.getGroups(requset,response)
})

/**
@usage : to get all contacts
@methodm: GET
@params : no-params
@url : http://localhost:9988/groups/:groupId
*/
userRouter.get("/:groupId",async (requset:Request,response:Response)=>{
    await groupController.getGroup(requset,response)
})

export default userRouter