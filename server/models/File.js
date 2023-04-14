import mongoose, { Schema, model } from "mongoose";
const {ObjectId}= mongoose.Types

const File = new Schema({
 name: {type: String, required: true, unique: true },
 type: { type: String, required: true, },
 size: { type: Number, default: 0 },
 accessLink: { type: String },
 path: { type: String, default: "" },
 created: { type: Date, default: Date.now() },
 user: { type: ObjectId, ref: "User" },
 parent: { type: ObjectId, ref:"File" },
 childs:[{type: ObjectId, ref:"File"}]
})

export default model('File', File)