import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc
} from "firebase/firestore";
import { db } from "../firebaseConfig";

/* Create fixture */
export const createGame = async (
  homeTeamId: string,
  awayTeamId: string,
  date: Date,
  location: string
) => {
  await addDoc(collection(db, "games"), {
    homeTeamId,
    awayTeamId,
    date,
    location,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    createdAt: serverTimestamp(),
  });
};

/* Subscribe to fixtures */
export const subscribeToGames = (callback: (games: any[]) => void) => {
  const q = query(collection(db, "games"), orderBy("date"));

  return onSnapshot(q, snapshot => {
    callback(
      snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  });
};

/* Update result */
export const updateGameResult = async (
  gameId: string,
  homeScore: number,
  awayScore: number
) => {
  await updateDoc(doc(db, "games", gameId), {
    homeScore,
    awayScore,
    status: "finished",
  });
};
