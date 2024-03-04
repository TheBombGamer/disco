"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PiStudentBold } from "react-icons/pi";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@app/components/ui/dialog";
import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import { Button } from "@app/components/ui/button";
import { Textarea } from "@app/components/ui/textarea";
import { UploadButton, UploadDropzone } from "@utils/uploadthing";
import { FaRegFileAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Verified } from "lucide-react";
import { useRouter } from "next/navigation";


const page = () => {

  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: session } = useSession();
  useEffect(() => {
    if (success || error) {
      window.location.reload();
    }
  }, [success]); 

  const name = session?.user?.name
  const image = session?.user?.image
  const department = session?.user?.department
  const level = session?.user?.level
  const username = session?.user?.username
  const _id = session?.user?.id

  const [nameEdit, setNameEdit] = useState(name);
  const [imageEdit, setImageEdit] = useState(image);
  const [departmentEdit, setDepartmentEdit] = useState(department);
  const [levelEdit, setLevelEdit] = useState<number | undefined>(level);
  const [usernameEdit, setUsernameEdit] = useState(username);

  useEffect(() => {
    // Update nameEdit state when session.user.name changes
    setNameEdit(session?.user?.name);
  
    // Update imageEdit state when session.user.image changes
    setImageEdit(session?.user?.image);
  
    // Update departmentEdit state when session.user.department changes
    setDepartmentEdit(session?.user?.department);
  
    // Update levelEdit state when session.user.level changes
    setLevelEdit(session?.user?.level);
  
    // Update usernameEdit state when session.user.username changes
    setUsernameEdit(session?.user?.username);
  }, [session]);

  const router = useRouter();


  
  const handleInputChange = (

    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<string | undefined>> | React.Dispatch<React.SetStateAction<number | undefined>>
    
  ) => {
    if (typeof e.target.value === 'string') {
      // If the input value is a string, set it directly
      (setter as React.Dispatch<React.SetStateAction<string | undefined>>)(e.target.value);
    } else if (typeof e.target.value === 'number') {
      // If the input value is a number, parse it and then set it
      (setter as React.Dispatch<React.SetStateAction<number | undefined>>)(parseInt(e.target.value));
    }
    setError("");
    setSuccess("");
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("id=", _id);
    // console.log("formdata =",nameEdit,imageEdit,departmentEdit,levelEdit,usernameEdit ,_id);
    setError('')
    setSuccess('')
    setLoading(true);

    try {
      const data = {
        name: nameEdit,
        image: imageEdit,
        department: departmentEdit,
        level: levelEdit,
        username: usernameEdit, 
        id: _id,
      };

      const response = await fetch("/api/register/update", {
        method: "PATCH",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSuccess("changes saved successfully!");
      } else {
        setError("Update Failed");
      }
    } catch (error) {
      setError("Error occured while saving changes");
      console.error("Error saving changes", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCreatedAtDate = (createdAt: string) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) suffix = "st";
    else if (day === 2 || day === 22) suffix = "nd";
    else if (day === 3 || day === 23) suffix = "rd";
    return `${day}${suffix} ${month}, ${year}`;
  };

  // const formattedCreatedAt = formatCreatedAtDate(createdAt);

  const userRole = session?.user.role
 if(session){

   if (userRole !== 'admin') {
     router.push('/app')
     return null
   }
 }
  return (
    <>
      {session ? (
        <section className="flex flex-col gap-3">
          <div className="flex gap-4 items-center">
            {/* <Image
              src={session.user?.image || "/assets/logo.jpg"}
              width={80}
              height={80}
              alt="logo"
              className="rounded-full"
            /> */}
            <div className="">
              <h6 className="font-bold text-lg flex item-center gap-3 ">{session?.user.status === 'super admin' && 'Super '}Admin <Verified className="text-primary" /></h6>
              <h6 className="font-thin text-sm ">enquiries@engineeringlearninghub.com</h6>

              <p className="text-sm text-slate-500">
              Member Since {formatCreatedAtDate(session?.user.registerDate)}
              </p>
              <Link href="/">
                <p className="text-primary cursor-pointer">Go back to Home</p>
              </Link>
            </div>
          </div>
          <div className="flex flex-col lg:w-[50%]  items- gap-4 border border-slate-700 w- p-3">
            <h4 className="font-bold text-lg">Profile</h4>

            <div className="flex flex-col  gap-4">
              <div className="">
                <h6 className="text-sm text-slate-400">Full Name</h6>
                <p className="border p-1 rounded border-slate-500">
                  {session.user?.name}
                </p>
              </div>
              <div className="">
                <h6 className="text-sm text-slate-400">Username</h6>
                <p className="border p-1 rounded border-slate-500 min-w-44">
                  {session?.user?.username}
                </p>
              </div>
            </div>
            <div className="flex flex-col  gap-4">
              <div className="">
                <h6 className="text-sm text-slate-400">Email</h6>
                <p className="border p-1 rounded border-slate-500">
                  {session?.user?.email}
                </p>
              </div>
              <div className="">
                <h6 className="text-sm text-slate-400">Department</h6>
                <p className="border p-1 rounded border-slate-500">
                  {session?.user?.department}
                </p>
              </div>
              {/* <div className="">
                <h6 className="text-sm text-slate-400">Level</h6>
                <div className="w-full border border-slate-500">
                  <div
                    className="bg-primary"
                    style={{ width: `${(session?.user?.level / 500) * 100}%` }}
                  >
                    <p className=" p-1 rounded ">
                      {session?.user?.level}
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
            {/* <h4 className="text-2xl">Other User Info can Go in here</h4> */}



            <Dialog>
        <DialogTrigger asChild>
          <Button
            className="bg--700 hover:bg--700 hover:text-white border-none rounded p-1 text-xl flex items-center gap-3"
            variant="outline"
          >
            <MdEdit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-slate-950 text-white">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form action="" onSubmit={handleEdit}>
            
          {/* {imageEdit ? (
                <div className="flex justify-center   w-full ">
                  <div className="">
                  <Image
                  src={imageEdit}
                  width={40}
                  height={40}
                  alt="logo"
                  className="rounded-full"
                />
                  </div>
                  <button
                    onClick={() => setImageEdit("")}
                    type="button"
                    className="flex  text-slate-50 text-sm"
                  >
                    <span>
                      <MdEdit />
                    </span>
                  </button>
                </div>
              ) : (
                <UploadButton
                  // className="bg-black border w-64 h-56 border-slate-400 border-dashed "
                  endpoint="imgUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the respons
                    console.log("Files: ", res);
                    setImageEdit(res[0].url);
                    console.log("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    setError(
                      "Something Wrong with uploaded file(check file size/type)"
                    );
                    // Do something with the error.
                    console.log(`ERROR! ${error.message}`);
                  }}
                />
              )} */}
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Full Name
                </Label>
                <Input
                  id="title"
                  value={nameEdit}
                  onChange={(e) => handleInputChange(e, setNameEdit)}
                  className="col-span-3 bg-transparent"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Ussername
                </Label>
                <Input
                  id="title"
                  value={usernameEdit}
                  onChange={(e) => handleInputChange(e, setUsernameEdit)}
                  className="col-span-3 bg-transparent"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Department
                </Label>
                <Input
                  id="title"
                  value={departmentEdit}
                  onChange={(e) => handleInputChange(e, setDepartmentEdit)}
                  className="col-span-3 bg-transparent"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Level
                </Label>
                <Input
                  id="title"
                  type="number"
                  value={levelEdit}
                  onChange={(e) => handleInputChange(e, setLevelEdit)}
                  className="col-span-3 bg-transparent"
                />
              </div>


            </div>
            <DialogFooter>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              {loading ? (
                <Button disabled type="submit" className="cursor-wait">
                  updating...
                </Button>
              ) : (
                <Button type="submit">save changes</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>


          </div>
        </section>
      ) : (
        <div className="">Loading.....</div>
      )}
    </>
  );
};

export default page;
