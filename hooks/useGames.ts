import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

export function useGames() {
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "games"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setGames(list);
    });

    return unsub;
  }, []);

  return games;
}
