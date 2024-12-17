"use client";

import { CategoryWrite, UpdateCategory } from "@/firebase/category/write";
import { createContext, useContext, useState } from "react";
 

type FormContextType={
    data :{[key :string]:string} ;
    error : string | null ; 
    image :File | null;
    isLoading : boolean ;
    isDone : boolean;
    setImage :(image:File)=> void;
    handleData:(key:string,value:string)=> void;
    createHandler : ()=> void;
    updateData : ()=> void;
     setData: (data: { [key: string]: string }) => void;
}

 


const CreateCateFormContext = createContext<FormContextType | null>(null);


export default  function CatFormProvider({children}:Readonly<{
    children: React.ReactNode;
  }>){

   
    const  [data,setData]= useState<{ [key: string]: string }>({});
    const  [isLoading,setIsLoading]= useState(false);
    const  [error,setError]= useState<string | null>(null);
    const  [isDone,setIsDone]= useState(false);
    const  [image,setImage]= useState<File | null>(null);

    

    

    const handleData=(key:string,value:string)=>{
                   setData({...data , [key] : value})
              
    }



   const updateData=async()=>{
    setError(null)
    setIsLoading(true) 
    setIsDone(true)
   try {

          
   await    UpdateCategory({data ,image})
   
          
        /// last 
            setIsDone(false)
       
   } catch (error) {
       setError(error instanceof Error ? error.message : String(error));

   }

   setIsLoading(false)
   }



    
    
    const createHandler= async()=>{
         setError(null)
         setIsLoading(true) 
         setIsDone(true)
        try {

               
        await    CategoryWrite({data ,image})
        
               
             /// last 
                 setIsDone(false)
            
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));

        }

        setIsLoading(false)
    }
   


    
   return <CreateCateFormContext.Provider value={{
    data,error,handleData,createHandler,isLoading,isDone,image,setImage,setData,updateData
    }}>
    {children}
    </CreateCateFormContext.Provider>


}

export const UseFormCatContext= ()=> useContext(CreateCateFormContext);