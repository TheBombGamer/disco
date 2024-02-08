"use client";

import React, { useEffect, useState } from "react";
import { GoPerson, GoLock } from "react-icons/go";
import { FiMail } from "react-icons/fi";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [providers, setProviders] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      console.log("providers response =", response);
      setProviders(response);
    };
    setUpProviders();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // try {
    //   console.log("subitiong with values =", name, email, password);
    //   const response = await signIn("credentials", {
    //     username: name,
    //     email: email,
    //     password: password,
    //     redirect: false,
    //   });
    //   if (response?.error) {
    //     console.log("failed to register user ", response?.error);
    //   } else {
    //     console.log("user registered succesfully");
    //     // router.push("/app");
    //   }
    // } catch (error) {
    //   console.error("Error during SignUp", error);
    // }

    // Save user to the database
    const newUser = { name, email, password }; // Create a new user object
    console.log("New user:", newUser);

    // Send newUser object to your backend to save it to the database
    // const response = await fetch("/api/users", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newUser),
    // });

    // if (!response.ok) {
    //   throw new Error("Failed to register user");
    // }

    // const res = await signIn("credentials", {
    //   email : email,
    //   redirect: false,
    // });
    // console.log('session = ' , res )
    // console.log('error =' , res?.error)
    // After saving the user to the database, you may want to redirect the user to another page
    // router.push("/app"); // Redirect to a success page after registration
  };

  const handleSignIn = async () => {
    try {
      const response = await signIn("google", { redirect: false });
      console.log("response =", response);
      // router.push("/app");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

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
        <div className="flex items-center mt-2 gap-3 text-slate-200">
          <input type="checkbox" name="" id="" required />
          <p className="">I accept all terms and conditions</p>
        </div>

        <button
          type="submit"
          // onClick={() => signIn()}
          className="bg-primary text-black font-semibold rounded p-1"
        >
          Register Now
        </button>
        <p className="">or</p>
        {
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={handleSignIn}
                  className="p-1 rounded border"
                >
                  Continue with Google
                </button>
              ))}
          </>
        }
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
