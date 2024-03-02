"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { PiDownloadSimple } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";

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
import actioner from "@action";
import { useSession } from "next-auth/react";

type SetRefreshFunction = React.Dispatch<React.SetStateAction<boolean>>;

interface CourseCardProps {
  _id: string;
  title: string;
  summary: string;
  pdf: string;
  createdAt: string;
  setRefresh: SetRefreshFunction;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  summary,
  pdf,
  _id,
  createdAt,
  setRefresh,
}) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const admin = session?.user.role === "admin";

  const [titleEdit, setTitleEdit] = useState(title);
  const [summaryEdit, setSummaryEdit] = useState(summary);
  const [fileEdit, setFileEdit] = useState(pdf);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    // console.log("formdata =", fileEdit, summaryEdit, fileEdit, _id);
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = {
        title: titleEdit,
        summary: summaryEdit,
        pdf: fileEdit,
        id: _id,
      };

      const response = await fetch("/api/course/update", {
        method: "PATCH",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSuccess("changes saved successfully!");
        setRefresh((prevRefresh) => !prevRefresh);
        actioner();
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
    try {
      const id = _id;

      const response = await fetch("/api/course/update", {
        method: "DELETE",
        body: JSON.stringify(id),
      });
      if (response.ok) {
        setSuccess("Deleted successfully!");
        actioner();
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

  return (
    <div>
      <div
        key={title}
        className="bg-black flex md:w-[75%] mdflex-row  gap-2 border border-gray-500 p-2"
      >
        <div className="flex-1 text-sm flex flex-col gap-3">
          <h6 className="font-bold text-lg">{title}</h6>
          <p className="text-gray-500">{summary}</p>

          <div className="flex justify-between flex-wrap">
            {!admin ? (
              <div className="flex gap-2 items-center">
                <Link href={pdf} download="downloaded_file.pdf">
                  <p className="bg-pink-700 rounded p-1 text-[10px] flex items-center gap-3">
                    Downoad <PiDownloadSimple />
                  </p>
                </Link>
              </div>
            ) : (
              <>
                <Dialog>
                  <div className="flex gap-2 items-center ">
                    <p>
                      <DialogTrigger className="bg-pink-700 rounded p-1 flex items-center gap-3 mb-3 md:mb-0">
                        Delete <MdDeleteForever />
                      </DialogTrigger>
                    </p>
                  </div>
                  <DialogContent className="sm:max-w-[425px] bg-slate-950 text-white">
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure? </DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete the course.
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
                <div className="flex gap-2 items-center"></div>
                <p className="text-[12px] flex items-center gap-3">
                  <SlCalender />
                  <span className="font-semibold">Uploaded On :</span>{" "}
                  {formattedCreatedAt}
                </p>
              </>
            )}
          </div>
        </div>
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
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <form action="" onSubmit={handleEdit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="name"
                      value={titleEdit}
                      onChange={(e) => handleInputChange(e, setTitleEdit)}
                      className="col-span-3 bg-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-4 items- gap-4">
                    <Label htmlFor="username" className="text-right">
                      Summary
                    </Label>
                    <Textarea
                      id="username"
                      value={summaryEdit}
                      rows={10}
                      onChange={(e) => handleInputChange(e, setSummaryEdit)}
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
                    <UploadButton
                      // className="bg-black border w-64 h-56 border-slate-400 border-dashed "
                      endpoint="pdfUploader"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        console.log("Files: ", res);
                        setFileEdit(res[0].url);
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
    </div>
  );
};

export default CourseCard;
