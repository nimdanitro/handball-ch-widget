
import { GamesPlanned } from "../types/games";

interface NextGamesProps {
  games: GamesPlanned[];
}

function NextGamesTable({ games }: NextGamesProps) {
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
            <th>Halle</th>
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
              <td>{game.teamAName}</td>
              <td>{game.teamBName}</td>
              <td>
                {game.venueAddress && game.venueCity && game.venue &&
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.google.com/maps/place/${game.venueAddress.replaceAll(
                      " ",
                      "+"
                    )},+${game.venueCity.replaceAll(" ", "+")}`}
                  >
                    {game.venue}
                  </a>}
              </td>
              <td>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.handball.ch/de/matchcenter/spiele/${game.gameId}`}
                >
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

function NextGamesCard({ games }: NextGamesProps) {
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
                      Live-Ticker
                    </a>
                  </div>
                </div>
              </div>
              <div className="columns mt-1 mb-1 is-gapless">
                <div className="column is-one-third is-size-6">
                  {game.teamAName}
                </div>
                <div className="column is-one-third is-size-6 has-text-centered is-hidden-mobile">
                  -
                </div>
                <div className="column is-one-third is-size-6 has-text-right is-hidden-mobile">
                  {game.teamBName}
                </div>
                <div className="column is-one-third is-size-6 is-hidden-tablet">
                  {game.teamBName}
                </div>
              </div>
              <div className="columns is-gapless is-size-7 is-mobile">
                <div className="column has-text-primary">
                  {new Intl.DateTimeFormat("de-CH", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(game.gameDateTime))}
                </div>
                <div className="column is-size-7 is-half has-text-right">
                  {game.venueAddress && game.venueCity && game.venue &&
                    <a
                      className="has-text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.google.com/maps/place/${game.venueAddress.replaceAll(
                        " ",
                        "+"
                      )},+${game.venueCity.replaceAll(" ", "+")}`}
                    >
                      {game.venue}
                    </a>}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
      }
    </>
  );
}

export { NextGamesCard, NextGamesTable };

