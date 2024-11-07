// create new posts



import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { auth, db, storage } from "../firebaseAuth"
import { doc, setDoc, Timestamp } from "firebase/firestore"





type postsWriteType={
    data :{[key :string]:string} ;
 
    image :File | null;
}


export  const postsWrite= async({data,image}:postsWriteType)=>{
  
    if(!data?.name){
        throw new Error  (" name is undefined")
    }
     if(!data?.slug){
        throw new Error  (" slug is undefined")
    } 
    if(!image){
        throw new Error  (" image is not selected")
    }
   
    const imageRef= ref(storage , `posts/${Date.now()}.png`)

await uploadBytesResumable(imageRef,image);

const id=Date.now()

   const imageURL = await getDownloadURL(imageRef)
      const docRef= doc(db,`posts/${id}`)

      if(imageURL){

          await setDoc(docRef,{
              ...data,
              uid : auth.currentUser?.uid ,
              id,
              imageURL ,
              timeStamp : Timestamp.now()
          })
      }



}


export  const UpdatePosts= async({data,image}:postsWriteType)=>{
  
    if(!data?.name){
        throw new Error  (" name is undefined")
    }
     if(!data?.slug){
        throw new Error  (" slug is undefined")
    } 
    if(!image){
        throw new Error  (" image is not selected")
    }
    
    
    const imageRef= ref(storage , `posts/${Date.now()}.png`)

await uploadBytesResumable(imageRef,image);


   const imageURL = await getDownloadURL(imageRef) 
      const docRef= doc(db,`posts/${data?.id}`)
      console.log(data?.id);
      
      if(imageURL){

          await setDoc(docRef,{
              ...data,
              
              imageURL :  imageURL ,
              timeStamp : Timestamp.now()
          })
      }



}
