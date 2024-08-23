import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      minlength: 5,
      // Optional: You can add regex validation for email format if needed
      // match: /.+\@.+\..+/,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const User = models?.User || model("User", userSchema);

export default User;
