import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export async function signup(
  email: string,
  password: string
) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function login(
  email: string,
  password: string
) {
  return signInWithEmailAndPassword(auth, email, password);
}

// 👇 ADD THIS
export async function createUserProfile(
  uid: string,
  data: {
    name: string;
    role: "admin" | "coach" | "player";
    school: string;
  }
) {
  await setDoc(doc(db, "users", uid), {
    ...data,
    createdAt: new Date()
  });
}


