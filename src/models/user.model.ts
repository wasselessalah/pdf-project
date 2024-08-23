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
    
      minlength: 5,
    },
  
  
    profilePhoto: {
      type: String,
      default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    
    },
    firstName: {
      type: String,
    
    },
    lastName: {
      type: String,
    
    },
  
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
const users=models?.users||model("users",userSchema)

export default users