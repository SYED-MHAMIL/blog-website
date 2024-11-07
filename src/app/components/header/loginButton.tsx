"use client"
import { useAuthContext } from "@/context/auth.context";
import Link from "next/link";





export default  function LoginButton(){
   const {handleSigninWithGoogle,isLoading,handleLogout,user}= useAuthContext()


   
   if(user){
    
      return    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
    >
      Logout
    </button>


   }else{

       return <button className="px-4 py-2 text-white  bg-blue-500 rounded-full hover:bg-blue-700" >
       <Link href="/login">Login</Link>
      </button>  

   }


   return(
    <>
        {/* <button
        className="w-full flex justify-center py-2 px-4 border text-sm font-medium border-transparent rounded-md items-center g-4 text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        type="submit" onClick={()=>handleSigninWithGoogle()}
      >
         <FcGoogle />Login with Google
      </button> */}
    </>
   )

}