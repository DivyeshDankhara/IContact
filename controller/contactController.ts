import { Request , Response } from "express";
import { IContact } from "../models/IContact";
import mongoose from "mongoose";
import ContactTable from "../database/ContactSchema";

export const getAllContact = async (request:Request, response:Response) => {
    try {
        let users: IContact[] | undefined = await ContactTable.find();
        if(users) {
            return response.status(200).json(users);
        } 
    } catch (erroe: any) {
        return response.status(500).json({"msg":"Data not found"});
    }
}

export const createContact = async (request:Request, response:Response) => {
    let {name,imageUrl,mobile,email,company,title,groupId} = request.body;
    let theContact: IContact | null | undefined = await new ContactTable({
        name: name,
        imageUrl: imageUrl,
        mobile: mobile,
        email: email,
        company: company,
        title: title,
        groupId: groupId,
    }).save();

    if(theContact) {
        return response.status(200).json({
            data: theContact,
            msg: "User is Created",
        })
    }
}

export const getContact = async (request:Request, response:Response) => {
    let { contactId } = request.params;
    const mongoContactId = new mongoose.Types.ObjectId(contactId);
    let theContact : IContact | undefined | null = await ContactTable.findById(
        mongoContactId
    );
    if(!theContact){
        return response.status(404).json({
            data: null,
            error: "No Group is found",
        })
    }
    return response.status(200).json(theContact);
}

export const updateContact = async (request: Request, response: Response) => {
    let { contactId } = request.params;
    let { name, imageUrl, mobile, email, company, title, groupId } = request.body;
    // const mongoUserId = new mongoose.Types.ObjectId(contactId);
    let theContact: IContact | undefined | null = await ContactTable.findByIdAndUpdate(
        contactId,
        {
            name,
            imageUrl,
            mobile,
            email,
            company,
            title,
            groupId,
        },
        {
            new: true
        }
    );
    if (!theContact) {
        return response.status(500).json({
            data: null,
            error: "No User is found",
        });
    }
    return response.status(200).json(theContact);
};

export const deleteContact = async (request: Request, response: Response) => {
    let { contactId } = request.params;
    // const mongoUserId = new mongoose.Types.ObjectId(userId);
    let thecontact: IContact | undefined | null = await ContactTable.findByIdAndDelete(
        contactId,
    );
    if (!thecontact) {
        return response.status(500).json({
            data: null,
            error: "No Group is found",
        });
    }
    return response.status(200).json(thecontact);
};