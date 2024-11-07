"use client";
import {
  collection,
  
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseAuth";
import { useEffect, useState } from "react";

export function useCategories() {
  const [categories, setCategories] = useState<DocumentData[]>([]);

  type TimeStampTime = {
    seconds: number;
    nanoseconds: number;
  };

  type categoriesType = {
    iconURL: string;
    name: string;
    slug: string;
    uid: string;
    id: string;
    timeStamp: TimeStampTime;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const collectionRef = collection(db, "categories");
    const unsub = onSnapshot(
      collectionRef,
      async (querySnapshot) => {
        const categoryData: categoriesType[] = querySnapshot.docs.map(
          (doc) => ({
            ...(doc.data() as categoriesType),
            docId: doc.id,
          })
        );

        const data = await Promise.all(categoryData);

        setCategories(data);
        console.log("Current categories:", data);
        console.log(categories);
      },
      (error) => {
        console.error("Error fetching documents: ", error);
      }
    );

    return () => unsub();
  };

  return {
    categories,
    isloading: categories === undefined ? true : false,
  };
}
