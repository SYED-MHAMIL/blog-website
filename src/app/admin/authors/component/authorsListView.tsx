"use client";

import { db } from "@/firebase/firebaseAuth";


import Image from "next/image";
import Link from "next/link";
import { useAuthors } from "@/firebase/author/read";
import { deleteDoc, doc } from "firebase/firestore";

export default function AuthorsListComponent() {
 
  const { authors, isloading } = useAuthors();

  console.log(authors);

  if (isloading) {
    return <h1>Loading ...</h1>;
  }

  if (!authors) {
    return <h1>Data not found!</h1>;
  }

  return (
    <>
      {authors.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-black uppercase   ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sr.
                </th>
                <th scope="col" className="px-6 py-3">
                  Icon
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {authors?.map((item, i) => (
                <tr key={i} className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {i + 1}
                  </th>

                  <td className="px-6 py-4">
                    <Image
                      src={item.photoURL}
                      width={80}
                      height={80}
                      alt="Picture of the author"
                    />
                  </td>
                  <td className="px-6 py-4">{item.name}</td>

                  <td className="px-6 py-4">{item.email}</td>

                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/authors/form?id=${item?.id}&slug=${item.slug}`}
                    >
                      <button className="bg-blue-500 text-white  px-3 py-1 text-sm rounded-full hover:bg-blue-600 mr-1">
                        Edit
                      </button>
                    </Link>

                    <button
                      className="bg-red-500 text-white  px-3 py-1 text-sm rounded-full hover:bg-red-600"
                      onClick={() => {
                        deleteDoc(doc(db, `authors/${item.id}`));
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-3xl text-center">Dont Yet Data ....</h1>
      )}
    </>
  );
}
