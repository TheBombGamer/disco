import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  fullname: {
    type: String,
    required: [true, 'fullname is required!'],
    // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  username: {
    type: String,
    required: [true, 'username is required!'],
    // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  department: {
    type: String,
    required: [true, 'department is required!'],
    // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  matric: {
    type: String,
    // required: [true, 'department is required!'],
    // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  level: {
    type : Number,
    // required: [true, 'level is required!'],
    // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  password : {
    type : String ,
    required: [true, 'password is required!'],
    
  },
  role: {
    type: String,
    required: [true, 'role is required!'],
  },
  status: {
    type: String,
  },
  image: {
    type: String,
  },
}, {
  timestamps: true 
});

const User = models.User || model("User", UserSchema);

export default User;
