import type { ReactNode } from "react";
import {
  type GameBase,
  GuestName,
  HomeName,
  MatchcenterLink,
  formatDate,
  formatTime,
} from "./gameParts";

interface GamesTableProps<G extends GameBase> {
  games: G[];
  clubIds?: number[];
  /** Headers of the columns between the teams and the details link. */
  extraHeaders: string[];
  /** The cells (`<td>`) for `extraHeaders`. */
  extraCells: (game: G) => ReactNode;
  /** Bold the team with the higher score. */
  boldWinner?: (game: G) => "home" | "guest" | undefined;
}

function GamesTable<G extends GameBase>({
  games,
  clubIds,
  extraHeaders,
  extraCells,
  boldWinner,
}: GamesTableProps<G>) {
  return (
    <div className="table-container">
      <table className="table is-hoverable is-narrow is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Datum</th>
            <th>Uhrzeit</th>
            <th>Gruppe/Cup</th>
            <th>Heim</th>
            <th>Gast</th>
            {extraHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => {
            const winner = boldWinner?.(game);
            return (
              <tr key={game.gameId}>
                <td>{formatDate(game.gameDateTime)}</td>
                <td>{formatTime(game.gameDateTime)}</td>
                <td>{game.leagueLong}</td>
                <td>
                  <HomeName game={game} clubIds={clubIds} bold={winner === "home"} />
                </td>
                <td>
                  <GuestName game={game} clubIds={clubIds} bold={winner === "guest"} />
                </td>
                {extraCells(game)}
                <td>
                  <MatchcenterLink game={game}>Live-Ticker</MatchcenterLink>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default GamesTable;
