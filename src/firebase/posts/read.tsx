"use client";
import {
  collection,
  
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseAuth";
import { useEffect, useState } from "react";

export function usePosts() {
  const [posts, setPosts] = useState<DocumentData[]>([]);

  type TimeStampTime = {
    seconds: number;
    nanoseconds: number;
  };

  type postsType = {
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
    const collectionRef = collection(db, "posts");
    const unsub = onSnapshot(
      collectionRef,
      async (querySnapshot) => {
        const postsData: postsType[] = querySnapshot.docs.map(
          (doc) => ({
            ...(doc.data() as postsType),
            docId: doc.id,
          })
        );

        const data = await Promise.all(postsData);

        setPosts(data);
        console.log("Current posts:", data);
        console.log(posts);
      },
      (error) => {
        console.error("Error fetching documents: ", error);
      }
    );

    return () => unsub();
  };

  return {
    posts,
    isloading: posts === undefined ? true : false,
  };
}
