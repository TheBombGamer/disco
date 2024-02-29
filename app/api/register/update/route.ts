
import User from '@models/user';
import { connectToDB } from '@utils/database';

export const PATCH = async (req: Request) => {
    const { name, image, department, level, username, id } = await req.json();
    console.log('about to update')
    console.log(name, image, department, level, username, id)

    try {
        await connectToDB();

        const existingUser = await User.findById(id);

        if (!existingUser) {
            return new Response("User not found", { status: 404 });
        }
        existingUser.fullname = name
        existingUser.image = image
        existingUser.department = department
        existingUser.level = level
        existingUser.username = username
        const UpdatedUser = await existingUser.save()
        console.log(existingUser)
        console.log(UpdatedUser)
        return new Response("Successfully updated the User", { status: 200 });

    } catch (error) {
        console.error('Error updating User:', error);
        return new Response("Error Updating User", { status: 500 });

    }
}


