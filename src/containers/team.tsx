import { useEffect, useState } from "react";

import { GamePlayed, GamesPlanned } from "../types/games";

import { NextGamesCard, NextGamesTable } from "../components/nextGames";
import { ResultsCards, ResultsTable } from "../components/results";

import { useParams, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

export function Results() {
  let { id } = useParams();

  const [isLoading, setLoading] = useState(true);
  const [games, setGames] = useState<GamePlayed[]>([]);

  const [searchParams] = useSearchParams();
  let numResults = searchParams.get("results") || 10;

  useEffect(() => {
    fetch(
      `/rest/v1/teams/${id}/games?status=played&listgames=${numResults}-0&order=DESC`
    )
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id, numResults]);

  if (isLoading) return (
    <section className="section">
      <div className="container">
        <h1 className="title is-uppercase is-size-4">Lade Resultate</h1>
        <LoadingSpinner />
      </div>

    </section>
  )

  if (games.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-uppercase is-size-4">Letzte Resultate</h1>
        <div className="is-hidden-touch">
          <ResultsTable games={games} />
        </div>
        <div className="is-hidden-desktop">
          <ResultsCards games={games} />
        </div>
      </div>
    </section>
  );
}

export function NextGames() {
  let { id } = useParams();

  const [games, setGames] = useState<GamesPlanned[]>([]);
  const [isLoading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  let numNext = searchParams.get("next") || 10;

  useEffect(() => {
    fetch(
      `/rest/v1/teams/${id}/games?status=planned&listgames=0-${numNext}&order=ASC`
    )
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id, numNext]);

  if (isLoading && numNext !== 0) return (
    <section className="section">
      <div className="container">
        <h1 className="title is-uppercase is-size-4">Lade nächste Spiele</h1>
        <LoadingSpinner />
      </div>
    </section>
  )

  if (games.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-uppercase is-size-4">Nächste Spiele</h1>
        <div className="is-hidden-touch">
          <NextGamesTable games={games} />
        </div>
        <div className="is-hidden-desktop">
          <NextGamesCard games={games} />
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <>
      <Results />
      <NextGames />
    </>
  );
}

export default Team;
