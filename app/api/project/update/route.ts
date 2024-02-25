
import Project from '@models/project';
import { connectToDB } from '@utils/database';

export const PATCH = async (req: Request) => {
    const { title, summary, pdf, id } = await req.json();
    console.log('about to update')
    console.log(title ,summary ,pdf ,id)

    try {
        await connectToDB();

        const existingProject = await Project.findById(id);

        if (!existingProject) {
            return new Response("Project not found", { status: 404 });
        }
        existingProject.title = title
        existingProject.summary = summary
        existingProject.pdf = pdf
        const UpdatedProject = await existingProject.save()
        console.log(existingProject)
        console.log(UpdatedProject)
        return new Response("Successfully updated the Project", { status: 200 });

    } catch (error) {
        console.error('Error updating Project:', error);
        return new Response("Error Updating Project", { status: 500 });

    }
}


export const DELETE = async (request : Request) => {
    try {
        console.log('about to delete')
        await connectToDB();
        const  id  = await request.json()
        console.log('id to be deleted =' , id)


        // Find the prompt by ID and remove it
        await Project.findByIdAndDelete(id);

        return new Response("Project deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Project", { status: 500 });
    }
};