import Meet from "@models/meet";
import { connectToDB } from "@utils/database";

export const POST = async (request: Request) => {
    const { link , course ,title} = await request.json();

    try {
        await connectToDB();

        const newMeet = await Meet.create({
            link: link,
            course : course,
            title : title,
        })

        await newMeet.save();
        console.log('new Meet Link saved succesfully', newMeet)

        return new Response(JSON.stringify(newMeet), { status: 201 })

    } catch (error) {
        return new Response("Failed to create a new course", { status: 500 });

    }
}




export const GET = async (request: Request) => {
    try {
        await connectToDB()
        
        const courses = await Meet.find({})
        // console.log(courses)
        
        return new Response(JSON.stringify(courses), { status: 200 })
        
    } catch (error) {
        console.log(error);
        return new Response("Failed to Fetch all uploaded courses", { status: 500 });
    }
}


export const DELETE = async (request : Request) => {
    try {
        console.log('about to delete')
        await connectToDB();
        const  id  = await request.json()
        console.log('id to be deleted =' , id)


        // Find the prompt by ID and remove it
        await Meet.findByIdAndDelete(id);

        return new Response("Meet Link deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting MeetLink", { status: 500 });
    }
};