import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const createUserProfile = async (uid: string, email: string) => {
  await setDoc(doc(db, "user", uid), {
    uid,
    email,
    role: "player",
    schoolId: "sandton-campus",
    teamId: null,
    createdAt: serverTimestamp(),
  });
};
