import { individualCategory } from "@/firebase/category/read-server";

import { CategoryCard,AthorCard } from "@/app/components/header/allposts";
import Loading from "@/app/components/header/loading";
import Link from "next/link";
import Image from "next/image";

export default async function SelectedCategory({
  params,
}: {
  params: { categoriesId: number };
}) {
  const data = await individualCategory(params.categoriesId);
  const isLoading = data === undefined ? true : false;
  return (
    <>
      <div className="flex mt-28 justify-center gap-8 flex-wrap">
        {data.length > 0 &&
          data.map((item) => {
            return         <div
            key={item.id}
            className=" max-w-sm object-cover hover:scale-95 transition-all mb-2 mx-2 bg-white border border-gray-200 rounded-lg shadow "
          >
            <a href="#" className="relative">
              <div className="absolute text-white right-5 hover:translate-x-2 transition-transform top-3">
                <CategoryCard id={item?.categoryID} />
              </div>
      
              {/* <img className="rounded-t-lg w-full " src={item?.imageURL} alt="" />   */}
              <Image
                className="rounded-t-lg w-full "
                src={item?.imageURL}
                alt=""
                height={200}
                width={200}
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight">
                  {item?.title?.slice(0, 67) + "..."}
                </h5>
              </a>
              {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
               */}
      
              <div className="">
                <AthorCard
                  id={item?.authorID}
                  date={item?.timeStamp?.toDate()?.toLocaleDateString()}
                />
              </div>
      
              <Link
                href={`/posts/${item?.id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
              >
                {isLoading ? <Loading /> : "Read more"}
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
          })}
      </div>
    </>
  );
}
