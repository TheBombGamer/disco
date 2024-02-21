

import Assignment from '@models/assignment';
import { connectToDB } from '@utils/database';

export const PATCH = async (req: Request) => {
    const { title, instruction, course, submissionDate, pdf, id } = await req.json();
    console.log('about to update')
    console.log('form Data =' , title, instruction, course, submissionDate, pdf, id)

    try {
        await connectToDB();

        const existingAssignment = await Assignment.findById(id);

        if (!existingAssignment) {
            return new Response("Assignment not found", { status: 404 });
        }
        existingAssignment.title = title
        existingAssignment.course = course
        existingAssignment.submissionDate = submissionDate
        existingAssignment.instruction = instruction
        existingAssignment.pdf = pdf
        const UpdatedAssignment = await existingAssignment.save()
        console.log(existingAssignment)
        console.log(UpdatedAssignment)
        return new Response("Successfully updated the Assignment", { status: 200 });

    } catch (error) {
        console.error('Error updating Assignment:', error);
        return new Response("Error Updating Assignment", { status: 500 });

    }
}


