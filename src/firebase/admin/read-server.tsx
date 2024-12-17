import { collection, getDocs} from "firebase/firestore"
import { db } from "../firebaseAuth"

export  const getSeverAllPosts=async()=>{
       return await getDocs(collection(db,`posts`)).then(snaps => snaps.docs.map(v=>v.data()))
}

export  const getSeverAllAuthors=async()=>{
       return await getDocs(collection(db,`authors`)).then(snaps => snaps.docs.map(v=>v.data()))
}


export  const getSeverAllCategories=async()=>{
       return await getDocs(collection(db,`categories`)).then(snaps => snaps.docs.map(v=>v.data()))

}

