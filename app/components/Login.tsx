"use client";

import React, { useEffect, useState } from "react";
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

  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
    setError("");
  };

  useEffect(() => {
    if (session) {
      if (session.user.role === 'student') {
        router.push('/app'); // Redirect to student dashboard
      } else if (session.user.role === 'admin') {
        router.push('/admin'); // Redirect to admin dashboard
      } else {
        setError("User role not defined");
      }
    }
  }, [session]);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
  
      if (response?.error) {
        console.log("Failed to sign in user", response.error);
        setError("something went wrong (check credentials / connection");
      } else {
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
  
    } finally {
      setLoading(false);
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
          <div
            className="flex border-b border-gray-500 items-center gap-3 py-1 text-gray-400"
            key={input.name}
          >
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

        {/* <div className="flex justify-between items-center ">
          <div className="flex items-center mt-2 gap-3 text-slate-200">
            <input type="checkbox" name="" id="" />
            <p className="text-[10px]">Remember me</p>
          </div>
          <p className="text-[10px] text-primary font-semibold">
            Forgot Password
          </p>
        </div> */}
     
        <p className="text-red-500">{error}</p>
        {loading ? (
          <button
            type="submit"
            className="bg-primary text-black font-semibold rounded p-1 cursor-wait"
          >
            Login in....
        
          </button>
        ) : (
          <button
            type="submit"
            className="bg-primary text-black font-semibold rounded p-1"
          >
            Login Now
      
          </button>
        )}
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
