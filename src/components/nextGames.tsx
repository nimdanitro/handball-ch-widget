import React from "react";

import { GamesPlanned } from "../types/games";

interface NextGamesProps {
  games: GamesPlanned[];
}

function NextGames({ games }: NextGamesProps) {
  return (
    <div className="container is-fluid">
      <h1 className="title is-uppercase">Nächste Spiele</h1>
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
                <td>{game.venue}</td>
                <td>
                  <a
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
    </div>
  );
}

function NextGamesCard({ games }: NextGamesProps) {
  return (
    <div className="container">
      <h1 className="title is-uppercase">Nächste Spiele</h1>
      {games.map((game) => (
        <div className="card mb-1">
          <div className="card-content">
            <div className="content">
              <div className="container">
                <div className="columns is-gapless is-mobile">
                  <div className="column has-text-primary is-size-7 is-half">
                    <p>{game.leagueShort}</p>
                  </div>
                </div>
              </div>
              <div className="columns mt-1 mb-1 is-gapless">
                <div className="column is-one-third is-size-6">
                  {game.teamAName}
                </div>
                <div className="column is-one-third is-size-6 has-text-centered is-hidden-touch">
                  -
                </div>
                <div className="column is-one-third is-size-6 has-text-right is-hidden-touch">
                  {game.teamBName}
                </div>
                <div className="column is-one-third is-size-6 is-hidden-desktop">
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
                  <a
                    className="has-text-primary"
                    href={`https://www.google.com/maps/place/${game.venueAddress.replaceAll(
                      " ",
                      "+"
                    )},+${game.venueCity.replaceAll(" ", "+")}`}
                  >
                    {game.venue}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NextGamesCard;
