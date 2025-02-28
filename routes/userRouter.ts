import { Request , Response , Router} from "express"
import * as userController from "../controller/userController"
import {body} from "express-validator"

const userRouter:Router = Router()

/**
@usage : to get all users
@method : GET
@params : no-params
@url : http://127.0.0.1:9988/users
*/
userRouter.get("/",async (request:Request, response:Response) => {
    await userController.getAllUsers(request,response)
})

/**
@usage : create user
@method : POST
@params : name
@url : http://127.0.0.1:9988/users
*/
userRouter.post("/register", 
    [
        body('username').not().isEmpty().withMessage("Name is Required"),
        body("email").not().isEmpty().withMessage("Email is Required"),
        body("password").isStrongPassword().withMessage("Strong Password is Required"),
        // body("imageUrl").not().isEmpty().withMessage("Email is Required"),
        // body("isAdmin").not().isEmpty().withMessage("Email is Required")
    ],
    async (request:Request, response:Response) => {
        console.log("post");
        await userController.registerUser(request,response)
    }
)

/**
@usage : to get users by id
@method : GET
@params : userId
@url : http://127.0.0.1:9988/users/:userId
*/
userRouter.get("/:userId",async (request,response) => {
    await userController.getUser(request,response)
})

/**
@usage : to get users by id
@method : GET
@params : userId
@url : http://127.0.0.1:9988/users/:userId
*/
userRouter.put("/:userId", async (request: Request, response: Response) => {
    await userController.updateUser(request, response)
})

// delete
/**
@usage : to delete users by id
@method : DELETE
@params : userId
@url : http://127.0.0.1:9988/users/:userId
*/
userRouter.delete("/:userId", async (request: Request, response: Response) => {
    await userController.deleteUser(request, response)
})

export default userRouter