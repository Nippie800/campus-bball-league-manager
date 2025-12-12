import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function addTestDoc() {
  await addDoc(collection(db, "tests"), {
    message: "Hello from Dev B",
    createdAt: serverTimestamp(),
  });
}

export async function listTestDocs() {
  const snap = await getDocs(collection(db, "tests"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
