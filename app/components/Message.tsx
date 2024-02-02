import Image from "next/image";
import React from "react";

interface MessageProps {
  userId: string;
  message: string;
  createdAt: string;
  username: string;
}

const Message: React.FC<MessageProps> = ({ userId, message, createdAt, username }) => {
     const isMyMessage = userId === 'myId';
  return (
    <div className={`w-full ${isMyMessage && 'float-right'}`}>
      <div className={`rounded bg-purple-900 w-fit  md:max-w-[50%] max-w-[60%] flex flex-col gap-1  p-1 ${isMyMessage && 'bg-green-950 float-right'}`}>
        <div className="flex gap-3 items-center">
          <div className="">
            <Image
              src="/assets/logo.jpg"
              width={20}
              height={10}
              alt="logo"
              className="rounded-full"
            />
          </div>
          <p className="">{username}</p>
        </div>
        <p className="">{message}</p>
      <p className="text-[10px] text-slate-300">{createdAt}</p>
      </div>
    </div>
  );
};

export default Message;
