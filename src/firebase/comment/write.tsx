

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { auth, db, storage } from "../firebaseAuth"
import { doc, setDoc, Timestamp } from "firebase/firestore"





type postComments={
     comment : string ;
     idComment: number ;
     id : number
}


export  const postComments= async({idComment,comment ,id}:postComments)=>{

      const docRef= doc(db,`postComments/${idComment}`)


          await setDoc(docRef,{
              comment ,
              postId:id,
              uid : auth.currentUser?.uid ,
              timeStamp : Timestamp.now()
          })
      



}






