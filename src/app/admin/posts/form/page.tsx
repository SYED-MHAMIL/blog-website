"use client"

import { useSearchParams } from "next/navigation";
import {  doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseAuth";
import { useEffect } from "react";
import Image from 'next/image'
import { UseFormPostsContext } from "./context/postsFormContext";
import { useCategories } from "@/firebase/category/read";
import { useAuthors } from "@/firebase/author/read";



export default function Form(){
const  {data,
  error,
  handleData,
  createHandler,
  isLoading,
  isDone,
  image,
  setImage,
  setData,
  updateData
}=UseFormPostsContext()!;

// update works   ===============================================

const searchParams=useSearchParams();
  const updatePostsId=searchParams.get("id");

useEffect(()=>{
  if(updatePostsId){
    fetch();
  }
},[updatePostsId])

const fetch=async()=>{
  
  try {
    console.log(updatePostsId , " post id");
    const docRef=doc(db,`posts/${updatePostsId}`);
    const  data =await getDoc(docRef)
    setData(data.data()!)
  } catch (error) {
        console.log(error);
        
  }



}
  
// update works   ===============================================
 
  

return(

    <>
     <main className="w-full p-6">

      
            <div className="flex gap-4 items-center m-2">
               <h1 className="font-bold">Posts  |  Form</h1>
{
updatePostsId  ?  <button className="bg-green-400 text-white font-bold  px-3 py-1 rounded-full hover:bg-green-600">Update</button>
: <button className="bg-blue-400 text-white font-bold  px-3 py-1 rounded-full hover:bg-blue-600">Create</button>

}
            </div>
       
     
     <div className="flex ">
      
   <form
    onSubmit={(e)=>{
         e.preventDefault()


         if (updatePostsId) {
          updateData()

         } else {
          
           createHandler();
           }
    }}
   className="space-y-3 w-1/4 bg-blue-50 p-7 rounded-xl">
   <div className="flex flex-col">
              <label htmlFor="Authors" className="block text-sm font-medium leading-6 text-gray-900">
                Title 
              </label>
              <div>
                <input
                  id="Authors"
                placeholder="Enter title"
                  type="text"
                  required
                  onChange={(e)=>{
                          handleData("title" ,e.target.value)
                  }}
                  value={data?.title}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="Slug" className="block text-sm font-medium leading-6 text-gray-900">
                 Authors Slug
              </label>
              <div >
                <input
                  id="Slug"
                   placeholder="Enter authors slug"
                   onChange={(e)=>{
                    handleData("slug" ,e.target.value)
            }}
            value={data?.slug}
                  type="text"
                  required
                  
                  className="block w-full rounded-md border-0 py-1.5  px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  "
                />
              </div>
            </div>
    <SelectCategory/>
  <SelectAuthor/>


       { 



     !image &&  data?.imageURL  && <Image src={data?.imageURL} alt="authomage" height={100} width={100}></Image>
       }
{
          image && <Image src={URL.createObjectURL(image)} alt="authomage" height={100} width={100}></Image>
        }

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Image
                </label>
            
              </div>
              <div >
                <input
                  id="password"
                  onChange={(e)=>{
                      
                     let imageRef = e.target.files;
                     if(imageRef?.length){
                     setImage(imageRef[0])}

                  }}
              
                  type="file"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5  px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                />
              </div>
            </div>
 
 {error   &&  <p className="text-red-600 ">{error}</p> }
 
            <div>
              <button
                type="submit"
                disabled={ isLoading || isDone }
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                 { isLoading  ? "loading..." : !updatePostsId ? "Create" : "update"}
              </button>
                     
                     {
                      isDone &&  <p className="text-center text-md text-green-600 font-bold mt-3">Successfully   {updatePostsId ?  "update" : "Create"}   !</p>
                     }

            </div>
          </form>
     </div>


     </main>
    </>
)


}   



function SelectCategory(){
  
  const  {categories} = useCategories() ;
  const  {data,

    handleData,
  
  }=UseFormPostsContext()!;
    return (
      <> 
      <h1 className="font-medium">category</h1>
        <div   className="block w-full rounded-md border-0 py-1.5  px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ">
          
          <select className="w-full " value={data.id} onChange={(e)=> handleData("id" ,e.target.value)} >
      <option value="">Select</option>
    {
   categories &&   categories.map((v :any)=>{
           return <option value={v.id}>{v.name}</option>
      })
    }
          </select>
        </div>
      
      </>
    )          



}

function SelectAuthor(){
  
  const  {authors} = useAuthors() ;
  const  {data,

    handleData,
  
  }=UseFormPostsContext()!;
    return (
      <>
      <h1 className="font-medium  text-gray-800 mx-0">Authors</h1>

        <div   className="block w-full rounded-md border-0 py-1.5  px-2 mt-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ">
          <select className="w-full " value={data.id} onChange={(e)=> handleData("id" ,e.target.value)} >
      <option value="">Select</option>
    {
   authors &&   authors.map((v :any)=>{
           return <option value={v.id}>{v.name}</option>
      })
    }
          </select>
        </div>
      
      </>
    )          



}