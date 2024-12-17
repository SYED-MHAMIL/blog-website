import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebaseAuth"




export const ReadCategory=async(id:number)=>{
   return await getDoc(doc(db , `categories/${id}`)).then(snaps=>snaps.data())
}

export const allCategory=async()=>{
   return await getDocs(collection(db,"categories")).then((snaps)=> snaps.docs.map(v=>v.data()))

}

export const individualCategory=async(id:number)=>{


   const q= query(collection(db,`posts`),where("categoryID" ,'==', id))
   return await getDocs(q).then((snaps)=> snaps.docs.map(v=>v.data()))

}
