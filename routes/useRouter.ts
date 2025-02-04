import {  Request , Response , Router} from "express"
import * as userController from "../controller/useController"

const userRouter:Router = Router()

userRouter.get("/",async (requset:Request,response:Response)=>{
    await userController.getAlluser(requset,response)
})

export default userRouter