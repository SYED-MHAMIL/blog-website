import { getFirestore } from "firebase/firestore";
import { app } from "./firebaseConfig";



import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";


export const auth = getAuth(app);
export const  db=getFirestore(app);

export const storage = getStorage(app)  