import mongoose from "mongoose";
import { IGroup } from "../models/IGroup";
import { timeStamp } from "console";

const GroupSchema = new mongoose.Schema<IGroup>(
    {
        name: {type: String, required: true, unique: true},
    },
    { timestamps: true }
)

const GroupsTable = mongoose.model<IGroup>("groups",GroupSchema);
export default GroupsTable;