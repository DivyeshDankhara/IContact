import { Request , Response } from "express";
import { IUser } from "../models/IUser";
import mongoose from "mongoose";
import UserTable from "../database/UserSchema";

export const getAllUsers = async (request:Request, response:Response) => {
    try {
        let users: IUser[] | undefined = await UserTable.find();
        if(users) {
            return response.status(200).json(users);
        } 
    } catch (erroe: any) {
        return response.status(500).json({"msg":"Data not found"});
    }
}

export const createUsers = async (request:Request, response:Response) => {
    let {username,email,password,imageUrl,isAdmin} = request.body;
    let theUser: IUser | null | undefined = await new UserTable({
        username: username,
        email: email,
        password: password,
        imageUrl: imageUrl,
        isAdmin: isAdmin,

    }).save();

    if(theUser) {
        return response.status(200).json({
            data: theUser,
            msg: "User is Created",
        })
    }
}

export const getUser = async (request:Request, response:Response) => {
    let {userId} = request.params;
    const mongoUserId = new mongoose.Types.ObjectId(userId);
    let theUser : IUser | undefined | null = await UserTable.findById(
        mongoUserId
    );
    if(!theUser){
        return response.status(404).json({
            data: null,
            error: "No Group is found",
        })
    }
    return response.status(200).json(theUser);
}

export const updateUser = async (request: Request, response: Response) => {
    let { userId } = request.params;
    let { username, email, password, imageUrl, isAdmin } = request.body;
    // const mongoUserId = new mongoose.Types.ObjectId(userId);
    let theUser: IUser | undefined | null = await UserTable.findByIdAndUpdate(
        userId,
        {
            username,
            email,
            password,
            imageUrl,
            isAdmin
        },
        {
            new: true
        }
    );
    if (!theUser) {
        return response.status(500).json({
            data: null,
            error: "No User is found",
        });
    }
    return response.status(200).json(theUser);
};

export const deleteUser = async (request: Request, response: Response) => {
    let { userId } = request.params;
    // const mongoUserId = new mongoose.Types.ObjectId(userId);
    let theuser: IUser | undefined | null = await UserTable.findByIdAndDelete(
        userId,
    );
    if (!theuser) {
        return response.status(500).json({
            data: null,
            error: "No Group is found",
        });
    }
    return response.status(200).json(theuser);
};