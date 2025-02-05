import express,{Application, Request, Response} from 'express';
import userRouter from './routes/useRouter';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { log } from 'console';
dotenv.config({path: "./.env"});


const port: string | number | undefined = process.env.PORT || 9900;
const hostName:string = "127.0.0.1";
const dbUrl: any = process.env.MONGO_DB_CLOUD_URL;
const dbName: string | undefined = process.env.MONGO_DB_DATABASE;

const app:Application = express();

app.get("/",(request:Request , response:Response) => {
    response.json(200);
    response.json({
        msg: "Welcome to express server"
    })
})

mongoose.connect(dbUrl, {dbName:dbName})
.then(()=>{console.log("Database Connection is ready....")})
.catch((err)=>{console.log(err)})

app.listen(Number(port), hostName, () => {
    console.log(`Express server is started at http://${hostName}:${port}`)
})

app.use("/api/users",userRouter)
