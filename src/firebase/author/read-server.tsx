import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebaseAuth"


export const  getAuther  =async(id :any)=>{
        return await getDoc(doc(db,`authors/${id}`)).then(snaps => snaps.data())
}
