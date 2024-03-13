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
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    // console.log('about to send email...')
    try {
      setLoading(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (response.ok) {
        // console.log("Upload successful");
        setEmail("");
        setName("");
        setSubject("");

        setSuccess("Mail was sent Successfully ");
      } else {
        console.error("Upload failed");
        setError("Something Went Wrong");
      }
      // console.log(name, email, subject, message)
      const data = await response.json();
      // console.log('data' , data);
    } catch (error) {
      // console.error("Error fetching data:", error);
      setError("Error Sending Email(check connection)");
    } finally {
      setLoading(false);
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
      name: "subject",
      type: "text",
      placeholder: "Subject",
      value: subject,
      setter: setSubject,
    },
  ];

  const contacts = [
    {
      name: "Address",
      icon: IoLocationSharp,
      value: "No 10 Vegetable Street Mango , Google",
    },
    {
      name: "Phone",
      icon: IoCall,
      value: "+234 810 000 0000",
    },
    {
      name: "Email",
      icon: IoIosSend,
      value: "info@enginelearnhub.com",
    },
  ];

  return (
    <section className="flex md:flex-row mt-20 flex-col">
      <div className="flex flex-col gap-6 border border-gray-500 p-6 w-96 text-sm ">
        <h6 className="text-2xl font-semibold">Send me a message</h6>

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
                required
                onChange={(e) => handleInputChange(e, input.setter)}
              />
            </div>
          ))}

          <textarea
            rows={5}
            value={message}
            required
            onChange={(e) => handleInputChange(e, setMessage)}
            placeholder="Message"
            className=" bg-transparent outline-none w-full py-3  text-white border-b border-gray-500"
          />
         
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          {loading ? (
              <div className="">
            <button
              type="submit"
              className="bg-primary text-white font-semibold rounded p-3 "
            >
              Sending....
            </button>
          </div>
          ) : (
            <div className="">
            <button
              type="submit"
              className="bg-primary text-white font-semibold rounded p-3 "
            >
              Send Message
            </button>
          </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
