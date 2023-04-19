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

const questionCollectionName = "questions2";
const participantCollectionName = "participantes";

export const sendQuestionsToFirestore = (question) =>
  addDoc(collection(db, questionCollectionName), question);

export const getQuestions = (creatorName) => {
  let q = query(collection(db, questionCollectionName));
  if (creatorName) {
    q = query(q, where("user", "==", creatorName));
  }
  return getDocs(q);
}

export const sendParticipantToFirestore = (participant) =>
  addDoc(collection(db, participantCollectionName), participant);

export const getParticipants = (creatorName) => {
  let q = query(collection(db, participantCollectionName));
  if (creatorName) {
    q = query(q, where("creator", "==", creatorName));
  }
  return getDocs(q);
}