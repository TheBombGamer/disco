import Upcoming from "@models/upcoming";
import { connectToDB } from "@utils/database";

export const POST = async (request: Request) => {
    const { file, title, instruction, course, submissionDate, id } = await request.json();

    try {
        await connectToDB();

        const newUpcoming = await Upcoming.create({
            pdf: file,
            title: title,
            instruction: instruction,
            course: course,
            submissionDate: submissionDate,
            UpcomingId : id
        })

        await newUpcoming.save();
        console.log('new Upcoming saved succesfully', newUpcoming)

        return new Response(JSON.stringify(newUpcoming), { status: 201 })

    } catch (error) {
        return new Response("Failed to create a new course", { status: 500 });

    }
}


export const GET = async (request: Request) => {
    try {
        await connectToDB()

        const courses = await Upcoming.find({})
        // console.log(courses)

        return new Response(JSON.stringify(courses), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response("Failed to Fetch all uploaded courses", { status: 500 });
    }
}


export const PATCH = async (req: Request) => {
    const { title, instruction, course, submissionDate, pdf, id } = await req.json();
    console.log('about to update')
    console.log('form Data =' , title, instruction, course, submissionDate, pdf, id)

    try {
        await connectToDB();

        const existingUpcoming = await Upcoming.findById(id);

        if (!existingUpcoming) {
            return new Response("Upcoming not found", { status: 404 });
        }
        existingUpcoming.title = title
        existingUpcoming.course = course
        existingUpcoming.submissionDate = submissionDate
        existingUpcoming.instruction = instruction
        existingUpcoming.pdf = pdf
        const UpdatedUpcoming = await existingUpcoming.save()
        console.log(existingUpcoming)
        console.log(UpdatedUpcoming)
        return new Response("Successfully updated the Upcoming", { status: 200 });

    } catch (error) {
        console.error('Error updating Upcoming:', error);
        return new Response("Error Updating Upcoming", { status: 500 });

    }
}



export const DELETE = async (request : Request) => {
    try {
        console.log('about to delete')
        await connectToDB();
        const  id  = await request.json()
        console.log('id to be deleted =' , id)


        // Find the prompt by ID and remove it
        await Upcoming.findByIdAndDelete(id);

        return new Response("Upcoming deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Upcoming", { status: 500 });
    }
};