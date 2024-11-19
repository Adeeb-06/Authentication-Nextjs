import mongoose, { Schema } from "mongoose";

const User = mongoose.models.User || mongoose.model("User", new Schema(
    {
        name: {type:String , required:true},
        email: {type:String , required:true},
        password:{type:String},
        role:{type:String , required:true}
    },
    {
        timestamps: true,
    }
))

export default User;