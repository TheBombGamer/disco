"use client";

import React, { useState } from "react";
import { GoPerson, GoLock } from "react-icons/go";
import { FiMail } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     // const response = await fetch("/api/auth/login", {
  //     //   method: "POST",
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //   },
  //     //   body: JSON.stringify({ email, password }),
  //     // });
  //     // if (response.ok) {
  //     //   // Redirect the user to the dashboard or any other protected page

  //     // } else {
  //     //   setError("Invalid email or password");
  //     // }


  //   } catch (error : any) {
  //     console.error("Login failed:", error.message);
  //     setError("Failed to login");
  //   }
  // };

  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log("submitting with values:", {
        email,
        password,
        // name,
        // username,
        // department,
        // level,
      });
      const response = await signIn("credentials", {
        email : email,
        password : password,
        // name,
        // username,
        // department,
        // level,
        redirect: false,
      });

      if (response?.error) {
        console.log("failed to register user", response.error);
      } else {
        console.log("user registerd succefully");
        router.push("/app");
        console.log("session is :", session?.user);
      }

      // if (response?.ok) {
      //   const data = await response.json();
      //   console.log("User SignUp was Successful");
      // } else {
      //   const errorData = await response.json();
      //   console.error("failed to SignUp", errorData.error);
      // }
    } catch (error) {
      console.error("Error during SignUp", error);
    }
  };

  const inputs = [
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
      placeholder: "Confirm a Password",
      icon: GoLock,
      value: password,
      setter: setPassword,
    },
  ];
  return (
    <div className="flex flex-col gap-6 border p-6 w-80 text-sm mt-20">
      <h6 className="text-lg font-semibold">Login</h6>

      <form action="" className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <div className="flex border-b border-gray-500 items-center gap-3 py-1 text-gray-400" key={input.name}>
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

        <div className="flex justify-between items-center ">
          <div className="flex items-center mt-2 gap-3 text-slate-200">
            <input type="checkbox" name="" id="" required />
            <p className="text-[10px]">Remember me</p>
          </div>
          <p className="text-[10px] text-primary font-semibold">Forgot Password</p>
        </div>

        <button
          type="submit"
          className="bg-primary text-black font-semibold rounded p-1"
        >
          Login Now
          {error && <p>{error}</p>}
        </button>
        <p className="text-center text-[10px]">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-primary font-semibold">
            Register now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
