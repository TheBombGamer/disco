import ChatFeed from "@app/components/ChatFeed";
import Image from "next/image";
import React from "react";
import { IoIosSend } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const page = () => {
  // const chats = [...]
  const chats = [
    {
      userId: "1",
      message: "Hello teach me Next.js",
      username: "Nzube",
      createdAt: "12 minutes ago",
    },
    {
      userId: "2",
      message: "Any Programmer here ?",
      username: "kenechukwu",
      createdAt: "20 minutes ago",
    },
    {
      userId: "myId",
      message: "I am a next.js developer",
      username: "Emma Js",
      createdAt: "15 minutes ago",
    },
    // Additional chat messages:
    {
      userId: "3",
      message: "I love coding!",
      username: "CodeMaster",
      createdAt: "30 minutes ago",
    },
    {
      userId: "2",
      message: "What do you want to learn?",
      username: "kenechukwu",
      createdAt: "25 minutes ago",
    },
    {
      userId: "myId",
      message: "Anyone working on a project?",
      username: "Emma Js",
      createdAt: "10 minutes ago",
    },
    {
      userId: "1",
      message: "Yes, I am working on a project.",
      username: "Nzube",
      createdAt: "8 minutes ago",
    },
    {
      userId: "3",
      message: "I need help with JavaScript.",
      username: "CodeMaster",
      createdAt: "5 minutes ago",
    },
    {
      userId: "2",
      message: "I can help you with JavaScript!",
      username: "kenechukwu",
      createdAt: "3 minutes ago",
    },
    {
      userId: "myId",
      message: "Let's create a chat app together!",
      username: "Emma Js",
      createdAt: "1 minute ago",
    },
    // Add 10 more chat messages:
    {
      userId: "1",
      message: "Who wants to pair program?",
      username: "Nzube",
      createdAt: "5 minutes ago",
    },
    {
      userId: "3",
      message: "I'm available for pair programming!",
      username: "CodeMaster",
      createdAt: "3 minutes ago",
    },
    {
      userId: "2",
      message: "Let's work on a project together!",
      username: "kenechukwu",
      createdAt: "1 minute ago",
    },
    {
      userId: "myId",
      message: "Sure! I'm excited to collaborate.",
      username: "Emma Js",
      createdAt: "just now",
    },
    {
      userId: "1",
      message: "Great! Let's discuss the project details.",
      username: "Nzube",
      createdAt: "just now",
    },
    {
      userId: "2",
      message: "I have experience with React.",
      username: "kenechukwu",
      createdAt: "just now",
    },
    {
      userId: "3",
      message: "I prefer working with Node.js.",
      username: "CodeMaster",
      createdAt: "just now",
    },
    {
      userId: "myId",
      message: "I can handle the backend.",
      username: "Emma Js",
      createdAt: "just now",
    },
    {
      userId: "1",
      message: "Let's divide the tasks!",
      username: "Nzube",
      createdAt: "just now",
    },
    {
      userId: "2",
      message: "Sounds good! Let's get started.",
      username: "kenechukwu",
      createdAt: "just now",
    },
    // Add more chat messages as needed
  ];

  return (
    <div className="w-[500px]  border-slate-500 flex flex-col gap-1">
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
        <h6 className="uppercase font-bold">Front End Development</h6>
      </div>
      <ChatFeed />
      <div className="flex items-center p-2 w-full bg-slate-900">
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
