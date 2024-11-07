// create new category



import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { auth, db, storage } from "../firebaseAuth"
import { doc, setDoc, Timestamp } from "firebase/firestore"





type AuthorsWriteType={
    data :{[key :string]:string} ;
 
    image :File | null;
}


export  const AuthorsWrite= async({data,image}:AuthorsWriteType)=>{
  
    if(!data?.name){
        throw new Error  (" name is undefined")
    }
  
    if(!image){
        throw new Error  (" image is not selected")
    }
    
   
    const imageRef= ref(storage , `authors/${Date.now()}.png`)

await uploadBytesResumable(imageRef,image);

const id=Date.now();

   const imageURL = await getDownloadURL(imageRef)
      const docRef= doc(db,`authors/${id}`)

      if(imageURL){

          await setDoc(docRef,{
              ...data,
              uid : auth.currentUser?.uid ,
              id :id,
              photoURL :  imageURL ,
              timeStamp : Timestamp.now()
          })
      }



}


export  const UpdateAuthors= async({data,image}:AuthorsWriteType)=>{
  
    if(!data?.name){
        throw new Error  (" name is undefined")
    }
   
    if(!image){
        throw new Error  (" image is not selected")
    }
    
    
    const imageRef= ref(storage , `authors/${Date.now()}.png`)

await uploadBytesResumable(imageRef,image);


   const imageURL = await getDownloadURL(imageRef)
      const docRef= doc(db,`authors/${data?.id}`)
      console.log(data?.id);
      
      if(imageURL){

          await setDoc(docRef,{
              ...data,
              photoURL :  imageURL ,
              timeStamp : Timestamp.now()
          })
      }



}
