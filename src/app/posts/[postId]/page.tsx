
import Comments from "@/app/components/header/comments";
import { getAuther } from "@/firebase/author/read-server";
import { ReadCategory } from "@/firebase/category/read-server";

import { serverIndividualPosts } from "@/firebase/posts/read-server";

import Image from "next/image";



export async function generateMetadata({params}:{params: {postId :number} }){
       
    const  {postId }=params;
    const  data = await serverIndividualPosts(postId);
    return {
      title: data?.title,
      openGraph: {
        images: [data?.imageURL],
      },
    }
  }


export default async function PostsData({params}:{params: {postId :number} }){
       
    const  {postId }=params;

    const  data = await serverIndividualPosts(postId)
         
 
return(
    <>
        <main  className="flex justify-center">

        <section className="flex flex-col px-4 py-10 gap-5 max-w-full sm:px-6 md:px-10 lg:px-16 lg:max-w-[800px]">

        <CategoryCard  id={data?.categoryID}/>
          <h1 className="text-2xl font-bold">{data?.title}</h1>
          <Image src={data?.imageURL}  alt="" height={ 600} width={600} className="w-full"/>
         <div dangerouslySetInnerHTML={{__html : data?.content}}></div>
            </section>
        </main>

        <Comments id={postId}/>
    </>
)
}


// coponenets
const CategoryCard=async({id} : {id:number})=>{
   const data = await ReadCategory(id);

   return <div className="flex">

       <div className="flex border border-gray-300 items-center gap-1 bg-white font-medium px-2 rounded-full  py-1">
        <Image
            src={data?.iconURL}
            height={50}
            width={50}
            alt="404"
            className="rounded-full object-cover h-6 w-6"
            />
    
    
            
           <p className="text-black">{data?.name}</p>
        
       </div>  
       

   </div> 
   
      



}