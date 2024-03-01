"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiSolidCalendar } from "react-icons/bi";
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
import { MdDeleteForever } from "react-icons/md";
import { usePathname } from "next/navigation";

type SetRefreshFunction = React.Dispatch<React.SetStateAction<boolean>>;


interface MeetCardProps {
  title: string;
  createdAt: string;
  course: string;
  link: string;
  _id: string;
  setRefresh: SetRefreshFunction;
}

const MeetCard: React.FC<MeetCardProps> = ({
  title,
  link,
  createdAt,
  course,
  _id,
  setRefresh
}) => {
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

  const formattedCreatedAt = formatCreatedAtDate(createdAt);
  //   const formattedSubmissionDate = formatCreatedAtDate(submissionDate);

  const pathname = usePathname()
  const admin = pathname && pathname.includes("/admin");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // useEffect(() => {
  //   if (success || error) {
  //     window.location.reload();
  //   }
  // }, [success]); 

  const handleDelete = async () => {
    try {
      const id = _id;

      const response = await fetch("/api/meet", {
        method: "DELETE",
        body: JSON.stringify(id),
      });
      if (response.ok) {
        setSuccess("Deleted successfully!");
        setRefresh(prevRefresh => !prevRefresh)

      } else {
        setError("Delete Failed");
      }
    } catch (error) {
      setError("something went wrong");
      // console.log("error");
    }finally{

    }
  };
  return (
    <div className="bg-black md:w-96 border rounded-md border-gray-500">
      <div className="bg-transparent rounded-md p-3 text-white flex-1 gap-2">
        <div className="flex-1 text-sm flex flex-col gap-4">
          {course && <p className="">Course Code : {course}</p>}
          <h6 className="font-bold text-lg">{title}</h6>

          <div className="flex justify-between flex-wrap">
            <div className="flex gap-2 items-center justify-between w-full">
              <Link href={link}>
                <p className="bg-pink-700 rounded p-1 text-md flex items-center gap-3">
                  Join Meet
                </p>
              </Link>

              {
                admin && 

              <Dialog>
            <div className="flex gap-2 items-center">
              <p>
                <DialogTrigger className=" rounded   flex items-center text-2xl gap-3">
                  <MdDeleteForever />
                </DialogTrigger>
              </p>
            </div>
            
            <DialogContent className="sm:max-w-[425px] bg-slate-950 text-white">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure? </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the
                  assignment.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                {loading ? (
                  <Button disabled type="submit" className="cursor-wait">
                    deleting...
                  </Button>
                ) : (
                  <Button type="button" onClick={handleDelete}>
                    Delete
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
          }
            </div>
          </div>
        
          <div className="">
            <p className="text-[12px] flex items-center gap-3">
              <BiSolidCalendar />
              <span className="font-semibold">Created On :</span>{" "}
              {formattedCreatedAt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetCard;
