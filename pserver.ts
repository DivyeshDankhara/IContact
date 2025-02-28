// import express,{Application, Request, Response} from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// dotenv.config({path:"./.env"});

// const port: string | number | undefined = process.env.PORT;
// const hostName: string = "127.0.0.1";
// const dbUrl: any = process.env.MONGO_DB_CLOUD_URL;
// const dbName:string | undefined = process.env.MONGO_DB_DATABASE; 

// const app:Application = express();

// app.get("/", (request:Request , response:Response) => {
//     response.status(200);
//     response.json({
//         "msg":"Welcome to express server."
//     })
// })

// if(port) {
//     app.listen(Number(port), () => {
//         if(dbUrl && dbName) {
//             mongoose
//             .connect(dbUrl , {dbName: dbName})
//         }
//     })
// }