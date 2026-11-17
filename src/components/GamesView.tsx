import type { LoadStatus } from "../hooks/useGames";
import type { Game } from "../types/games";
import LoadingSpinner from "./LoadingSpinner";
import { NextGames } from "./nextGames";
import { Results } from "./results";

interface GamesViewProps {
  status: LoadStatus;
  planned: Game[];
  played: Game[];
  clubIds?: number[];
  onRetry: () => void;
}

function Message({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-uppercase is-size-4">{title}</h1>
        {children}
      </div>
    </section>
  );
}

function GamesView({ status, planned, played, clubIds, onRetry }: GamesViewProps) {
  if (status === "loading")
    return (
      <Message title="Lade Spiele">
        <LoadingSpinner />
      </Message>
    );

  if (status === "error")
    return (
      <Message title="Spiele konnten nicht geladen werden">
        <p role="alert">
          Bitte versuche es später noch einmal.{" "}
          <a href="#retry" onClick={(e) => (e.preventDefault(), onRetry())}>
            Erneut versuchen
          </a>
        </p>
      </Message>
    );

  if (planned.length === 0 && played.length === 0) return <Message title="Keine Spiele gefunden" />;

  return (
    <>
      <Results games={played} clubIds={clubIds} />
      <NextGames games={planned} clubIds={clubIds} />
    </>
  );
}

export default GamesView;
