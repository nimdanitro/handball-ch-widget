import { Link } from "react-router";
import type { GamePlayed } from "../types/games";

interface ResultsProps {
  games: GamePlayed[];
  clubIds?: number[];
}

function ResultsTable({ games, clubIds }: ResultsProps) {
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
            <th>Resultat</th>
            <th>Zuschauer</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.gameId}>
              <td>
                {new Intl.DateTimeFormat("de-CH", {
                  dateStyle: "medium",
                }).format(new Date(game.gameDateTime))}
              </td>
              <td>
                {new Intl.DateTimeFormat("de-CH", {
                  hour: "numeric",
                  minute: "numeric",
                }).format(new Date(game.gameDateTime))}
              </td>
              <td>{game.leagueLong}</td>
              <td>
                {clubIds?.includes(game.clubTeamAId) ? (
                  <Link to={`/team/${game.teamAId}`}>
                    {game.teamAScoreFT > game.teamBScoreFT ? (
                      <strong>{game.teamAName}</strong>
                    ) : (
                      game.teamAName
                    )}
                  </Link>
                ) : game.teamAScoreFT > game.teamBScoreFT ? (
                  <strong>{game.teamAName}</strong>
                ) : (
                  game.teamAName
                )}
              </td>
              <td>
                {clubIds?.includes(game.clubTeamBId) ? (
                  <Link to={`/team/${game.teamBId}`}>
                    {game.teamBScoreFT > game.teamAScoreFT ? (
                      <strong>{game.teamBName}</strong>
                    ) : (
                      game.teamBName
                    )}
                  </Link>
                ) : game.teamBScoreFT > game.teamAScoreFT ? (
                  <strong>{game.teamBName}</strong>
                ) : (
                  game.teamBName
                )}
              </td>
              <td>
                {game.teamAScoreFT} - {game.teamBScoreFT} ({game.teamAScoreHT} - {game.teamBScoreHT}
                )
              </td>
              <td>{game.spectators}</td>
              <td>
                <a href={`https://www.handball.ch/de/matchcenter/spiele/${game.gameId}`}>
                  Live-Ticker
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ResultsCards({ games, clubIds }: ResultsProps) {
  return (
    <>
      {games.map((game) => (
        <div className="card mb-1" key={game.gameId}>
          <div className="card-content">
            <div className="content">
              <div className="container">
                <div className="columns is-gapless is-size-7 is-mobile">
                  <div className="column has-text-primary">
                    <p>{game.leagueShort}</p>
                  </div>
                  <div className="column is-size-7 is-half has-text-right">
                    <a
                      className="has-text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.handball.ch/de/matchcenter/spiele/${game.gameId}`}
                    >
                      Matchcenter
                    </a>
                  </div>
                </div>
              </div>
              <div className="columns mt-1 is-gapless">
                <div className="column is-one-third is-size-6">
                  {clubIds?.includes(game.clubTeamAId) ? (
                    <Link to={`/team/${game.teamAId}`}>
                      {game.teamAScoreFT > game.teamBScoreFT ? (
                        <strong>{game.teamAName}</strong>
                      ) : (
                        game.teamAName
                      )}
                    </Link>
                  ) : game.teamAScoreFT > game.teamBScoreFT ? (
                    <strong>{game.teamAName}</strong>
                  ) : (
                    game.teamAName
                  )}
                </div>
                <div className="column is-one-third is-size-6 has-text-centered is-hidden-mobile">
                  -
                </div>
                <div className="column is-one-third is-size-6 has-text-right is-hidden-mobile">
                  {clubIds?.includes(game.clubTeamBId) ? (
                    <Link to={`/team/${game.teamBId}`}>
                      {game.teamBScoreFT > game.teamAScoreFT ? (
                        <strong>{game.teamBName}</strong>
                      ) : (
                        game.teamBName
                      )}
                    </Link>
                  ) : game.teamBScoreFT > game.teamAScoreFT ? (
                    <strong>{game.teamBName}</strong>
                  ) : (
                    game.teamBName
                  )}
                </div>
                <div className="column is-one-third is-size-6 is-hidden-tablet">
                  {clubIds?.includes(game.clubTeamBId) ? (
                    <Link to={`/team/${game.teamBId}`}>{game.teamBName}</Link>
                  ) : game.teamBScoreFT > game.teamAScoreFT ? (
                    <strong>{game.teamBName}</strong>
                  ) : (
                    game.teamBName
                  )}
                </div>
              </div>
              <div className="columns is-gapless is-mobile">
                <div className="column mr-2 is-half is-size-6 has-text-right">
                  {game.teamAScoreFT} : {game.teamBScoreFT}
                </div>
                <div className="column is-half is-size-6 has-text-left">
                  ({game.teamAScoreHT} : {game.teamBScoreHT})
                </div>
              </div>
              <div className="columns is-gapless is-size-7 is-mobile">
                <div className="column is-half has-text-primary">
                  {new Intl.DateTimeFormat("de-CH", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(game.gameDateTime))}
                </div>
                <div className="column is-size-7 is-half has-text-right">
                  {game.venue}
                  <br />
                  Zuschauer: {game.spectators}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function Results({ games, clubIds }: ResultsProps) {
  if (games.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-uppercase is-size-4">Letzte Resultate</h1>
        <div className="is-hidden-touch">
          <ResultsTable games={games} clubIds={clubIds} />
        </div>
        <div className="is-hidden-desktop">
          <ResultsCards games={games} clubIds={clubIds} />
        </div>
      </div>
    </section>
  );
}

export { Results, ResultsCards, ResultsTable };
