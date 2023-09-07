import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required.'],
      min: 2,
      max: 50
    },
    middleName: {
      type: String,
      required: false,
      min: 2,
      max: 50
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required.'],
      min: 2,
      max: 50
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      max: 50
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    picturePath: {
      type: String,
      default: "",
    }
    location: {
      type: String,
      required: false,
      max: 50
    },
    about: {
      type: String,
      required: false,
      max: 2000
    },
    friends: {
      type: Array,
      default: []
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;