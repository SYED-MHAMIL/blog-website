
import AuthorsFormProvider from "./context/authFormContext";




export default function FormLayout({children}: Readonly<{
    children: React.ReactNode;
  }>){

     
    
return (<AuthorsFormProvider>
{children}
</AuthorsFormProvider>)

   


  }