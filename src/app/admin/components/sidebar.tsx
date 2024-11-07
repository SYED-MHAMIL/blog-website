import Link from "next/link";
import { BiCategoryAlt } from "react-icons/bi";
import { BsFilePost } from "react-icons/bs";
import { FaUserCheck } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";


export default function Sidebar(){

  const link =[
    {
        name : "Dashboard",
        link: "/admin",
        icon : <LuLayoutDashboard /> 
    },{
        name : "Posts",
        link: "/admin/posts",
        icon : <BsFilePost />
    },{
      name : "Categories",
      link: "/admin/categories",
      icon : <BiCategoryAlt className=""/>
  },
  {
    name : "Authors",
    link: "/admin/authors",
    icon : <FaUserCheck />
}

  ];

     
     
     
     return <section className="w-[300px] border-r h-screen p-6">
      <ul className="w-full flex flex-col gap-7  font-bold text-xl">
    
    {
      link.map((item)=>{
         return <Link href={item.link}>
          <li className="flex gap-3 items-center bg-blue-50 px-4 py-2 rounded-full">
          {item.icon}
          <span>{item.name}</span>
          
         </li>
          
          </Link>

      })
    }


      </ul>
     </section>


}