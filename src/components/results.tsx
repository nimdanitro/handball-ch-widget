import type { GamePlayed } from "../types/games";
import GameCard from "./GameCard";
import GamesSection from "./GamesSection";
import GamesTable from "./GamesTable";

interface ResultsProps {
  games: GamePlayed[];
  clubIds?: number[];
}

const winner = (game: GamePlayed) =>
  game.teamAScoreFT > game.teamBScoreFT
    ? "home"
    : game.teamBScoreFT > game.teamAScoreFT
      ? "guest"
      : undefined;

function ResultsTable({ games, clubIds }: ResultsProps) {
  return (
    <GamesTable
      games={games}
      clubIds={clubIds}
      boldWinner={winner}
      extraHeaders={["Resultat", "Zuschauer"]}
      extraCells={(game) => (
        <>
          <td>
            {game.teamAScoreFT} - {game.teamBScoreFT} ({game.teamAScoreHT} - {game.teamBScoreHT})
          </td>
          <td>{game.spectators}</td>
        </>
      )}
    />
  );
}

function ResultsCards({ games, clubIds }: ResultsProps) {
  return (
    <>
      {games.map((game) => (
        <GameCard
          key={game.gameId}
          game={game}
          clubIds={clubIds}
          linkLabel="Matchcenter"
          winner={winner(game)}
          score={
            <div className="columns is-gapless is-mobile">
              <div className="column mr-2 is-half is-size-6 has-text-right">
                {game.teamAScoreFT} : {game.teamBScoreFT}
              </div>
              <div className="column is-half is-size-6 has-text-left">
                ({game.teamAScoreHT} : {game.teamBScoreHT})
              </div>
            </div>
          }
          footerRight={
            <>
              {game.venue}
              <br />
              Zuschauer: {game.spectators}
            </>
          }
        />
      ))}
    </>
  );
}

function Results({ games, clubIds }: ResultsProps) {
  if (games.length === 0) return null;

  return (
    <GamesSection
      title="Letzte Resultate"
      table={<ResultsTable games={games} clubIds={clubIds} />}
      cards={<ResultsCards games={games} clubIds={clubIds} />}
    />
  );
}

export { Results, ResultsCards, ResultsTable };
