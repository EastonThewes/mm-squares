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

interface Round {
  id: string;
  pairs: [number, number][]; // Each pair is a tuple of two numbers
  payout: number;
}

interface PeoplePayoutsProps {
  rounds: Round[];
}

const PeoplePayouts: React.FC<PeoplePayoutsProps> = ({ rounds }) => {
  const [payouts, setPayouts] = useState<Record<string, number>>({});
  const [xAxis, setXAxis] = useState<number[]>([1, 9, 7, 8, 5, 6, 4, 0, 2, 3]);
  const [yAxis, setYAxis] = useState<number[]>([4, 5, 7, 8, 2, 1, 6, 9, 0, 3]);
  useEffect(() => {
    const totalPayouts: Record<string, number> = {};

    rounds.forEach((round) => {
      round.pairs.forEach(([num1, num2]) => {
        const winner = Math.max(num1, num2);
        const loser = Math.min(num1, num2);

        const columnIndex = xAxis.indexOf(winner % 10);
        const rowIndex = yAxis.indexOf(loser % 10);

        if (rowIndex >= 0 && columnIndex >= 0) {
          const name = names[rowIndex * 10 + columnIndex]; // Map to name based on x and y
          if (name) {
            totalPayouts[name] = (totalPayouts[name] || 0) + round.payout;
          }
        }
      });
    });

    setPayouts(totalPayouts);
  }, [rounds, xAxis, yAxis]);

  return (
    <div className="payouts-table-container" style={{ padding: "20px" }}>
      <TableContainer component={Paper} style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", borderRadius: "10px" }}>
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
                  {total}
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
