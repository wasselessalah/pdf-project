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
  
  
    
    firstName: {
      type: String,
    
    },
    lastName: {
      type: String,
    
    },
  
  },
);
const user=models?.user||model("user",userSchema)

export default user