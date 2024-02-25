import { Schema, model, models } from 'mongoose';


const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    pdf: {
        type: String,
        // required: true
    },
    summary: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

const Project = models.Project || model('Project', ProjectSchema);
export default Project