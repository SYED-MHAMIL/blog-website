"use client";
import AuthContextProvider, { useAuthContext } from "@/context/auth.context";
import Sidebar from "./components/sidebar";
import { useAdmin } from "@/firebase/admin/read";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return<AuthContextProvider>
  <InnerLayout>
     {children}
  </InnerLayout >
  </AuthContextProvider>

}

function InnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoading: authIsLoading } = useAuthContext();
  const {admin ,isloading }= user ? useAdmin({ uid: user.uid }) : { admin: null,};
  
  console.log(admin);
  console.log(user?.uid);
  
  

  if ( authIsLoading || isloading) {
    return <h1>loading ...</h1>;
  }

  if (!admin || admin === undefined || null) {
 
    return   <div className="text-center mt-16 font-bold text-2xl">Sorry Your are not admin!</div>;
    
  }

  return (
    <>
      
        <section className="flex gap-4">
          <Sidebar />
          {children}
        </section>
     
    </>
  );
}
