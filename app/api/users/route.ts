import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request : Request) => {
    const { name, email, password , dept ,level , username } = await request.json();

    try {
        await connectToDB();
        const newUser = await User.create({
            fullname : name ,
            username : username,
            email : email ,
            password : password,
            department : dept,
            level : level,
        })
        console.log('user created succesfully' , newUser)
        await newUser.save();
        return new Response(JSON.stringify(newUser), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}


export const GET = async (request: Request) => {
    try {
        await connectToDB()

        const Users = await User.find({})
        console.log('All Students were fetched successfully')

        return new Response(JSON.stringify(Users), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response("Failed to Fetch all uploaded Users", { status: 500 });
    }
}

export const DELETE = async (request : Request) => {
    try {
        console.log('about to delete')
        await connectToDB();
        const  id  = await request.json()
        console.log('id to be deleted =' , id)


        // Find the prompt by ID and remove it
        await User.findByIdAndDelete(id);

        return new Response("User deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting User", { status: 500 });
    }
};