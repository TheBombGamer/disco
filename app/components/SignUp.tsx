"use client";

import React, { useEffect, useState } from "react";
import { GoPerson, GoLock } from "react-icons/go";
import { FiMail } from "react-icons/fi";
import Link from "next/link";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UploadButton, UploadDropzone } from "@utils/uploadthing";
import Image from "next/image";

interface Provider {
  id: string;
  name: string;
}

const SignUp: React.FC = () => {
  // const [status, setStatus] = useState("super admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setuserName] = useState("");
  const [department, setDept] = useState("");
  const [level, setLevel] = useState("");
  const [image, setImage] = useState("");
  // const [providers, setProviders] = useState<Provider[]>([]); // Adjust the type for providers
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) {
      if (session.user.role === "student") {
        router.push("/app"); // Redirect to student dashboard
      } else if (session.user.role === "admin") {
        router.push("/admin"); // Redirect to admin dashboard
      }
    }
  }, [session]);

  // useEffect(() => {
  //   const setUpProviders = async () => {
  //     const response = await getProviders();
  //     console.log("providers response =", response);
  //     if (response) {
  //       const providerArray = Object.entries(response).map(([key, value]) => ({
  //         id: key,
  //         name: value.name,
  //       }));
  //       setProviders(providerArray);
  //     }
  //   };
  //   setUpProviders();
  // }, []);

  const [role, setRole] = useState<"admin" | "student">("student"); // Default role is "student"

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as "admin" | "student");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setError("");
    setter(e.target.value);
  };
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value);
  };
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDept(e.target.value);
  };

  const formData = {
    email,
    password,
    name,
    username,
    department,
    level,
    image,
    role,
    status,
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      // console.log("submitting with values:", {
      //   email,
      //   password,
      //   name,
      //   username,
      //   department,
      //   matric,
      //   level,
      //   image,
      //   role,
      //   status
      // });
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response?.ok) {
        // console.log("user registerd succefully");
        setLoading(false);
        // console.log("session is :", session?.user);

        try {
          // console.log("submitting with values:", {
          //   email,
          //   password,
          // });
          const response = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
          });

          if (response?.error) {
            // console.log("failed to register user", response.error);
            setError("Something went wrong");
          } else {
            // console.log("user registerd succefully");
            // console.log("session is :", session?.user);
            setLoading(false);
          }
        } catch (error) {
          setError("Something went wrong");
          // console.error("Error during SignUp", error);
        } finally {
          setLoading(false);
        }
      } else {
        // console.log("failed to register user", response.status);
        setError("User with this email already exists");
      }
    } catch (error) {
      console.error("Error during SignUp", error);
    } finally {
      setLoading(false);
    }
  };

  const inputs = [
    {
      name: "fullname",
      type: "text",
      placeholder: "Enter your full name",
      icon: GoPerson,
      value: name,
      setter: setName,
    },
    {
      name: "name",
      type: "text",
      placeholder: "Enter your username",
      icon: GoPerson,
      value: username,
      setter: setuserName,
    },
    // {
    //   name: "name",
    //   type: "text",
    //   placeholder: "Enter your Status",
    //   icon: GoPerson,
    //   value: status,
    //   setter: setStatus,
    // },
    // {
    //   name: "dept",
    //   type: "text",
    //   placeholder: "Enter your Department",
    //   icon: GoPerson,
    //   value: department,
    //   setter: setDept,
    // },

    // {
    //   name: "level",
    //   type: "number",
    //   placeholder: "Enter your Level",
    //   icon: GoPerson,
    //   value: level,
    //   setter: setLevel,
    // },
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
      name: "cpassword",
      type: "password",
      placeholder: "Confirm a Password",
      icon: GoLock,
      value: confirmPassword,
      setter: setConfirmPassword,
    },
  ];

  return (
    <div className="flex flex-col gap-6 border p-6 w-80 text-sm mt-20">
      <h6 className="text-lg font-semibold">Registration</h6>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {image ? (
          <>
          <div className="flex items-center justify-center ">

            <Image
              src={image}
              width={80}
              height={80}
              alt="logo"
              className="rounded-full"
            />
          </div>
          </>
        ) : (
          <>
            <UploadDropzone
              className="bg-black border w-64 h-56 border-slate-400 border-dashed md:block hidden "
              endpoint="imgUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                setImage(res[0].url);
                console.log("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                console.log(`ERROR! ${error.message}`);
              }}
            />
            <UploadButton
              className="bg-black border w-64 h-20 border-slate-400 border-dashed md:hidden "
              endpoint="imgUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                setImage(res[0].url);
                console.log("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                console.log(`ERROR! ${error.message}`);
              }}
            />
          </>
        )}

        {/* <div className="flex border-b border-gray-500 items-center gap-3 py-1 text-gray-400">
          <select
            value={role}
            onChange={handleRoleChange}
            className="bg-transparent outline-none w-full text-white"
          >
            <option className="bg-black text-white p-1" value="student">Select Your role</option>
            <option className="bg-black text-white p-1" value="student">student</option>
            <option className="bg-black text-white p-1" value="admin">admin</option>

          </select>
        </div> */}
        <div className="flex border-b border-gray-500 items-center gap-3 py-1 text-gray-400">
          <select
            value={department}
            onChange={handleDepartmentChange}
            className="bg-transparent outline-none w-full text-white"
          >
            <option
              className="bg-black text-white p-1"
              value=""
              disabled
              selected
            >
              Select Your Department
            </option>
            <option
              className="bg-black text-white p-1"
              value="Mechanical ENgineering"
            >
              Mechanical ENgineering
            </option>
            <option
              className="bg-black text-white p-1"
              value="Medicine and Surgery"
            >
              Medicine and Surgery
            </option>
            <option
              className="bg-black text-white p-1"
              value="Computer Science"
            >
              Computer Science
            </option>
            <option className="bg-black text-white p-1" value="Phamarcy">
              Phamarcy
            </option>
            <option
              className="bg-black text-white p-1"
              value="Software Engineering"
            >
              Software Engineering
            </option>
            <option className="bg-black text-white p-1" value="">
              Others
            </option>
          </select>
        </div>

        <div className="flex border-b border-gray-500 items-center gap-3 py-1 text-gray-400">
          <select
            value={level}
            onChange={handleLevelChange}
            className="bg-transparent outline-none w-full text-white"
          >
            <option
              className="bg-black text-gray-500 p-6 hover:bg-primary"
              value=""
              disabled
              selected
            >
              Select Your Level
            </option>
            <option className="bg-black text-white p-1 " value="100">
              100 Level
            </option>
            <option className="bg-black text-white p-1" value="200">
              200 Level
            </option>
            <option className="bg-black text-white p-1" value="300">
              300 Level
            </option>
            <option className="bg-black text-white p-1" value="400">
              400 Level
            </option>
            <option className="bg-black text-white p-1" value="500">
              500 Level
            </option>
          </select>
        </div>

        {inputs.map((input) => (
          <div
            className="flex border-b border-gray-500 items-center gap-3 py-1 text-gray-400"
            key={input.name}
          >
            {React.createElement(input.icon, { className: "text-2xl" })}
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
        <div className="flex items-center mt-2 gap-3 text-slate-200">
          <input type="checkbox" name="" id="" required />
          <p className="">I accept all terms and conditions</p>
        </div>

        <p className="text-red-500">{error}</p>

        {loading ? (
          <button
            type="submit"
            disabled
            className="bg-primary text-black font-semibold rounded p-1 opacity-3 cursor-wait"
          >
            loading...
          </button>
        ) : (
          <button
            type="submit"
            className="bg-primary text-black font-semibold rounded p-1"
          >
            Register Now
          </button>
        )}
        {/* <p className="">or</p>
        {providers.map((provider) => (
          <button
            key={provider.id}
            type="button"
            onClick={handleSignIn}
            className="p-1 rounded border"
          >
            Continue with {provider.name}
          </button>
        ))} */}
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
