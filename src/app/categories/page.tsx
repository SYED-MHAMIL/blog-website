import { allCategory } from "@/firebase/category/read-server";
import React from "react";
import Image from "next/image";

import Link from "next/link";
import { buttonVariants, Empty, EmptyImage, EmptyTitle } from "keep-react";
export default async function CategoriesSelection() {
  const categories = await allCategory();

  return (
    <>
      {categories.length > 0 && (
        <div className="text-center mt-8">
          <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl">
            Select{" "}
            <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
              Category
            </mark>{" "}
          </h1>
        </div>
      )}

      <div className="flex gap-12 flex-wrap justify-center mt-32 mx-12 items-center">
        {categories.length > 0 ? (
          categories.map((v) => {
            return (
              <Link  key={v.id} href={`categories/${v.id}`}>
                <Image
                  src={v?.iconURL}
                  alt=""
                  height={170}
                  width={150}
                  className="rounded-full object-cover 
               h-36 w-36 
               sm:h-32 sm:w-32 
               xs:h-28 xs:w-28 
               mx-auto"
                />
                <h1 className="text-center font-bold text-2xl">{v.name} </h1>
              </Link>
            );
          })
        ) : (
          <div className="flex justify-center items-center">
            <Empty>
              <EmptyImage>
                <Image
                  src="https://staticmania.cdn.prismic.io/staticmania/a8befbc0-90ae-4835-bf37-8cd1096f450f_Property+1%3DSearch_+Property+2%3DSm.svg"
                  height={234}
                  width={350}
                  alt="404"
                />
              </EmptyImage>
              <EmptyTitle className="mb-[14px] mt-5">
                Sorry, No result found!
              </EmptyTitle>
              {/* <EmptyDescription className="mb-8">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.
        </EmptyDescription> */}
              <Link href="/" className={buttonVariants({ color: "primary" })}>
                Go to home
              </Link>
            </Empty>
          </div>
        )}
      </div>
    </>
  );
}
