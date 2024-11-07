"use client";

import {useState} from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth } from "@/firebase/firebaseAuth";
import {firestore } from "@/firebase/firebaseConfig";
import {doc,getDoc, setDoc} from "firebase/firestore";
import Link from "next/link";
import AuthContextProvider from "@/context/auth.context";
import GoogleButton from "../components/header/googleButton";



export default function LoginPage(){

    const [email ,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState<null | string >(null);
    const route = useRouter();
    
const handleLogin=async (e : React.FormEvent)=>{
    e.preventDefault();
    setError(null);
    try {
        
       const userCredential = await signInWithEmailAndPassword(auth , email ,password);

           const user = userCredential.user ; 
           
            if(user.emailVerified){
                const registrationData = localStorage.getItem("registrationData");
                const {
                  firstName = "",
                  lastName = "",
                  gender = "",
                } = registrationData ? JSON.parse(registrationData) : {};

                const userDoc = await getDoc(doc(firestore, "users", user.uid));
                if (!userDoc.exists()) {
             
        
                    await setDoc(doc(firestore, "users", user.uid), {
                      firstName,
                      lastName,
                      gender,
                      email: user.email,
                    });
                  }
                  // route.push("/dashboard"); beforer
                  route.push("/admin");
            }else{
                setError("please  verify your email before log in ")
            }
          
    } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred");
          }
          // ...
    }
} 

return (
    <>
 <div className="bg-gradient-to-b from-white to-gray-100 justify-center items-center h-screen w-screen flex flex-col relative">
  <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">Syed Mohamil</h2>

  <div className="p-5 border border-gray-300 bg-white rounded shadow-lg">
    <form onSubmit={ handleLogin }
     className="space-y-6 px-6 pb-4">
      <div className="mb-15">
        <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-800">
          Email
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-white placeholder-gray-400 text-gray-800"
          />
        </label>
      </div>

      <div className="mb-15">
        <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-800">
          Password
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-white placeholder-gray-400 text-gray-800"
            />
        </label>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        className="w-full flex justify-center py-2 px-4 border text-sm font-medium border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        type="submit"
        >
        Log in
      </button>
      

        <AuthContextProvider>
    <GoogleButton/>
      </AuthContextProvider>
    
    </form>

    <p className="text-sm font-medium text-gray-800 space-y-6 px-6 pb-4">
      Don&apos;t have an account?{" "}
      <Link href="/register" className="text-blue-700 hover:underline">
        Register here
      </Link>
    </p>
  </div>
</div>
    </>
  );







}; //function end

