import Project from "@models/project";
import { connectToDB } from "@utils/database";

export const POST = async (request: Request) => {
    const { file, title, summary, } = await request.json();

    try {
        await connectToDB();

        const newProject = await Project.create({
            pdf: file,
            title: title,
            summary: summary,
        })

        await newProject.save();
        console.log('new Project saved succesfully', newProject)

        return new Response(JSON.stringify(newProject), { status: 201 })

    } catch (error) {
        return new Response("Failed to create a new Project", { status: 500 });

    }
}


export const GET = async (request: Request) => {
    try {
        await connectToDB()

        const Projects = await Project.find({})
        console.log(Projects)

        return new Response(JSON.stringify(Projects), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response("Failed to Fetch all uploaded Projects", { status: 500 });
    }
}