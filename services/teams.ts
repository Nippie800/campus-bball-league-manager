import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

/* =========================
   Create a Team
========================= */
export const createTeam = async (
  teamName: string,
  schoolId: string,
  userId: string
) => {
  const teamRef = await addDoc(collection(db, "teams"), {
    name: teamName,
    schoolId,
    createdBy: userId,
    members: [userId],
    createdAt: serverTimestamp(),
  });

  // Optional but useful: track user's team
  await updateDoc(doc(db, "users", userId), {
    teamId: teamRef.id,
  });

  return teamRef.id;
};

/* =========================
   Subscribe to User Teams
========================= */
export const subscribeToTeams = (
  userId: string,
  callback: (teams: any[]) => void
) => {
  const q = query(
    collection(db, "teams"),
    where("members", "array-contains", userId)
  );

  return onSnapshot(q, (snapshot) => {
    const teams = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(teams);
  });
};
