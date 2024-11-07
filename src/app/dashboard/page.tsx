"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebaseAuth";
import { firestore } from "@/firebase/firebaseConfig";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useAuthContext } from "@/context/auth.context";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const dashRouter = useRouter();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user)  =>{
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(`${userData.firstName} ${userData.lastName}`);
        }
      } else {
        dashRouter.push("/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [dashRouter]);

 
  const handleChangePassword = () => {
    dashRouter.push("/passwordchange");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
  <div className="min-h-screen bg-white">
  <nav className="bg-gray-200 p-4">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <div className="text-gray-800 text-xl">Dashboard</div>
        </div>
      </div>
    </div>
  </nav>

  <main className="flex flex-col items-center justify-center flex-grow mt-10">
    {userName && (
      <h1 className="text-4xl font-bold mb-6 ml-10 text-gray-900">
        Welcome {userName}!{" "}
      </h1>
    )}
    <div className="space-x-4">
      <button
        // onClick={handleLogout}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
      >
        Logout
      </button>
      <button
        onClick={handleChangePassword}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
      >
        Change Password
      </button>
    </div>
  </main>
</div>

    
    


       
    

    
    </>
  );
}
