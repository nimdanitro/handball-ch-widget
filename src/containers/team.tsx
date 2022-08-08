import React, { useState, useEffect } from "react";

import { GamePlayed, GamesPlanned } from "../types/games";

import { ResultsTable } from "../components/results";
import { NextGamesTable, NextGamesCard } from "../components/nextGames";

import { useParams, useSearchParams } from "react-router-dom";

export function Results() {
  let { id } = useParams();

  // TODO: loading and error handling
  const [games, setGames] = useState<GamePlayed[]>([]);

  const [searchParams] = useSearchParams();
  let numResults = searchParams.get("results") || 10;

  useEffect(() => {
    fetch(
      `/rest/v1/teams/${id}/games?status=played&listgames=${numResults}-0&order=DESC`
    )
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.log(err));
  }, [id, numResults]);

  return <ResultsTable games={games} />;
}

export function NextGames() {
  let { id } = useParams();

  const [games, setGames] = useState<GamesPlanned[]>([]);

  const [searchParams] = useSearchParams();
  let numNext = searchParams.get("next") || 10;

  useEffect(() => {
    fetch(
      `/rest/v1/teams/${id}/games?status=planned&listgames=0-${numNext}&order=ASC`
    )
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.log(err));
  }, [id, numNext]);

  return (
    <>
      <div className="is-hidden-touch">
        <NextGamesTable games={games} />
      </div>
      <div className="is-hidden-desktop">
        <NextGamesCard games={games} />
      </div>
    </>
  );
}

function Team() {
  return (
    <div>
      <section className="section">
        <Results />
      </section>
      <section className="section">
        <NextGames />
      </section>
    </div>
  );
}

export default Team;
