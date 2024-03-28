import Nwatu from "@models/nuser";
import { connectToDB } from "@utils/database";

export const POST = async (request: Request) => {
    const { email,password,} = await request.json();
    try {
        await connectToDB();

        const userExists = await Nwatu.findOne({ email: email });
        if (userExists) {
            console.log(`User with this email  already exists`);
            return new Response("Failed to create a new user", { status: 500 });
        }

        const user = await Nwatu.create({
            email: email,
            password: password,
        });

        console.log("New user created successfully", user);
        return new Response(JSON.stringify(user), { status: 201 })
    } catch (error :any) {
        console.error("Error during authentication:", error.message);
        return new Response("Failed to create a new user", { status: 500 });
    }
}
