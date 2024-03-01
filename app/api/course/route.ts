import Course from "@models/course";
import { connectToDB } from "@utils/database";
import { revalidatePath } from "next/cache";

export const POST = async (request: Request) => {
    const { file, title, summary, } = await request.json();

    try {
        await connectToDB();

        const newCourse = await Course.create({
            pdf: file,
            title: title,
            summary: summary,
        })

        await newCourse.save();
        console.log('new course saved succesfully', newCourse)

        return new Response(JSON.stringify(newCourse), { status: 201 })

    } catch (error) {
        return new Response("Failed to create a new course", { status: 500 });

    }
}


export const GET = async (request: Request) => {
    try {
        await connectToDB()

        const courses = await Course.find({})
        console.log('courses =' , courses)
        // revalidatePath('/upload' , 'page')


        return new Response(JSON.stringify(courses), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response("Failed to Fetch all uploaded courses", { status: 500 });
    }
}