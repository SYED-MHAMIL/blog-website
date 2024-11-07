import AuthContextProvider from "@/context/auth.context";
import Sidebar from "./components/sidebar";


export default function AdminLayout({children}: Readonly<{
    children: React.ReactNode;
  }>){
    
     
    return(
        
       <>
       <AuthContextProvider>

      <section className="flex gap-4">
        <Sidebar/>
      {children}
      </section>


       </AuthContextProvider>
     
       </>
    )
     


}