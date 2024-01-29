"use client";

import React, { useState } from "react";
import { GoPerson, GoLock } from "react-icons/go";
import { FiMail } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('about to send email...')
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
        
    });
    console.log(name, email, subject, message)
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const inputs = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      icon: GoPerson,
      value: name,
      setter: setName,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      icon: FiMail,
      value: email,
      setter: setEmail,
    },
    {
      name: "email",
      type: "textarea",
      placeholder: "Subject",
      value: subject,
      setter: setSubject,
    },
  ];

  const contacts = [
    {
      name: "Address",
      icon: IoLocationSharp,
      value: "No 14 Nwannekezie Street Awada , obosi",
    },
    {
      name: "Phone",
      icon: IoCall,
      value: "+234 810 488 4066",
    },
    {
      name: "Email",
      icon: IoIosSend,
      value: "eokeke320@gmail.com",
    },
  ];

  return (
    <section className="flex mt-20">
      <div className="flex flex-col gap-6 border border-gray-500 p-6 w-96 text-sm ">
        <h6 className="text-2xl font-semibold">Send us a message</h6>

        <form action="" className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <div className="flex border-b border-gray-500 items-center gap-3 py-3 text-gray-400">
              <input
                type={input.type}
                name={input.name}
                id={input.name}
                placeholder={input.placeholder}
                className=" bg-transparent outline-none w-full text-white"
                value={input.value}
                onChange={(e) => handleInputChange(e, input.setter)}
              />
            </div>
          ))}
          <textarea
            className=" bg-transparent outline-none w-full text-white border-b border-gray-500"
            placeholder="Message"
            rows={10}
            value={message}
            onChange={(e) => handleInputChange(e, setMessage)}
          ></textarea>
          <div className="">
            <button
              type="submit"
              className="bg-primary text-white font-semibold rounded p-3 "
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      <div className=" bg-white px-5 py-16 text-black max-w-96">
        <h6 className="text-2xl font-semibold mb-1">Contact us</h6>
        <p className="text-sm mb-5">
          We are open for any suggestions or just to have a chat
        </p>

        <div className="flex flex-col gap-8 p-3">
          {contacts.map((contact) => (
            <div className="flex items-center gap-7" key={contact.name}>
              <contact.icon className="text-lg" />
              <p className="">
                <span className="font-semibold">{contact.name}</span>{" "}
                {contact.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
