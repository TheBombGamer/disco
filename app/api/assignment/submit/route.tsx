import Solution from "@models/assignmentSolution";
import { connectToDB } from "@utils/database";

export const POST = async (request: Request) => {
    const { assignmentFile , name , _id} = await request.json();
    console.log('id' , _id)

    try {
        await connectToDB();

        const newSolution = await Solution.create({
            solution: assignmentFile,
            name: name,
            assignmentId : _id

        })

        await newSolution.save();
        console.log('new Solution saved succesfully', newSolution)

        return new Response(JSON.stringify(newSolution), { status: 201 })

    } catch (error) {
        return new Response("Failed to create a new course", { status: 500 });

    }
}


export const GET = async (request: Request) => {
    try {
        await connectToDB()

        const assignments = await Solution.find({})
        console.log('solutions =' , assignments)
        // console.log(assignments)

        return new Response(JSON.stringify(assignments), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response("Failed to Fetch all submitted assignments", { status: 500 });
    }
}