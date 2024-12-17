"use client";

import { useSearchParams } from "next/navigation";
import { UseFormAuthorsContext } from "./context/authFormContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseAuth";
import { useEffect } from "react";
import Image from 'next/image'


export default function Form() {
  const {
    data,
    error,
    handleData,
    createHandler,
    isLoading,
    isDone,
    image,
    setImage,
    setData,
    updateData,
  } = UseFormAuthorsContext()!;

  // update works   ===============================================

  const AuthGetId = useSearchParams();
  const updateId = AuthGetId.get("id");
  // const updateSlug = AuthGetId.get("slug");

  useEffect(() => {
    if (updateId) {
      fetch();
    }
  }, [updateId]);

  const fetch = async () => {
    try {
      const docRef = doc(db, `authors/${updateId}`);
      const data = await getDoc(docRef);
      console.log(data);
      setData(data.data()!);
   
    } catch (error) {
      console.log(error);
    }
  };

  // update works   ===============================================

  return (
    <>
      <main className="w-full p-6">
        <div className="flex gap-4 items-center m-2">
          <h1 className="font-bold">Author | Form</h1>
          {updateId ? (
            <button className="bg-green-400 text-white font-bold  px-3 py-1 rounded-full hover:bg-green-600">
              Update
            </button>
          ) : (
            <button className="bg-blue-400 text-white font-bold  px-3 py-1 rounded-full hover:bg-blue-600">
              Create
            </button>
          )}
        </div>

        <div className="flex ">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (updateId) {
                updateData();
              } else {
                createHandler();
                setData({});
              }
            }}
            className="space-y-3 w-1/4 bg-blue-50 p-7 rounded-xl"
          >
            <div className="flex flex-col">
              <label
                htmlFor="Author"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Author Name
              </label>
              <div>
                <input
                  id="Author"
                  placeholder="Enter Author name"
                  type="text"
                  required
                  onChange={(e) => {
                    handleData("name", e.target.value);
                  }}
                  value={data?.name}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="Slug"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Author Email
              </label>
              <div>
                <input
                  id="Slug"
                  placeholder="Enter Author Email"
                  onChange={(e) => {
                    handleData("email", e.target.value);
                  }}
                  value={data?.email}
                  type="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5  px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  "
                />
              </div>
            </div>

            {!image && data?.photoURL && (
              <div>
                <Image src={data?.photoURL} alt="authomage" height={100} width={100}></Image>
                {/* <img src={data?.photoURL} alt="cokds" className="h-40" /> */}
              </div>
            )}
            {image && (
              <div>
                <Image  src={URL.createObjectURL(image)} alt="authomage" height={100} width={100}></Image>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image
                </label>
              </div>
              <div>
                <input
                  id="password"
                  onChange={(e) => {
                    const imageRef = e.target.files;
                    if (imageRef?.length) {
                      setImage(imageRef[0]);
                    }
                  }}
                  type="file"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5  px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                />
              </div>
            </div>

            {error && <p className="text-red-600 ">{error}</p>}

            <div>
              <button
                type="submit"
                disabled={isLoading || isDone}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? "loading..." : !updateId ? "Create" : "update"}
              </button>

              {!error && isDone && (
                <p className="text-center text-md text-green-600 font-bold mt-3">
                  Successfully Create !
                </p>
              )}
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
