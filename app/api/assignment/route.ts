import Assignment from "@models/assignment";
import { connectToDB } from "@utils/database";

export const POST = async (request: Request) => {
    const { file, title, instruction, course, submissionDate, id } = await request.json();

    try {
        await connectToDB();

        const newAssignment = await Assignment.create({
            pdf: file,
            title: title,
            instruction: instruction,
            course: course,
            submissionDate: submissionDate,
            assignmentId : id
        })

        await newAssignment.save();
        console.log('new Assignment saved succesfully', newAssignment)

        return new Response(JSON.stringify(newAssignment), { status: 201 })

    } catch (error) {
        return new Response("Failed to create a new course", { status: 500 });

    }
}


export const GET = async (request: Request) => {
    try {
        await connectToDB()

        const courses = await Assignment.find({})
        // console.log(courses)

        return new Response(JSON.stringify(courses), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response("Failed to Fetch all uploaded courses", { status: 500 });
    }
}