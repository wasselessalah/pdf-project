import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    clerkId:{
type:String,
required:true,
unique:true
    },
    email: {
      type: String,
      trim: true,
      minlength: 5,
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
    },
  
    profilePhoto: {
      type: String,
      default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    grade: {
      type: String,
      trim: true,
      default:null 
    },
    jobPosition: {
      type: String,
      trim: true,default:null 
    },
    ministry: {
      type: String,
      trim: true,default:null 
    },
    structure: {
      type: String,
      trim: true,default:null 
    },
    currentTask: {
      type: String,
      trim: true,default:null 
    },
    birthDay: {
      type: Date,default:null 
    },
    address: {
      type: String,
      trim: true,default:null 
    },
    tel: {
      type: String,
      trim: true,
      minlength: 8,
    },
    tel2: {
      type: String,
      trim: true,
      minlength: 8,default:'000000000' 
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    fax: {
      type: String,
      trim: true,default:'000000000'
    },

  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
const users=models?.users||model("users",userSchema)

export default users