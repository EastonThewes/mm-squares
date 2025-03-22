import { Box, Typography } from '@mui/material';
import './App.css';
import SquaresGrid from './SquaresGrid';
import PeoplePayouts from './WinnersTable';
import { useEffect, useState } from 'react';
import GamesTable from './GamesTable';


interface Game {
  awayScore: number
  homeScore: number
  awayTeam: string
  homeTeam: string
  awaySeed: number
  homeSeed: number
  round: string
  finished: string
}

async function fetchGamesFromMarch20() {
  const startDate = new Date(2025, 2, 20); // March 20, 2025 (Months are 0-based)
  const endDate = new Date(); // Current date
  const allGames: any[] = [];

  let currentDate = startDate;
  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // MM format
    const day = String(currentDate.getDate()).padStart(2, "0"); // DD format

    const url = `https://corsproxy.io/?https://ncaa-api.henrygd.me/scoreboard/basketball-men/d1/${year}/${month}/${day}/all-conf`;

    try {
      console.log(`Fetching games for ${year}-${month}-${day}...`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching data for ${year}-${month}-${day}: ${response.statusText}`);
      }

      const data = await response.json();

      // Ensure the data is iterable before adding it
      if (Array.isArray(data.games)) {
        //@ts-ignore
        data.games.forEach(game => {
          allGames.push({
            awayScore: game.game.away.score,
            homeScore: game.game.home.score,
            awayTeam: game.game.away.names.short,
            homeTeam: game.game.home.names.short,
            awaySeed: game.game.away.seed,
            homeSeed: game.game.home.seed,
            round: game.game.bracketRound,
            finished: game.game.finalMessage	
          });
        });
      } else {
        console.error("Error: games is not an array", data);
      }
      
    } catch (error) {
      console.error(`Failed to fetch games for ${year}-${month}-${day}`, error);
    }

    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }

  console.log("All fetched games:", allGames);
  return allGames;
}




// Example usage:



function App() {


  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetchGamesFromMarch20()
    .then((games) => {
      const filteredGames = games.filter((games) => games.round !== '');
      setGames(filteredGames);
    })
    .catch((error) => {
      console.error("Error fetching games:", error);
    });
  }, []);

  return (
  <div style={{}} >
    <Typography color='white' variant="h4" fontWeight="bold" fontFamily="sans-serif" mb={2}>
      Eagle Research March Madness Squares
    </Typography>
    <Box sx={{margin: 10}}>
      <SquaresGrid games={games} />
    </Box>
    <Box sx={{margin: 10}}>
      <PeoplePayouts games={games} />
    </Box>
    <Box sx={{margin: 10}}>
      <GamesTable games={games} />
    </Box>
  </div>
  );
}

export default App;
