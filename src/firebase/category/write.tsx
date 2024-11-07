// create new category



import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { auth, db, storage } from "../firebaseAuth"
import { doc, setDoc, Timestamp } from "firebase/firestore"





type CategoryWriteType={
    data :{[key :string]:string} ;
 
    image :File | null;
}


export  const CategoryWrite= async({data,image}:CategoryWriteType)=>{
  
    if(!data?.name){
        throw new Error  (" name is undefined")
    }
     if(!data?.slug){
        throw new Error  (" slug is undefined")
    } 
    if(!image){
        throw new Error  (" image is not selected")
    }
    
    
    const makeImageName = () => {
        let imageName = data?.slug.split(".");
        let lastIndex = imageName!?.length - 1;
        let imageType = imageName![lastIndex];
        let newName = `${auth.currentUser?.uid}.${imageType}`;
        return newName;
    };
    const imageRef= ref(storage , `categories/${makeImageName()}`)

await uploadBytesResumable(imageRef,image);

const id=Date.now();

   const imageURL = await getDownloadURL(imageRef)
      const docRef= doc(db,`categories/${id}`)

      if(imageURL){

          await setDoc(docRef,{
              ...data,
              uid : auth.currentUser?.uid ,
              id :id,
              iconURL :  imageURL ,
              timeStamp : Timestamp.now()
          })
      }



}


export  const UpdateCategory= async({data,image}:CategoryWriteType)=>{
  
    if(!data?.name){
        throw new Error  (" name is undefined")
    }
     if(!data?.slug){
        throw new Error  (" slug is undefined")
    } 
    if(!image){
        throw new Error  (" image is not selected")
    }
    
    
    const makeImageName = () => {
        let imageName = data?.slug.split(".");
        let lastIndex = imageName!?.length - 1;
        let imageType = imageName![lastIndex];
        let newName = `${auth.currentUser?.uid}.${imageType}`;
        return newName;
    };
    const imageRef= ref(storage , `categories/${makeImageName()}`)

await uploadBytesResumable(imageRef,image);


   const imageURL = await getDownloadURL(imageRef)
      const docRef= doc(db,`categories/${data?.id}`)
      console.log(data?.id);
      
      if(imageURL){

          await setDoc(docRef,{
              ...data,
              iconURL :  imageURL ,
              timeStamp : Timestamp.now()
          })
      }



}
