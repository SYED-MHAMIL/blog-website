
import { getAllPost } from "@/firebase/posts/read-server"
import { getAuther } from "@/firebase/author/read-server"
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants, Empty, EmptyImage, EmptyTitle } from 'keep-react'
import {  ReadCategory } from "@/firebase/category/read-server"
import Loading from "./loading"
// type Timestamp = {
//   seconds: number;
//   nanoseconds: number;
// };

// type postType={
//   // categoryID: string,
//   // slug: string,
//   // imageURL: string,
//   // uid: string,
//   // timeStamp: Timestamp ,
//   // title: string,
//   // authorID: string,
//   // id: number,
//   // content: 

//   slug: string;
//   authorID: string;
//   title: string;
//   uid: string;
//   content: string;
//   id: number;
//   timeStamp: {
//     seconds: number;
//     nanoseconds: number;
//   };
//   categoryID: string;
//   imageURL: string;
// }

// npm 

// type totolPost={
//        item :postType[];
//       //  loading : boolean
// }

export default async function AllPosts(){
    
    const data = await getAllPost()!;
    console.log("data=>>>>>>", data);
    
    const isLoading = data === undefined ? true : false
    return(
        <>
{data.length >  0  && <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-8 px-4 text-center">
  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
    Welcome to My Blog
  </h1>
  <p className="text-lg sm:text-xl font-medium max-w-2xl mx-auto">
    Discover insightful articles, tutorials, and stories to inspire your journey.
  </p>
</div>}

    { isLoading ?   <div>loading</div>  : <div className="flex  mt-10 mb-24 justify-center gap-9  flex-wrap">

 {
   data.length >  0  ?  data.map((item ,i)=>(
         
        <PostCards  item={item} loading={isLoading} key={item.id +i}/>

   
        
    )) :  
    
    <div className="flex justify-center items-center">
    <Empty>
    <EmptyImage>
      <Image
        src="https://staticmania.cdn.prismic.io/staticmania/a8befbc0-90ae-4835-bf37-8cd1096f450f_Property+1%3DSearch_+Property+2%3DSm.svg"
        height={234}
        width={350}
        alt="404"
        />
    </EmptyImage>
    <EmptyTitle className="mb-[14px] mt-5">Sorry, No result found!</EmptyTitle>
    <Link href="/" className={buttonVariants({ color: 'primary' })}>
      Go to home
    </Link>
  </Empty>

    </div>
 }
   </div>
}
    
    </>
   )
   
   
}


export const  PostCards=({item ,loading}:any)=>{
             console.log("all post item=>",item , "loading",loading);
             
    return  <div key={item.id} className=" max-w-sm object-cover hover:scale-95 transition-all mb-2 mx-2 bg-white border border-gray-200 rounded-lg shadow ">
<a href="#" className="relative">
   
   <div className="absolute text-white right-5 hover:translate-x-2 transition-transform top-3">

       <CategoryCard id={item?.categoryID}/>
   </div>
     

   {/* <img className="rounded-t-lg w-full " src={item?.imageURL} alt="" />   */}
   <Image className="rounded-t-lg w-full " src={item?.imageURL} alt="" height={200} width={200} />  
   
</a>
<div className="p-5">
   <a href="#">
       <h5 className="mb-2 text-2xl font-bold tracking-tight">{item?.title?.slice(0,67)+"..."}</h5>
   </a>
   {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
*/}

<div className="">

   <AthorCard id={item?.authorID} date={item?.timeStamp?.toDate()?.toLocaleDateString()} />
     
</div>



  <Link href={`/posts/${item?.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3">
 
   {   loading ?   <Loading />    : 'Read more'}
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
       </svg>

  </Link>
</div>
</div>
}


const AthorCard =async({id,date}:{id:number,date:string})=>{
    
    const authorData =await getAuther(id) ;
    
 return   <div className="flex items-center gap-1 m-1">
        <Image alt=""  src={authorData?.photoURL} height={60}  width={50} className="rounded-full h-12 object-cover "/>

        <div>
        <h3 className="p-0 m-0 font-medium">{authorData?.name}</h3>
     <p  className="p-0 m-0 text-sm text-gray-400">Published :{date}</p>
        </div>
   
    </div>

}

const CategoryCard=async({id} : {id:number})=>{
    const catData = await ReadCategory(id);

   return   <div className="flex items-center gap-1 bg-slate-50 px-2 rounded-full bg-opacity-50 py-1">
    <Image
        src={catData?.iconURL}
        height={50}
        width={50}
        alt="404"
        className="rounded-full object-cover h-6 w-6"
        />


        
       <p className="text-black">{catData?.name}</p>
    
   </div>  
   



}