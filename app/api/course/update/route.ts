
import Course from '@models/course';
import { connectToDB } from '@utils/database';

export const PATCH = async (req: Request) => {
    const { title, summary, pdf, id } = await req.json();
    console.log('about to update')
    console.log(title ,summary ,pdf ,id)

    try {
        await connectToDB();

        const existingCourse = await Course.findById(id);

        if (!existingCourse) {
            return new Response("Course not found", { status: 404 });
        }
        existingCourse.title = title
        existingCourse.summary = summary
        existingCourse.pdf = pdf
        const UpdatedCourse = await existingCourse.save()
        console.log(existingCourse)
        console.log(UpdatedCourse)
        return new Response("Successfully updated the course", { status: 200 });

    } catch (error) {
        console.error('Error updating course:', error);
        return new Response("Error Updating Course", { status: 500 });

    }
}


export const DELETE = async (request : Request) => {
    try {
        console.log('about to delete')
        await connectToDB();
        const  id  = await request.json()
        console.log('id to be deleted =' , id)


        // Find the prompt by ID and remove it
        await Course.findByIdAndDelete(id);

        return new Response("Course deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Course", { status: 500 });
    }
};