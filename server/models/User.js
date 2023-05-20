import mongoose, { Schema, model } from "mongoose";
const {ObjectId}= mongoose.Types

const User = new Schema({
 email: {type: String, required: true, unique: true },
 password: { type: String, required: true, },
 diskSpace: { type: Number, default: 1024 ** 3 * 10 },
 usedSpace: { type: Number, default: 0 },
 avatar: { type: String, default:"" },
 files:[{type: ObjectId, ref:"File"}]
})

export default model('User', User)