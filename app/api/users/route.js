import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { name, email, password } = await request.json();

    try {
        await connectToDB();
        const newUser = await User.create({
            username : name ,
            email : email ,
            // password : password
        })
        console.log('user created succesfully' , newUser)
        await newUser.save();
        return new Response(JSON.stringify(newUser), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}
