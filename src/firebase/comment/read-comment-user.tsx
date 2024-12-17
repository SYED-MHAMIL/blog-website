// import { doc, DocumentData, getDoc, onSnapshot } from "firebase/firestore"
// import { auth, db } from "../firebaseAuth"
// import { useEffect, useState } from "react";
// import { useAuthContext } from "@/context/auth.context";





// export default  function userCommentsData(){
    
//     const [userData ,setUserData]=useState<DocumentData  | null  | undefined >(null);
// const  {user}   = useAuthContext();
    
// useEffect(()=>{
//     if (!user) return
//     fetchData()
//     console.log(user ,"users hai");
//  console.log(user && userData,"commmt");
     
// },[user])


// const fetchData=()=>{
// const id = auth?.currentUser?.uid ;

//     const docRef= doc(db,`users/${id}`);
     
//     try {
//  if(user)       
// {  
//      onSnapshot(docRef,(snaps)=>{
//   const data:DocumentData | undefined = snaps.data()
//         console.log(data , "ineere server");
   
//     // const allData = Promise.all(data)

// setUserData(data)

//         }
//   )}

//     } catch (error) {
//            console.log(error);
           
//     }

// }

   
//     return {userData} ;
// }