import './App.css';
import Grid from './Grid';

interface Round {
  id: string;
  pairs: [number, number][];  // Each pair is a tuple of two numbers
  payout: number;
}

function App() {
  const rounds: Round[] = [
    {
      id: "round1",
      pairs: [
        [83, 67], [75, 72], [91, 88], [60, 64], [74, 69], [92, 74],
      ],
      payout: 0.5,
    },
    {
      id: "round2",
      pairs: [
        [89, 65], [82, 78], [90, 84], [76, 79], [67, 72], [92, 77],
      ],
      payout: 1,
    },
    {
      id: "round3",
      pairs: [
        [91, 85], [70, 65], [80, 75], [82, 79], [87, 90], [93, 88],
      ],
      payout: 2,
    },
    // Add more rounds as needed
  ];

  return (
    <>
      <div>
        <h1>Eagle Research March Madness</h1>
        <Grid rounds={rounds} />
      </div>
    </>
  );
}

export default App;
