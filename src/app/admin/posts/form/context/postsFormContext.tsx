"use client";

import { createContext, useContext, useState } from "react";
import { postsWrite, UpdatePosts } from "@/firebase/posts/write";

type FormContextType = {
  data: { [key: string]: string };
  error: string | null;
  image: File | null;
  isLoading: boolean;
  isDone: boolean;
  setImage: (image: File) => void;
  handleData: (key: string, value: string) => void;
  createHandler: () => void;
  updateData: () => void;
  setData: (data: { [key: string]: string }) => void;
};

const CreatePostsFormContext = createContext<FormContextType | null>(null);

export default function PostsFormProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [data, setData] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  const handleData = (key: string, value: string) => {
    setData({ ...data, [key]: value });
  };

  const updateData = async () => {
    setError(null);
    setIsLoading(true);
    setIsDone(true);
    try {
      await UpdatePosts({ data, image });

      /// last
      setIsDone(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    }

    setIsLoading(false);
  };

  const createHandler = async () => {
    setError(null);
    setIsLoading(true);
    setIsDone(true);
    try {
      await postsWrite({ data, image });

      /// last
      setIsDone(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    }

    setIsLoading(false);
  };

  return (
    <CreatePostsFormContext.Provider
      value={{
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
      }}
    >
      {children}
    </CreatePostsFormContext.Provider>
  );
}

export const UseFormPostsContext = () => useContext(CreatePostsFormContext);
