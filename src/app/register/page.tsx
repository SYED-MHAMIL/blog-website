 "use client"

import { FormEvent, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { app } from "@/firebase/firebaseConfig";
import Link from "next/link";
import { Bounce, toast } from "react-toastify";

const RegisterPage = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [gender, setgender] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, seterror] = useState<string | null>(null);
  const [message, setmessage] = useState<string | null>(null);

  
  const auth = getAuth(app);
  const handlerRegister = async (e: FormEvent) => {
    e.preventDefault();

    seterror(null);
    setmessage(null);

    if (password !== confirmPassword) {
      seterror("password do not match ");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Signed up
      const user = userCredential.user;

      await sendEmailVerification(user);

      localStorage.setItem(
        "registrationData",
        JSON.stringify({ firstName, lastName, gender, email })
      );

      setmessage(
        "Registeration successfullly please check your email verification "
      );

      toast.success("Registeration successfullly please check your email verification",{position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
})

      // clear all fields

      setpassword("");
      setconfirmPassword("");
      setgender("");
      setemail("");
      setfirstName("");
      setlastName("");
    } catch (error) {
      if (error instanceof Error) {
        seterror(error.message);
      } else {
        seterror("An unknown error occurred");
      }
      // ...
    }
  };

  return (
    <>
      
   
      <div className="bg-gradient-to-b from-white to-gray-100 justify-center items-center h-screen w-screen flex flex-col relative">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">
          Register
        </h2>

        <div className="p-5 border border-gray-300 bg-white rounded shadow-lg">
          <form onSubmit={handlerRegister} className="space-y-6 px-6 pb-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="firstname"
                  className="text-sm font-medium block mb-2 text-gray-800"
                >
                  First Name :
                  <input
                    type="text"
                    id="firstname"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    required
                    className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-white placeholder-gray-400 text-gray-800"
                  />
                </label>
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="lastname"
                  className="text-sm font-medium block mb-2 text-gray-800"
                >
                  Last Name
                  <input
                    type="text"
                    id="lastname"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    required
                    className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-white placeholder-gray-400 text-gray-800"
                  />
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="gender"
                className="text-sm font-medium block mb-2 text-gray-800"
              >
                Gender
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-white placeholder-gray-400 text-gray-800"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium block mb-2 text-gray-800"
              >
                Email
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                  className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-white placeholder-gray-400 text-gray-800"
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium block mb-2 text-gray-800"
              >
                Password
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                  className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-white placeholder-gray-400 text-gray-800"
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium block mb-2 text-gray-800"
              >
                Confirm Password
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  required
                  className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-white placeholder-gray-400 text-gray-800"
                />
              </label>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}

            <button className="w-full flex justify-center py-2 px-4 border text-sm font-medium border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Sign up
            </button>
          </form>

          <p className="text-sm font-medium text-gray-800 space-y-6 px-6 pb-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-700 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
