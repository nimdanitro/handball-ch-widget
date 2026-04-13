import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import { NextGames } from "../components/nextGames";
import { Results } from "../components/results";
import type { Game } from "../types/games";

function Verein() {
	const { id } = useParams();
	const [searchParams] = useSearchParams();

	const numResults: number = Number(searchParams.get("results")) || 10;
	const numNext: number = Number(searchParams.get("next")) || 10;

	const [gamesPlanned, setGamesPlanned] = useState<Game[]>([]);
	const [gamesPlayed, setGamesPlayed] = useState<Game[]>([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`/rest/v1/clubs/${id}/games`)
			.then((res) => res.json())
			.then((data: Game[]) => {
				setGamesPlanned(
					data
						.filter((g: Game) => g.gameStatusId === 1)
						.sort(
							(a: Game, b: Game) =>
								new Date(a.gameDateTime).getTime() -
								new Date(b.gameDateTime).getTime(),
						)
						.slice(0, numNext),
				);
				setGamesPlayed(
					data
						.filter((g: Game) => g.gameStatusId === 2)
						.sort(
							(a: Game, b: Game) =>
								new Date(b.gameDateTime).getTime() -
								new Date(a.gameDateTime).getTime(),
						)
						.slice(0, numResults),
				);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, [id, numResults, numNext]);

	if (isLoading)
		return (
			<section className="section">
				<div className="container">
					<h1 className="title is-uppercase is-size-4">Lade Spiele</h1>
					<LoadingSpinner />
				</div>
			</section>
		);

	return (
		<>
			<Results games={gamesPlayed} clubId={Number(id)} />
			<NextGames games={gamesPlanned} clubId={Number(id)} />
		</>
	);
}
//2023-09-09T15:45:00
export default Verein;
