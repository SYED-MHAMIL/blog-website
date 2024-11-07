
import PostsFormProvider from "./context/postsFormContext";




export default function FormLayout({children}: Readonly<{
    children: React.ReactNode;
  }>){

     
    
return (<PostsFormProvider>
{children}
</PostsFormProvider>)

   


  }