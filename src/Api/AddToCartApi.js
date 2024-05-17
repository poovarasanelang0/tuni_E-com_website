
import {
    getFirestore,
    collection,
    getDocs,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
  import {firestore} from "../firebaseConfig"


export const CollectionApi=collection(firestore, "addtocart");
// export const SubcollectionApi =collection(doc.ref, "products");