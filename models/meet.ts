import { Schema, model, models } from 'mongoose';


const meetSchema = new Schema({
    link: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: [true, 'password is required!'],
    },
    course: {
        type: String,
        required: [true, 'password is required!'],
    },

},
    { timestamps: true }
);

const Meet = models.Meet || model('Meet', meetSchema);
export default Meet