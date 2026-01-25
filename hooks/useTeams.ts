import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

export type Team = {
  id: string;
  name: string;
  division: string;
  coach: string;
};

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "teams"), (snapshot) => {
      const data: Team[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Team, "id">),
      }));

      setTeams(data);
    });

    return unsub;
  }, []);

  return teams;
};
