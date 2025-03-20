import { Box, Typography } from '@mui/material';
import './App.css';
import SquaresGrid from './SquaresGrid';
import WinnersTable from './WinnersTable';
import PeoplePayouts from './WinnersTable';
import { useState } from 'react';

interface Round {
  id: string;
  pairs: [number, number][];  // Each pair is a tuple of two numbers
  payout: number;
}

function App() {
  const rounds: Round[] = [
    {
      "id": "round1",
      "pairs": [
         //[61, 10], [61, 10], [65, 16]
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
  <div style={{}} >
    <Typography variant="h4" fontWeight="bold" fontFamily="sans-serif" mb={2}>
      Eagle Research March Madness Squares
    </Typography>
    <Box sx={{}}>
      <SquaresGrid rounds={rounds} />
    </Box>
    <Box sx={{}}>
      <PeoplePayouts rounds={rounds} />
    </Box>
  </div>
  );
}

export default App;