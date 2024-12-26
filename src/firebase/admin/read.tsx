"use client"
import {
  doc,
  DocumentData,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebaseAuth";
import { useEffect, useState } from "react";


export  function useAdmin({uid}:{uid : string | undefined | null}) {

 const [admin ,setAdmin]=useState<DocumentData | null>(null)
useEffect(()=>{
    fetch()
},[uid])   //uid add  sdependency for error

 const fetch=async()=>{

   console.log("uid",uid);
   
   const docRef = doc(db, `admin/${uid}`);
   try {
     const snaps= await getDoc(docRef)
   const data:DocumentData | null = snaps.exists() ? snaps.data()  : null
     console.log(data, "data admin");
   console.log
   (snaps.exists(),"snaps")
     
   setAdmin(data)
   } catch (error) {
     console.log(error);
     
   }

        console.log(uid);
        console.log(admin);
 }
         
         if (!uid) {
          console.error("UID is required");
          return { admin: null, isLoading: false };
      }

  return {
    admin,
    isloading: admin === undefined ? true : false,
  };
}
