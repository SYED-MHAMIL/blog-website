"use client"
import { auth } from "@/firebase/firebaseAuth";
import { onAuthStateChanged, signInWithPopup, signOut, User ,GoogleAuthProvider} from "firebase/auth";
import { useRouter } from "next/navigation";

import { createContext, useContext, useEffect, useState } from "react";

export type AuthContextType= {
    user: User | null;
    isLoading: boolean;
    error: Error | null;
    handleLogout: () => Promise<void>;
    handleSigninWithGoogle: () => Promise<void>;
  }
  
   const CreateContextAuth=createContext<AuthContextType >({ user: null,
    isLoading: false,
    error: null,
    handleLogout: async () => {},
    handleSigninWithGoogle: async () => {},})
 
export  const  useAuthContext =()=> useContext(CreateContextAuth);


export default function AuthContextProvider({children}: Readonly<{
    children: React.ReactNode;
  }>){
  
      const [user,setUser] = useState<User | null>(null)
      const [isLoading,setIsLoading] = useState(true)
      const [error,setError] = useState<Error | null>(null);
        const  route =useRouter()
      
        useEffect(()=>{
                
            setIsLoading(true);
          const unsub =   onAuthStateChanged(auth ,(user)=>{
               
                if(user){
                  setUser(user)
                }else{
                          setUser(null)
                        }
                        setIsLoading(false);
                
            }) ;

              return()=>unsub ();     

        },[]);


        const handleLogout =async()=>{
            await signOut(auth)
        }
                   

        const handleSigninWithGoogle  = async()=>{
               setIsLoading(true)

            try {
                await signInWithPopup(auth, new GoogleAuthProvider())
                          route.push("/dashboard")
            } catch (error) {
                 setError(error as Error)   
            }
            setIsLoading(false)
        }
        
    

    return (
  

        <CreateContextAuth.Provider value={{user,isLoading,error,handleLogout,handleSigninWithGoogle}}>

            {children}
               
        </CreateContextAuth.Provider>

    )



}