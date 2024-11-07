import { House, List, UserPen } from "lucide-react";
import Link from "next/link";
import LoginButton from "./loginButton";
import AuthContextProvider, { useAuthContext } from "@/context/auth.context";

   


export default function Header(){
      


return <nav className="px-7 py-7 border-b flex items-center justify-between bg-white">

    <h1 className="font-mono font-bold text-3xl text-black ">mhamil.io</h1>
        <ul className="flex gap-6 font-bold text-black">
        
            <li className="flex items-center gap-1"><House />Home</li>
            <li className="flex items-center gap-1"><List />Blogs</li>
            <li className="flex items-center gap-1"><UserPen />Contacts Us</li>
        </ul>

    <AuthContextProvider>
        <LoginButton/>
        </AuthContextProvider>
</nav>


}