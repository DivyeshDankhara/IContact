import {  Request , Response , Router} from "express"
import * as userController from "../controller/groupController"
import { body } from "express-validator"


const userRouter:Router = Router()

/**1
@usage : to get all contacts
@methodm: GET
@params : no-params
@url : http://localhost:9999/contacts
*/
userRouter.get("/",async (requset:Request,response:Response)=>{
    await userController.getAllGroups(requset,response)
})

/**1
@usage : create group
@methodm: POST
@params : name
@url : http://localhost:9999/groups
*/
userRouter.post("/", [body('name').not().isEmpty().withMessage("Name is Required")],
    async (requset:Request,response:Response)=>{
    console.log("post");
    await userController.createGroups(requset,response)
})

export default userRouter