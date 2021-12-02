import React from 'react';

import { GamePlayed } from '../types/games';

interface ResultsProps {
    games: GamePlayed[]
}

function Results({ games }: ResultsProps) {

    return (
        <div className="container is-fluid">
            <h1 className="title">Letzte Resultate</h1>
            <div className="table-container">
                <table className="table is-hoverable is-fullwidth is-striped">
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
                        {games.map(game => (
                            <tr key={game.gameId}>
                                <td>{new Intl.DateTimeFormat('de-CH', { dateStyle: "medium" }).format(new Date(game.gameDateTime))}</td>
                                <td>{new Intl.DateTimeFormat('de-CH', { hour: 'numeric', minute: 'numeric', }).format(new Date(game.gameDateTime))}</td>
                                <td>{game.leagueLong}</td>
                                <td>{game.teamAName}</td>
                                <td>{game.teamBName}</td>
                                <td>{game.teamAScoreFT} - {game.teamBScoreFT} ({game.teamAScoreHT} - {game.teamBScoreHT})</td>
                                <td>{game.spectators}</td>
                                <td><a href={`https://www.handball.ch/de/matchcenter/spiele/${game.gameId}`} >Live-Ticker</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}


export default Results;