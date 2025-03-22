import { Box, Typography } from '@mui/material';
import './App.css';
import SquaresGrid from './SquaresGrid';
import PeoplePayouts from './WinnersTable';

interface Round {
  id: string;
  pairs: [number, number][];  // Each pair is a tuple of two numbers
  payout: number;
}

async function fetchGamesForDate(year: number, month: number, day: number) {
  const backendApiUrl = `../netlify/functions/fetchGames?year=${year}&month=${month}&day=${day}`;

  try {
    const response = await fetch(backendApiUrl);
    
    if (!response.ok) {
      throw new Error(`Error fetching data for ${year}-${month}-${day}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
    return null;
  }
}

async function fetchGamesFromMarch20() {
  const currentDate = new Date(2025, 2, 20); // March 20, 2025 (Months are 0-based)
  const allGames = [];



    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Ensure MM format
    const day = String(currentDate.getDate()).padStart(2, "0"); // Ensure DD format

    console.log(`Fetching games for ${year}-${month}-${day}...`);
    const games = await fetchGamesForDate(year, +month, +day);
    if (games) {
      allGames.push(...games);
    }

    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  

  return allGames;
}

fetchGamesFromMarch20().then(games => {
  console.log("Fetched games:", games);
});

function App() {


 


  const rounds: Round[] = [
    {
      "id": "round1",
      "pairs": [
        [89, 75], [75,63],[83,63],[69,67],[80,71],[89,68],[77,62],[79,72],[80,71],[67,57],
        [72,47],[83,53],[68,65],[82,72],[75,72],[90,81],[82,55],[78,70]
        // [13, 44], [44, 28], [13, 27], [71, 99], [62, 99], [69, 43], [20, 48], [72, 36],
        // [90, 34], [92, 73], [33, 25], [9, 44], [70, 68], [20, 3], [38, 27], [69, 83],
        // [55, 75], [7, 85], [79, 36], [55, 33], [54, 59], [47, 63], [95, 16], [85, 18]
      ],
      "payout": 0.5
    },
    {
      "id": "round2",
      "pairs": [
        //[77, 47], 
        // [30, 91], [68, 20], [79, 65], [51, 65], [41, 43], [49, 10], [55, 96], [84, 39]
      ],
      "payout": 1
    },
    {
      "id": "round3",
      "pairs": [
        //[82, 92], 
        // [49, 88], [70, 63], [58, 54], [21, 49], [44, 19], [99, 3], [68, 45]
      ],
      "payout": 2
    },
    // {
    //   "id": "round4",
    //   "pairs": [
    //     [91, 60], [42, 40], [64, 73], [26, 53]
    //   ],
    //   "payout": 3
    // },
    // {
    //   "id": "round5",
    //   "pairs": [[30, 31], [24, 74]],
    //   "payout": 10
    // },
    // {
    //   "id": "round6",
    //   "pairs": [[2, 22]],
    //   "payout": 20
    // }
  ]




  return (
  <div >
    <Typography variant="h4" fontWeight="bold" fontFamily="sans-serif" mb={2}>
      Eagle Research March Madness Squares
    </Typography>
    <Box sx={{margin: 10}}>
      <SquaresGrid rounds={rounds} />
    </Box>
    <Box sx={{margin: 10}}>
      <PeoplePayouts rounds={rounds} />
    </Box>
  </div>
  );
}

export default App;
