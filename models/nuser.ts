import { Schema, model, models } from 'mongoose';

const NUserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  password : {
    type : String ,
    required: [true, 'password is required!'], 
  },
}, {
  timestamps: true 
});

const Nwatu  = models.Nwatu || model("NUser", NUserSchema);

export default Nwatu;
