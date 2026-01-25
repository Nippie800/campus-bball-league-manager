import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

type Standing = {
  teamId: string;
  name: string;
  played: number;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  diff: number;
  points: number;
};

export const useStandings = () => {
  const [standings, setStandings] = useState<Standing[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "games"), snapshot => {
      const games = snapshot.docs
        .map(doc => doc.data())
        .filter(g => g.status === "finished");

      const table: Record<string, Standing> = {};

      games.forEach(game => {
        const {
          homeTeamId,
          awayTeamId,
          homeScore,
          awayScore,
        } = game;

        if (!table[homeTeamId]) {
          table[homeTeamId] = {
            teamId: homeTeamId,
            name: game.homeTeamName || "Team",
            played: 0,
            wins: 0,
            losses: 0,
            pointsFor: 0,
            pointsAgainst: 0,
            diff: 0,
            points: 0,
          };
        }

        if (!table[awayTeamId]) {
          table[awayTeamId] = {
            teamId: awayTeamId,
            name: game.awayTeamName || "Team",
            played: 0,
            wins: 0,
            losses: 0,
            pointsFor: 0,
            pointsAgainst: 0,
            diff: 0,
            points: 0,
          };
        }

        const home = table[homeTeamId];
        const away = table[awayTeamId];

        home.played++;
        away.played++;

        home.pointsFor += homeScore;
        home.pointsAgainst += awayScore;

        away.pointsFor += awayScore;
        away.pointsAgainst += homeScore;

        if (homeScore > awayScore) {
          home.wins++;
          home.points += 2;
          away.losses++;
        } else {
          away.wins++;
          away.points += 2;
          home.losses++;
        }
      });

      const result = Object.values(table)
        .map(team => ({
          ...team,
          diff: team.pointsFor - team.pointsAgainst,
        }))
        .sort((a, b) => b.points - a.points || b.diff - a.diff);

      setStandings(result);
    });

    return unsub;
  }, []);

  return standings;
};
