import { getSeverAllAuthors, getSeverAllCategories, getSeverAllPosts } from "@/firebase/admin/read-server"
import { BiSolidContact } from "react-icons/bi"
import { BsFileEarmarkPost } from "react-icons/bs"
import { FaClipboardList } from "react-icons/fa"


export default async function Admin(){
 const  posts =await getSeverAllPosts()
 const  categories =await getSeverAllCategories()
 const  authors =await getSeverAllAuthors()






  return <main className="w-full">
     
 <div className="flex  mt-5  gap-16 w-full">




     <div className="bg-green-50 py-2 px-3 rounded-lg">
     <BsFileEarmarkPost fontSize="5.3em"/>
      <h1 className="font-bold text-center ">posts {posts.length > 0 ? posts.length :  "0"}</h1>
     </div>
    
     <div className="bg-green-50 py-2 px-3 rounded-lg">
     <BiSolidContact fontSize={"5.3em"}/>

      <h1 className="font-bold text-center ">Authors {authors.length > 0 ? authors.length :  "0"}</h1>
     </div>

     <div className="bg-green-50 py-2 px-3 rounded-lg">
     <FaClipboardList fontSize="5.3em"/>
     

      <h1 className="font-bold text-center ">Category {categories.length > 0 ? categories.length :  "0"}</h1>
     </div>
 </div>


  </main>

}