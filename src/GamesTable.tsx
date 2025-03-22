
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

const xAxis: number[] = [1, 9, 7, 8, 5, 6, 4, 0, 2, 3]; // Example x-axis for home score units
const yAxis: number[] = [4, 5, 7, 8, 2, 1, 6, 9, 0, 3]; // Example y-axis for away score units

interface Game {
  awayScore: number;
  homeScore: number;
  awayTeam: string;
  homeTeam: string;
  round: string;
}

interface GamesTableProps {
  games: Game[];
}

const GamesTable: React.FC<GamesTableProps> = ({ games }) => {




  const getWinner = (homeScore: number, awayScore: number) => {
    //@ts-ignore
    if (homeScore === "" || awayScore === "") return;

    const winner = Math.max(homeScore, awayScore);
    const loser = Math.min(homeScore, awayScore);

    const columnIndex = xAxis.indexOf(winner % 10);
    const rowIndex = yAxis.indexOf(loser % 10);

    if (rowIndex >= 0 && columnIndex >= 0) {
      const name = names[rowIndex * 10 + columnIndex ]; // Map to name based on x and y
        return name
    }
  };

  return (
    <div className="games-table-container" style={{ padding: 10 }}>
      <TableContainer component={Paper} style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", borderRadius: "10px" }}>
        <Table>
          <TableHead style={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", color: "#333", fontSize: "16px" }}>Round</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#333", fontSize: "16px" }}>Home Team</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#333", fontSize: "16px" }}>Home Score</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#333", fontSize: "16px" }}>Away Team</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#333", fontSize: "16px" }}>Away Score</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#333", fontSize: "16px" }}>Winner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map((game, index) => {
              const winner = getWinner(game.homeScore, game.awayScore);
              return (
                <TableRow key={index}>
                  <TableCell>{game.round}</TableCell>
                  <TableCell>{game.homeTeam}</TableCell>
                  <TableCell>{game.homeScore}</TableCell>
                  <TableCell>{game.awayTeam}</TableCell>
                  <TableCell>{game.awayScore}</TableCell>
                  <TableCell>{winner}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GamesTable;
