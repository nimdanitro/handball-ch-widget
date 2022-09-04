import { useEffect, useState } from "react";

import { GamePlayed, GamesPlanned } from "../types/games";

import { NextGamesCard, NextGamesTable } from "../components/nextGames";
import { ResultsCards, ResultsTable } from "../components/results";

import { useParams, useSearchParams } from "react-router-dom";

function Results() {
  let { id } = useParams();

  // TODO: loading and error handling
  const [games, setGames] = useState<GamePlayed[]>([]);

  const [searchParams] = useSearchParams();
  let numResults = searchParams.get("results") || 10;

  useEffect(() => {
    fetch(
      `/rest/v1/clubs/${id}/games?status=played&listgames=${numResults}-${numResults}&order=DESC`
    )
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, [id, numResults]);

  if (games.length === 0) return null;

  return (
    <section className="section">
      <div className="is-hidden-touch">
        <ResultsTable games={games} />
      </div>
      <div className="is-hidden-desktop">
        <ResultsCards games={games} />
      </div>
    </section>
  );
}

function NextGames() {
  let { id } = useParams();

  const [games, setGames] = useState<GamesPlanned[]>([]);
  const [searchParams] = useSearchParams();
  let numNext = searchParams.get("next") || 10;

  useEffect(() => {
    fetch(
      `/rest/v1/clubs/${id}/games?status=planned&listgames=0-${numNext}&order=ASC`
    )
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, [id, numNext]);

  if (games.length === 0) return null;

  return (
    <section className="section">
      <div className="is-hidden-touch">
        <NextGamesTable games={games} />
      </div>
      <div className="is-hidden-desktop">
        <NextGamesCard games={games} />
      </div>
    </section>
  );
}

function Verein() {
  return (
    <>
      <Results />
      <NextGames />
    </>
  );
}

export default Verein;
