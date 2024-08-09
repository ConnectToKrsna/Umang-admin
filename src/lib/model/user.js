import mongoose from "mongoose";
const registerSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        maxLength:20,
    },
    email: {
        type:String,
        // required:true,
        // maxLength:20,
    },
    contact: {
        type:Number,
        // required:true,
        // maxLength:20,
    },
    occupation: {
        type:String,
        // required:true,
        // maxLength:20,
    },
    address: {
        type:String,
        // required:true,
        // maxLength:20,
    },
    remarks: {
        type:String,
        // required:true,
        // maxLength:20,
    },
    registeredBy: {
        type:String,
        // required:true,
        // maxLength:20,
    },
    paid: {
        type:Boolean,
        // required:true,
        // maxLength:20,
        default:false,
    },
    attendance :{
        type: Boolean,
        default: false
    }
});
export const Register = mongoose.models.registers || mongoose.model("registers",registerSchema);
