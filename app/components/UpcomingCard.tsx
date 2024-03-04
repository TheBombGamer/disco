"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiSolidCalendar } from "react-icons/bi";
import { PiDownloadSimple } from "react-icons/pi";

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
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { usePathname } from "next/navigation";
import { SendToBack } from "lucide-react";
import { useSession } from "next-auth/react";

type SetRefreshFunction = React.Dispatch<React.SetStateAction<boolean>>;

interface AssignmentCardProps {
  title: string;
  instruction: string;
  createdAt: string;
  course: string;
  submissionDate: string;
  pdf: string;
  _id: string;
  setRefresh: SetRefreshFunction;
}

const UpcomingCard: React.FC<AssignmentCardProps> = ({
  title,
  instruction,
  createdAt,
  course,
  submissionDate,
  pdf,
  _id,
  setRefresh,
}) => {
  const pathname = usePathname();
  const admin = pathname && pathname.includes("/admin");

  const [titleEdit, setTitleEdit] = useState(title);
  const [instructionEdit, setInstructionEdit] = useState(instruction);
  const [fileEdit, setFileEdit] = useState(pdf);
  const [courseEdit, setCourseEdit] = useState(course);
  const [submissionDateEdit, setSubmissionDateEdit] = useState(submissionDate);

  const [assignmentFile, setAssignmentFile] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // useEffect(() => {
  //   if (success || error) {
  //     window.location.reload();
  //   }
  // }, [success, error]);

  const { data: session } = useSession();

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
    setError("");
    setSuccess("");
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("id=", _id);
    // console.log("formdata =", fileEdit, submissionDateEdit, fileEdit, _id);
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = {
        title: titleEdit,
        instruction: instructionEdit,
        course: courseEdit,
        submissionDate: submissionDateEdit,
        pdf: fileEdit,
        id: _id,
      };

      const response = await fetch("/api/upcoming", {
        method: "PATCH",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSuccess("changes saved successfully!");
        setRefresh((prevRefresh) => !prevRefresh);
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

  const handleDelete = async () => {
    setError("");
    setSuccess("");
    try {
      const id = _id;

      const response = await fetch("/api/upcoming", {
        method: "DELETE",
        body: JSON.stringify(id),
      });
      if (response.ok) {
        setSuccess("Deleted successfully!");
        setRefresh((prevRefresh) => !prevRefresh);
      } else {
        setError("Delete Failed");
      }
    } catch (error) {
      setError("Error during deleting(check connection)");
      // console.log("error");
    } finally {
      setRefresh(false);
    }
  };

  const name = session?.user.name;


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
  const formattedSubmissionDate = formatCreatedAtDate(submissionDate);
  return (
    <div className="bg-black max-w-96 border rounded-md border-gray-500">
      <div className="bg-transparent rounded-md p-3 text-white flex-1 gap-2">
        <div className="flex-1 text-sm flex flex-col gap-4">
          <div className="flex w-full justify-between">
            <p className="">Course Code : {course}</p>

            {admin && (
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
                    <DialogTitle>Edit Course</DialogTitle>
                    <DialogDescription>
                      Make changes to the Upcoming class here. Click save when
                      you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <form action="" onSubmit={handleEdit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="title"
                          value={titleEdit}
                          onChange={(e) => handleInputChange(e, setTitleEdit)}
                          className="col-span-3 bg-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Course
                        </Label>
                        <Input
                          id="title"
                          value={courseEdit}
                          onChange={(e) => handleInputChange(e, setCourseEdit)}
                          className="col-span-3 bg-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Class Date
                        </Label>
                        <input
                          type="date"
                          id="title"
                          value={submissionDateEdit}
                          onChange={(e) =>
                            handleInputChange(e, setSubmissionDateEdit)
                          }
                          className="col-span-3 bg-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-4 items- gap-4">
                        <Label htmlFor="username" className="text-right">
                          Instruction
                        </Label>
                        <Textarea
                          id="username"
                          value={instructionEdit}
                          rows={10}
                          onChange={(e) =>
                            handleInputChange(e, setInstructionEdit)
                          }
                          className="col-span-3 bg-transparent"
                        />
                      </div>
                      {fileEdit ? (
                        <div className="flex justify-between w-full ">
                          <div className="">
                            <Link
                              href={fileEdit}
                              className="flex items-center gap-5  text-primary"
                            >
                              <FaRegFileAlt /> View Pdf
                            </Link>
                          </div>
                          <button
                            onClick={() => setFileEdit("")}
                            type="button"
                            className="flex  text-slate-50 text-sm"
                          >
                            <span>
                              <MdEdit />
                            </span>
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
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
            )}
          </div>
          <h6 className="font-bold text-lg">{title}</h6>
          <p className="text-[12px]">{instruction}</p>

          <div className="">
            {/* <p className="text-[12px] flex items-center gap-3">
              <BiSolidCalendar />
              <span className="font-semibold">Uploaded On :</span>{" "}
              {formattedCreatedAt}
            </p> */}
            <p className="text-[12px] flex items-center gap-3">
              <BiSolidCalendar />
              <span className="font-semibold">Class Date :</span>{" "}
              {formattedSubmissionDate}
            </p>
          </div>

          {!admin ? (
            <></>
          ) : (
            <div className="flex">
              <Dialog>
                <div className="flex gap-2 items-center">
                  <p>
                    <DialogTrigger className="bg-pink-700 rounded p-1  flex items-center gap-1">
                      Delete <MdDeleteForever />
                    </DialogTrigger>
                  </p>
                </div>
                <DialogContent className="sm:max-w-[425px] bg-slate-950 text-white">
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure? </DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      the upcoming class notification for students.
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingCard;
