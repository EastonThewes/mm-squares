import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from "@mui/material";

const names: string[] = [
  "Kisscha", "Kisscha", "Brandon", "Easton", "Dakota", "Dakota", "Easton", "Scott H.", "Brandon", "Brandon",
  "Kisscha", "Kisscha", "Mike B.", "Kisscha", "Dakota", "Dakota", "Easton", "Brandon", "Brandon", "Brandon",
  "Kisscha", "Mike K.", "Scott H.", "Scott H.","Mike B.", "Mike K.", "Mike B.", "Mike B.", "Brandon", "Scott H.", 
  "Mike B.", "Mike K.", "Scott H.", "Scott H.", "Kisscha", "Mike B.", "Kisscha", "Dakota", "Easton", "Scott H.",
  "Easton", "Easton", "Kisscha", "Mike B.", "Dakota", "Mike K.", "Scott H.", "Kisscha", "Mike B.", "Scott H.",
  "Easton", "Easton", "Brandon", "Kisscha", "Mike K.", "Mike K.", "Mike K.", "Kisscha", "Easton", "Dakota",
  "Easton", "Dakota", "Brandon", "Kisscha", "Easton", "Mike K.", "Easton", "Easton", "Scott H.", "Mike B.",
  "Easton", "Mike K.", "Kisscha", "Brandon", "Brandon", "Mike B.", "Easton", "Easton", "Easton", "Brandon",
  "Brandon", "Brandon", "Dakota", "Brandon", "Kisscha", "Dakota", "Brandon", "Brandon", "Kisscha", "Kisscha",
  "Brandon", "Brandon", "Easton", "Kisscha", "Brandon", "Easton", "Mike K.", "Easton", "Kisscha", "Kisscha",
];


interface GridProps {
  games: Game[];
}

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

const SquaresGrid: React.FC<GridProps> = ({ games }) => {
  const [xAxis, setXAxis] = useState<number[]>([]);
  const [yAxis, setYAxis] = useState<number[]>([]);
  const [gridData, setGridData] = useState<string[][]>([]);
  const [cellFrequency, setCellFrequency] = useState<number[][]>([]);

  useEffect(() => {
    setXAxis([1, 9, 7, 8, 5, 6, 4, 0, 2, 3]);
    setYAxis([4, 5, 7, 8, 2, 1, 6, 9, 0, 3]);

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

    games.forEach((game) => {

      //@ts-ignore
      if (game.finished !== 'FINAL') {
        return;
      } else {
        const winner =  Math.max(game.awayScore, game.homeScore);
        const loser =  Math.min(game.awayScore, game.homeScore);
  
        const columnIndex = xAxis.indexOf(winner % 10);
        const rowIndex = yAxis.indexOf(loser % 10);
  
        if (rowIndex >= 0 && columnIndex >= 0) {
          newFrequency[rowIndex][columnIndex]++;
        }
      }

      
    });

    setCellFrequency(newFrequency);
  }, [games, xAxis, yAxis]);


  return (
    <div className="grid-container" style={{ }}>
      <TableContainer component={Paper} style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", borderRadius: "10px", padding:10 }}>
        <Table>
          <TableHead style={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell
                className="corner"
                style={{
                  fontWeight: "bold",
                  color: "#333",
                  fontSize: "16px",
                  backgroundColor: "#f0f0f0",
                  borderRight: "1px solid lightgray",
                  borderBottom: "1px solid lightgray",
                  borderLeft: "1px solid lightgray",
                }}
              ></TableCell>
              {xAxis.map((num, i) => (
                <TableCell
                  key={i}
                  align="center"
                  style={{
                    backgroundColor: "#f0f0f0",
                    color: "#333",
                    fontWeight: "bold",
                    padding: "10px",
                    borderBottom: "1px solid lightgray",
                    borderRight: "1px solid lightgray",
                    borderLeft: "1px solid lightgray",
                  }}
                >
                  {num}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {yAxis.map((num, row) => (
              <TableRow key={row}>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    backgroundColor: "#f0f0f0",
                    borderRight: "1px solid lightgray",
                    borderBottom: "1px solid lightgray",
                    borderLeft: "1px solid lightgray",
                  }}
                >
                  {num}
                </TableCell>
                {gridData[row]?.map((name, col) => {
                  const frequency = cellFrequency[row][col];
                  const backgroundColor = `rgba(0, 0, 255, ${Math.min(frequency / 16, 1)})`;

                  return (
                    <Tooltip
                      key={col}
                      title={`Wins: ${frequency}`} // Tooltip with the frequency count
                      placement="top"
                    >
                      <TableCell
                        align="center"
                        style={{
                          backgroundColor,
                          color: "#333",
                          fontWeight: "bold",
                          padding: "10px",
                          transition: "background-color 0.3s, transform 0.3s", // Added transform transition
                          borderRight: "1px solid lightgray",
                          borderBottom: "1px solid lightgray",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.1)"; // Small size increase on hover
                        }}
                        onMouseLeave={(e) => {
                          // e.currentTarget.style.backgroundColor = backgroundColor;
                          e.currentTarget.style.transform = "scale(1)"; // Reset size
                        }}
                      >
                        {name}
                      </TableCell>
                    </Tooltip>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SquaresGrid;
