import type { GamesPlanned } from "../types/games";
import GameCard from "./GameCard";
import GamesSection from "./GamesSection";
import GamesTable from "./GamesTable";
import { VenueLink } from "./gameParts";

interface NextGamesProps {
  games: GamesPlanned[];
  clubIds?: number[];
}

function NextGamesTable({ games, clubIds }: NextGamesProps) {
  return (
    <GamesTable
      games={games}
      clubIds={clubIds}
      extraHeaders={["Halle"]}
      extraCells={(game) => (
        <td>
          <VenueLink game={game} />
        </td>
      )}
    />
  );
}

function NextGamesCard({ games, clubIds }: NextGamesProps) {
  return (
    <>
      {games.map((game) => (
        <GameCard
          key={game.gameId}
          game={game}
          clubIds={clubIds}
          linkLabel="Live-Ticker"
          tight
          footerRight={<VenueLink game={game} className="has-text-primary" />}
        />
      ))}
    </>
  );
}

function NextGames({ games, clubIds }: NextGamesProps) {
  if (games.length === 0) return null;

  return (
    <GamesSection
      title="Nächste Spiele"
      table={<NextGamesTable games={games} clubIds={clubIds} />}
      cards={<NextGamesCard games={games} clubIds={clubIds} />}
    />
  );
}

export { NextGames, NextGamesCard, NextGamesTable };
