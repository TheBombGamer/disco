import { Schema, model, models } from 'mongoose';


const upcomingSchema = new Schema({
    title: {
        type: String,
        required: [true, 'password is required!'],
    },
    pdf: {
        type: String,
        // required: [true, 'password is required!'],
    },
    instruction: {
        type: String,
        required: [true, 'password is required!'],
    },
    course: {
        type: String,
        required: [true, 'password is required!'],
    },
    releaseDate: {
        type: Date,
        required: [true, 'password is required!'],
    },
},
    { timestamps: true }
);

const Upcoming = models.Assignment || model('Upcoming', upcomingSchema);
export default Upcoming

