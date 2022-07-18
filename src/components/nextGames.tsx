import React from 'react';

import { GamesPlanned } from '../types/games';

interface NextGamesProps {
    games: GamesPlanned[]
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
                        {games.map(game => (
                            <tr key={game.gameId}>
                                <td>{new Intl.DateTimeFormat('de-CH', { dateStyle: "medium" }).format(new Date(game.gameDateTime))}</td>
                                <td>{new Intl.DateTimeFormat('de-CH', { hour: 'numeric', minute: 'numeric', }).format(new Date(game.gameDateTime))}</td>
                                <td>{game.leagueLong}</td>
                                <td>{game.teamAName}</td>
                                <td>{game.teamBName}</td>
                                <td>{game.venue}</td>
                                <td><a href={`https://www.handball.ch/de/matchcenter/spiele/${game.gameId}`} >Live-Ticker</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}


export default NextGames;