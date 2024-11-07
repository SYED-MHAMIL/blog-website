"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebaseAuth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setloading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.emailVerified) {
          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          if (!userDoc.exists()) {
            const registrationData = localStorage.getItem("registrationData");
            const {
              firstName = "",
              lastName = "",
              gender = "",
            } = registrationData ? JSON.parse(registrationData) : {};
            await setDoc(doc(firestore, "users", user.uid), {
              firstName,
              lastName,
              gender,
              email: user.email,
            });

            //clear data from local storage

            localStorage.removeItem("registrationData");
          }

          setUser(user);
          router.push("/dashboard");
        } else {
          setUser(null);
          router.push("/login");
        }
      } else {
        setUser(null);
        router.push("/login");
      }
      setloading(false);
    });
               
return ()=> unsubscribe();

  }, [router]);

  
  if (loading){
    return <p> </p>
  }
 

return(
  <div>
    {user  ?  "Redirecting to dashboad... " : "Redirecting to login... "}
  </div>
);
   

};
