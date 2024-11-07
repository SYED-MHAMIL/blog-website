
import { useAuthContext } from "@/context/auth.context";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton(){

    const    {handleSigninWithGoogle}  =useAuthContext()


   return(
    <>
      <button className="px-4 py-2 text-black  bg-white-500 rounded-full w-full flex items-center justify-center border-black border-2" onClick={handleSigninWithGoogle} >
        
<FcGoogle className="font-serif "/><span  className="font-semibold p-1">Login  With Google </span>

      </button> 
     
        
    
    </>
   )

}