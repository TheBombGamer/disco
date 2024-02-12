import ChatFeed from "@app/components/ChatFeed";
import Image from "next/image";
import React from "react";
import { IoIosSend } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const page = () => {


  return (
    <div className="w-full border-slate-500 flex flex-col gap-1">
      <div className="bg-slate-900 px-10 py-5 flex gap-5">
        <div className="">
          <Image
            src="/assets/logo.jpg"
            width={20}
            height={10}
            alt="logo"
            className="rounded-full"
          />
        </div>
        <h6 className="uppercase font-bold">Applied Electricity 1</h6>
      </div>
      <ChatFeed />
      <div className="flex items-center gap-4 p-2 w-full bg-slate-900">
        <MdOutlineEmojiEmotions />
        <input
          type="text"
          name=""
          id=""
          className="w-full bg-transparent outline-none"
        />
        <IoIosSend />
      </div>
    </div>
  );
};

export default page;
