"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";

interface Users {
  _id: string;
  level: string;
  role: string;
  fullname: string;
  department: string;
  password: string;
  createdAt: string;
}

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
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/navigation";
const YearOne = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [adminId, setAdminId] = useState("");

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

  const [admins, setAdmins] = useState<Users[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch Admins");
        }
        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching Admins:", error);
      }
    };

    fetchAdmins();
  }, [success, error]);

  const handleDelete = async (adminId: string) => {
    setAdminId(adminId);
    setLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: "DELETE",
        body: JSON.stringify(adminId),
      });
      if (response.ok) {
        setSuccess("Deleted successfully!");
      } else {
        setError("Delete Failed");
      }
    } catch (error) {
      setError("something went wrong(check connection)");
    } finally {
      setLoading(false);
    }
  };

  const userRole = session?.user?.status;
  const router = useRouter();
  // if (session) {
  //   if (userRole !== "super admin") {
  //     router.push("/login");
  //     return null;
  //   }
  // }

  return (
    <div>
      <h6 className="font-bold">View All Admins Here</h6>
      <div className="w-full flex bg-slate-950 rounded-t-lg p-2 border-b-black">
        <h6 className="flex-1 md:text-sm text-[10px]">Name</h6>
        <h6 className=" flex-1 md:text-sm text-[10px]">Admin for</h6>
        <h6 className="flex-1 md:text-sm text-[10px]">Remove</h6>
      </div>
      {admins.map((admin) =>
        admin.role === "admin" ? (
          <div key={admin._id}>
            <div className="flex w-full bg-slate-900">
              <div className="w-full flex -t-lg p-2 ">
                <h6 className="flex-1 md:text-sm text-[10px] flex justify-between">
                  {admin.fullname}{" "}
                </h6>
                <h6 className=" flex-1 md:text-sm text-[10px]">{admin.department}</h6>
                <h6 className="flex-1 md:text-sm text-[10px]">
                  {" "}
                  <Dialog>
                    <div className="flex gap-2 items-center ">
                      <p>
                        <DialogTrigger className="bg-pink-700 rounded p-1 flex items-center gap-3 mb-3 md:mb-0">
                          Remove <MdDeleteForever />
                        </DialogTrigger>
                      </p>
                    </div>
                    <DialogContent className="sm:max-w-[425px] bg-slate-950 text-white">
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          remove {admin.fullname} as {admin.department}'s admin.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}
                        {loading ? (
                          <Button
                            disabled
                            type="submit"
                            className="cursor-wait"
                          >
                            deleting...
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            onClick={() => handleDelete(admin._id)}
                          >
                            Delete
                          </Button>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </h6>
              </div>
            </div>
          </div>
        ) : (
          <React.Fragment key={admin._id}></React.Fragment>
        )
      )}
    </div>
  );
};

export default YearOne;
