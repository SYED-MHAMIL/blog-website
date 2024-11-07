"use client";
import {
  collection,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseAuth";
import { useEffect, useState } from "react";

export function useAuthors() {
  const [authors, setAuthors] = useState<DocumentData[]>([]);

  type TimeStampTime = {
    seconds: number;
    nanoseconds: number;
  };

  type authorsType = {
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
    const collectionRef = collection(db, "authors");
    const unsub = onSnapshot(
      collectionRef,
      async (querySnapshot) => {
        const authorsData: authorsType[] = querySnapshot.docs.map(
          (doc) => ({
            ...(doc.data() as authorsType),
            docId: doc.id,
          })
        );

        const data = await Promise.all(authorsData);

        setAuthors(data);
        console.log("Current authors:", data);
        console.log(authors);
      },
      (error) => {
        console.error("Error fetching documents: ", error);
      }
    );

    return () => unsub();
  };

  return {
    authors,
    isloading: authors === undefined ? true : false,
  };
}
