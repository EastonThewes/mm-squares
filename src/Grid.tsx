import { useState, useEffect } from "react";
import "./index.css";

const names: string[] = [
  "Kisscha", "Kisscha", "", "", "Dakota", "Dakota", "", "", "Brandon", "Brandon",
  "Kisscha", "Kisscha", "Mike B.", "", "Dakota", "Dakota", "", "", "Brandon", "Brandon",
  "", "Mike K.", "Scott H.", "Scott H.","Mike B.", "Mike K.", "Mike B.", "Mike B.", "", "", 
  "Mike B.", "Mike K.", "Scott H.", "Scott H.", "", "Mike B.", "", "Dakota", "", "",
  "Easton", "Easton", "", "Mike B.", "Dakota", "Mike K.", "", "", "Mike B.", "",
  "Easton", "Easton", "", "", "Mike K.", "Mike K.", "Mike K.", "", "", "Dakota",
  "", "Dakota", "", "", "", "Mike K.", "Easton", "Easton", "", "Mike B.",
  "", "Mike K.", "", "", "", "Mike B.", "Easton", "Easton", "", "",
  "Brandon", "Brandon", "Dakota", "", "", "Dakota", "", "", "Kisscha", "Kisscha",
  "Brandon", "Brandon", "", "", "", "", "Mike K.", "", "Kisscha", "Kisscha",
];

const getRandomizedNumbers = (): number[] => {
  return [...Array(10).keys()].sort(() => Math.random() - 0.5);
};

interface GridProps {
  id: string;
  pairs: [number, number][];
  payout: number;
}

interface Rounds {
  rounds: GridProps[];
}

const Grid: React.FC<Rounds> = ({ rounds }) => {
    const [xAxis, setXAxis] = useState<number[]>([]);
    const [yAxis, setYAxis] = useState<number[]>([]);
    const [gridData, setGridData] = useState<string[][]>([]);
    const [cellFrequency, setCellFrequency] = useState<number[][]>([]);
  
    useEffect(() => {
      setXAxis([0,1,2,3,4,5,6,7,8,9]);
      setYAxis([0,1,2,3,4,5,6,7,8,9]);
  
      const newGrid: string[][] = [];
      let nameIndex = 0;
  
      for (let i = 0; i < 10; i++) {
        const row: string[] = [];
        for (let j = 0; j < 10; j++) {
          row.push(names[nameIndex] || ``);
          nameIndex++;
        }
        newGrid.push(row);
      }
  
      setGridData(newGrid);
  
      const initialFrequency = Array.from({ length: 10 }, () => Array(10).fill(0));
      setCellFrequency(initialFrequency);
    }, []);
  
    useEffect(() => {
      const newFrequency = Array.from({ length: 10 }, () => Array(10).fill(0));
      rounds.forEach((round) => {
        round.pairs.forEach(([num1, num2]) => {
          const winner = Math.max(num1, num2);
          const loser = Math.min(num1, num2);
  
          const columnIndex = xAxis.indexOf(winner % 10);
          const rowIndex = yAxis.indexOf(loser % 10);
  
          if (rowIndex >= 0 && columnIndex >= 0) {
            newFrequency[rowIndex][columnIndex]++;
          }
        });
      });
  
      setCellFrequency(newFrequency);
    }, [rounds, xAxis, yAxis]);
  
    const getRoundWinners = (round: GridProps, roundNumber: number) => {
      const winners: Record<string, number> = {};
      const matchResults: { round: number; score: string; winner: string }[] = [];
  
      round.pairs.forEach(([num1, num2]) => {
        const winner = Math.max(num1, num2);
        const loser = Math.min(num1, num2);
        const columnIndex = xAxis.indexOf(winner % 10);
        const rowIndex = yAxis.indexOf(loser % 10);
  
        if (rowIndex >= 0 && columnIndex >= 0) {
          const name = gridData[rowIndex]?.[columnIndex] || "Unknown";
          if (name !== "Unknown") {
            winners[name] = (winners[name] || 0) + 1;
          }
          matchResults.push({
            round: roundNumber,
            score: `${winner} - ${loser}`,
            winner: name,
          });
        }
      });
  
      return { winners, matchResults };
    };
  
    // Store total winnings and match results
    const totalPayouts: Record<string, number> = {};
    const allMatchResults: { round: number; score: string; winner: string }[] = [];
  
    rounds.forEach((round, index) => {
      const { winners, matchResults } = getRoundWinners(round, index + 1);
      Object.entries(winners).forEach(([name, count]) => {
        totalPayouts[name] = (totalPayouts[name] || 0) + count * round.payout;
      });
  
      allMatchResults.push(...matchResults);
    });
  
    return (
      <div className="grid-container">
        <table>
          <tbody>
            <tr>
              <td className="corner"></td>
              {xAxis.map((num, i) => (
                <td key={i} className="axis-cell">{num}</td>
              ))}
            </tr>
  
            {yAxis.map((num, row) => (
              <tr key={row}>
                <td className="axis-cell">{num}</td>
                {gridData[row]?.map((name, col) => {
                  const frequency = cellFrequency[row][col];
                  const backgroundColor = `rgba(0, 0, 255, ${Math.min(frequency / 30, 1)})`;
                  return (
                    <td key={col} className="cell" style={{ backgroundColor }}>
                      {name}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* Table for total payouts */}
        <div className="payout-results">
          <h3>Total Payouts</h3>
          <table className="payout-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Total Winnings ($)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(totalPayouts).map(([name, total]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>${total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Table for individual match results */}
        <div className="match-results">
          <h3>Match Results</h3>
          <table className="match-table">
            <thead>
              <tr>
                <th>Round</th>
                <th>Score</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              {allMatchResults.map(({ round, score, winner }, index) => (
                <tr key={index}>
                  <td>{round}</td>
                  <td>{score}</td>
                  <td>{winner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default Grid;
  