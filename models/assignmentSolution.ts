import { Schema, model, models } from 'mongoose';


const assignmentSolution = new Schema({
    name: {
        type: String,
        required: [true, 'name of submitter is required!'],
    },
    solution: {
        type: String,
        required: [true, 'solution is required!'],
    },
    assignmentId: {
        type: String,
        required: [true, 'id is required!'],
    },
},
    { timestamps: true }
);

const Solution = models.Solution || model('Solution', assignmentSolution);
export default Solution

