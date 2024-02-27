import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request: Request) => {
    const { email,password,name,username,department,matric,level,image,role,status } = await request.json();
    console.log(role)
    try {
        await connectToDB();

        const userExists = await User.findOne({ email: email });
        if (userExists) {
            console.log(`User with this email  already exists`);
            return new Response("Failed to create a new user", { status: 500 });
        }

        const user = await User.create({
            fullname: name,
            email: email,
            department: department,
            matric: matric,
            level: level,
            username: username,
            password: password,
            image: image,
            role : role,
            status : status,
        });

        console.log("New user created successfully", user);
        return new Response(JSON.stringify(user), { status: 201 })
    } catch (error :any) {
        console.error("Error during authentication:", error.message);
        return new Response("Failed to create a new user", { status: 500 });
    }
}
