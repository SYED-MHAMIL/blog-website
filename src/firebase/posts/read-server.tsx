import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "../firebaseAuth"


export const getAllPost=async()=>{

  return await getDocs(collection(db,"posts")).then((snaps)=> snaps.docs.map(v=>v.data()))

}




export const  serverIndividualPosts=async(id : number)=>{
     
  return await getDoc(doc(db,`posts/${id}`)).then(snaps=>snaps.data()) ;

  
}