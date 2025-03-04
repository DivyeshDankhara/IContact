import { Request , response, Response } from "express";
import { IUser } from "../models/IUser";
import mongoose from "mongoose";
import UserTable from "../database/UserSchema";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import gravatar from "gravatar";
import { validationResult } from "express-validator";
import dotenv from "dotenv";


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

// export const registerUser = async (request:Request, response:Response) => {
//     let {username,email,password,imageUrl,isAdmin} = request.body;
//     let theUser: IUser | null | undefined = await new UserTable({
//         username: username,
//         email: email,
//         password: password,
//         imageUrl: imageUrl,
//         isAdmin: isAdmin,

//     }).save();

//     if(theUser) {
//         return response.status(200).json({
//             data: theUser,
//             msg: "User is Created",
//         })
//     }
// }

/**
 * @usage : register a user
 * @method : POST 
 * @params : username, email, password
 * @url : http://127.0.0.1:9988/users/register
 * @access : 
 */
export const registerUser = async (request:Request , response:Response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()});
    }
    try{
        // read the from data
        let {username, email, password} = request.body;
        // checks if the user is exists
        const userObj = await UserTable.findOne({email: email});
        if(userObj) {
            return response.status(400).json({
                error: "The user is already exists"
            })
        }
        // password ancryption
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        // gravatar url
        const imageUrl = gravatar.url(email, {
            size: "200",
            rating: 'pg',
            default: "mm"
        });

        // insert to db
        const newUser: IUser = {
            username: username,
            email: email,
            password: hashPassword,
            imageUrl: imageUrl,
            isAdmin: false
        }

        
        const theUserObj = await new UserTable(newUser).save();
        if(theUserObj) {
            return response.status(200).json({
                    // status: APP_STATUS.SUCCESS,
                    data: theUserObj,
                    msg: "Registration is success",
            })
        }

    } catch (error:any) {
        return response.status(500).json({
            error: error.message
        })
    }
}

export const loginUser = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    // express validator error handling
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        let { email, password } = request.body;
        // check if the user exists
        const userobj = await UserTable.findOne({ email: email });
        if (!userobj) {
            return response.status(500).json(
                {
                    data: null,
                    error: "Invalid Email Address"
                }
            );
        }
        // check for password
        let isMatch: boolean = await bcryptjs.compare(password, userobj.password);
        if (!isMatch) {
            return response.status(500).json({
                data: null,
                error: "Invalid Passwrod !"
            });
        }
        // create Token
        const secretKey: string | undefined = process.env.JWT_SECRET_KEY;
        const payload: any = {
            id: userobj.id,
            email: userobj.email
        }
        if (secretKey && payload) {
            jwt.sign(payload, secretKey, { expiresIn: 10000 }, (error, encoded) => {
                if (error) {
                    throw error
                }
                if (encoded) {
                    return response.status(200).json({
                        data: userobj,
                        token: encoded,
                        msg: "Login is Success!"
                    })
                }
            })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);
        // gravatar url
        const imageUrl = gravatar.url(email, {
            size: "200",
            rating: "pg",
            default: "mm"
        });
        //insert to db
        const newUser = {  // overide IUser interface
            email: email,
            password: hashPassword,
        };
        let theuser: IUser | null | undefined = await new UserTable(newUser).save();
        if (theuser) {
            return response.status(200).json({
                data: theuser,
                msg: "User is created"
            })
        }
    } catch (e: any) {  // error no object
        response.status(500).json({
            // status:APP_STATUS.FAILED
            // data:null,
            error: e.message
        });
    };
};

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