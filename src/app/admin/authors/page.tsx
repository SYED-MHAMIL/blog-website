"use client"
import { CirclePlus } from "lucide-react";
import Link from "next/link";

import AuthorsListComponent from "./component/authorsListView";




export default function Author(){




     return(

        <>
        <main className="p-6 w-full">
         
        <div className=" flex justify-between items-center">
        <h1 className="font-bold text-xl">Authors</h1>
        
        <Link href={"/admin/authors/form"}>
        <button className=" bg-blue-500 flex items-center gap-2  px-4 py-2 rounded-full hover:bg-blue-600 text-white font-bold ">
        <CirclePlus />
         Add
        </button>
        
        </Link>


       
        
        </div>
<AuthorsListComponent/>
        </main>


   
      
     
        </>
     )


}