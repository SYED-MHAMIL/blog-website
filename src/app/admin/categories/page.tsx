"use client";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

import CategoryListComponent from "./component/categoryListView";

export default function Category() {
  return (
    <>
      <main className="p-6 w-full">
        <div className=" flex justify-between items-center">
          <h1 className="font-bold text-xl">Category</h1>

          <Link href={"/admin/categories/form"}>
            <button className=" bg-blue-500 flex items-center gap-2  px-4 py-2 rounded-full hover:bg-blue-600 text-white font-bold ">
              <CirclePlus />
              Add
            </button>
          </Link>
        </div>
        <CategoryListComponent />
      </main>
    </>
  );
}
