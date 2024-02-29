"use server";

import { revalidatePath , revalidateTag} from "next/cache";

export default async function actioner() {
    // console.log('revalidation about to occur , function call')
    revalidatePath("/admin/upload");
    revalidateTag('collection')
    // console.log('revalidation occured')
}

