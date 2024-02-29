"use server";

import { revalidatePath } from "next/cache";

export default async function actioner() {
    console.log('revalidation about to occur , function call')
  revalidatePath("admin/upload");
}