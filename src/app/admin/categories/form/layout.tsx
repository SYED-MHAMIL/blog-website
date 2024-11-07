
import CatFormProvider from "./context/cateFormContext";




export default function FormLayout({children}: Readonly<{
    children: React.ReactNode;
  }>){

     
    
return (<CatFormProvider>
{children}
</CatFormProvider>)

   


  }