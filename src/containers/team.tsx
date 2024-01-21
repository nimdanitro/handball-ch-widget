import { useEffect, useState } from "react";

import { Game } from "../types/games";

import { NextGames } from "../components/nextGames";
import { Results } from "../components/results";

import { useParams, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function Team() {
  let { id } = useParams();
  const [searchParams] = useSearchParams();

  let numResults = searchParams.get("results") || 10;
  let numNext = searchParams.get("next") || 10;

  const [gamesPlanned, setGamesPlanned] = useState<Game[]>([]);
  const [gamesPlayed, setGamesPlayed] = useState<Game[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `/rest/v1/teams/${id}/games`
    )
      .then((res) => res.json())
      .then((data) => {
        setGamesPlanned(data.filter((g: Game) => g.gameStatusId === 1).sort((a: Game, b: Game) => new Date(a.gameDateTime) < new Date(b.gameDateTime)).slice(0, numNext))
        setGamesPlayed(data.filter((g: Game) => g.gameStatusId === 2).sort((a: Game, b: Game) => new Date(a.gameDateTime) < new Date(b.gameDateTime)).slice(0, numResults))
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id, numResults, numNext]);


  if (isLoading) return (
    <section className="section">
      <div className="container">
        <h1 className="title is-uppercase is-size-4">Lade Spiele</h1>
        <LoadingSpinner />
      </div>
    </section>
  )

  return (
    <>
      <Results games={gamesPlayed} />
      <NextGames games={gamesPlanned} />
    </>
  );
}

export default Team;
