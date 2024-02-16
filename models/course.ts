import { Schema, model, models } from 'mongoose';


const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    pdf: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

const Course = models.Course || model('Course', courseSchema);
export default Course