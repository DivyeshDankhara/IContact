import {  Request , Response , Router} from "express"
import * as userController from "../controller/groupController"

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

export default userRouter