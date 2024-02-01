"use client";

import React, { useState } from "react";
import { GoPerson, GoLock } from "react-icons/go";
import { FiMail } from "react-icons/fi";
import Link from "next/link";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
  };
  
  const handleSubmit = () => {
  }
  

  const inputs = [
    {
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      icon: GoPerson,
      value: name,
      setter: setName,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      icon: FiMail,
      value: email,
      setter: setEmail,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter a Password",
      icon: GoLock,
      value: password,
      setter: setPassword,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Confirm a Password",
      icon: GoLock,
      value: confirmPassword,
      setter: setConfirmPassword,
    },
  ];
  return (
    <div className="flex flex-col gap-6 border p-6 w-80 text-sm mt-20" >
      <h6 className="text-lg font-semibold">Registration</h6>

      <form action="" className="flex flex-col gap-5" onClick={handleSubmit}>
        {inputs.map((input) => (
          <div className="flex border-b border-gray-500 items-center gap-3 py-1 text-gray-400">
            <input.icon className="text-2xl " />
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
        <div className="flex items-center mt-2 gap-3 text-slate-200">
          <input type="checkbox" name="" id="" required />
          <p className="">I accept all terms and conditions</p>
        </div>

        <button
          type="submit"
          className="bg-primary text-black font-semibold rounded p-1"
        >
          Register Now
        </button>
        <p className="text-center text-[10px]">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold">
            Login now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
