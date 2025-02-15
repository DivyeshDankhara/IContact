import { Request, Response, Router } from "express";
import * as contactController from "../controller/contactController"
import { body } from "express-validator";

const contactRouter:Router = Router()

contactRouter.get("/",async (request:Request, response:Response) => {
    await contactController.getAllContact(request,response)
})

contactRouter.post("/", [body('username').not().isEmpty().withMessage("Name is Required")],
    async (request:Request, response:Response) => {
        console.log("post");
        await contactController.createContact(request,response)
    }
)

contactRouter.get("/:contactId",async (request,response) => {
    await contactController.getContact(request,response)
})

contactRouter.put("/:contactId", async (request: Request, response: Response) => {
    await contactController.updateContact(request, response)
})

contactRouter.delete("/:contactId", async (request: Request, response: Response) => {
    await contactController.deleteContact(request, response)
})

export default contactRouter