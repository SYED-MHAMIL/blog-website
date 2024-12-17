"use client"
import { collection, doc, DocumentData, getDoc, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../firebaseAuth"
import { useEffect, useState } from "react"



export default function ReadComments(id:number){

       const [readsComments,setReadsComments]=useState<DocumentData[]>([])
       const [isLoading,setIsLoading]=useState(false);


useEffect(()=>{

    fetchData()

},[])
        

       const fetchData=()=>{
           const docRef = query( collection(db,`postComments`),where("postId",  "==" , id))
               
           try {
               setIsLoading(true)
               const unsub= onSnapshot(docRef,async(snaps)=>{

      const data =  snaps.docs.map(async(v)=>{



         const uid =  v.data().uid;
         console.log(uid, "uid");
         
      const  userData =    await  getDoc(doc(db,`users/${uid}` )) ;
      console.log(userData.data() ,"userdata");
         
      const dataAll = {
        ...v.data() , 
       user :   userData.data(),
        id:v.id
    }

    
   return dataAll
    }

) ;
    

const net = Promise.all(data)
setIsLoading(false)
setReadsComments(await net)

                   })
                   return unsub;    
            
           } catch (error) {
                  console.log(error);
                  
           }
              
       }






    return     {
                 readsComments , isLoading
            }
    
}