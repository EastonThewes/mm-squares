import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

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

interface PeoplePayoutsProps {
  games: Game[];
}

const getPayout = (round: string) => {
  if (round === "First Round") {
    return .5
  } else if (round === "Second Round") {
    return 1
  } else if (round === "Sweet 16") {
    return 2
  } else if (round === "Elite Eight") {
    return 3
  } else if (round === "FINAL FOUR") {
    return 10
  } else if (round === "Championship") {
    return 20
  }else {
    return 0
  }
}

const PeoplePayouts: React.FC<PeoplePayoutsProps> = ({ games }) => {
  const [payouts, setPayouts] = useState<Record<string, number>>({});
  const [xAxis] = useState<number[]>([1, 9, 7, 8, 5, 6, 4, 0, 2, 3]);
  const [yAxis] = useState<number[]>([4, 5, 7, 8, 2, 1, 6, 9, 0, 3]);
  useEffect(() => {
    const totalPayouts: Record<string, number> = {};

    games.forEach((game) => {

      //@ts-ignore
        if (!game.finished.includes('FINAL')) return
    
        const winner = Math.max(game.homeScore, game.awayScore);
        const loser = Math.min(game.homeScore, game.awayScore);

        const columnIndex = xAxis.indexOf(winner % 10);
        const rowIndex = yAxis.indexOf(loser % 10);

        if (rowIndex >= 0 && columnIndex >= 0) {
          const name = names[rowIndex * 10 + columnIndex]; // Map to name based on x and y
          if (name) {
            //@ts-ignore
            totalPayouts[name] = (totalPayouts[name] || 0) + getPayout(game.round);
          }
        }
  
    });

    setPayouts(totalPayouts);
  }, [games, xAxis, yAxis]);

  return (
    <div className="payouts-table-container" style={{  }}>
      <TableContainer component={Paper} style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", borderRadius: "10px", padding:10}}>
        <Table>
          <TableHead style={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell
                className="header-cell"
                style={{
                  fontWeight: "bold",
                  color: "#333",
                  fontSize: "16px",
                  backgroundColor: "#f0f0f0",
                  borderRight: "1px solid lightgray",
                  borderBottom: "1px solid lightgray",
                  borderLeft: "1px solid lightgray",
                }}
              >
                Name
              </TableCell>
              <TableCell
                className="header-cell"
                style={{
                  fontWeight: "bold",
                  color: "#333",
                  fontSize: "16px",
                  backgroundColor: "#f0f0f0",
                  borderRight: "1px solid lightgray",
                  borderBottom: "1px solid lightgray",
                  borderLeft: "1px solid lightgray",
                }}
              >
                Total Winnings
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(payouts).map(([name, total], index) => (
              <TableRow key={index}>
                <TableCell
                  style={{
                    fontSize: "14px",
                    padding: "10px",
                    borderRight: "1px solid lightgray",
                    borderBottom: "1px solid lightgray",
                  }}
                >
                  {name}
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "14px",
                    padding: "10px",
                    borderRight: "1px solid lightgray",
                    borderBottom: "1px solid lightgray",
                  }}
                >
                  ${total}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PeoplePayouts;
