import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from './firebase';


const collectionName = "questions2";
export const sendQuestionsToFirestore = (question) =>
  addDoc(collection(db, collectionName), question);

  export const getQuestions = (creatorName) => {
    let q = query(collection(db, collectionName));
    if (creatorName) {
      q = query(q, where("user", "==", creatorName));
    }
    else q = "no query found"
    return getDocs(q);
  }