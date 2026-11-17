import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import type { Game } from "../types/games";
import type { Team } from "../types/teams";

export type LoadStatus = "loading" | "error" | "ready";

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Request to ${url} failed with status ${res.status}`);
  return (await res.json()) as T;
}

function byDate(direction: 1 | -1) {
  return (a: Game, b: Game) =>
    direction * (new Date(a.gameDateTime).getTime() - new Date(b.gameDateTime).getTime());
}

/**
 * Loads the games of a team or club from `url` and splits them into the next
 * planned games (soonest first) and the last played games (latest first).
 * The amounts come from the `next` and `results` query parameters (default 10).
 */
export function useGames(url: string) {
  const [searchParams] = useSearchParams();
  const numResults = Number(searchParams.get("results")) || 10;
  const numNext = Number(searchParams.get("next")) || 10;

  const [attempt, setAttempt] = useState(0);
  // The result belongs to the request that produced it; while the key of the
  // current request differs, we are loading again (new url, params or retry).
  const key = `${url}|${numNext}|${numResults}|${attempt}`;
  const [result, setResult] = useState<{
    key: string;
    status: "error" | "ready";
    planned: Game[];
    played: Game[];
  }>();

  useEffect(() => {
    const controller = new AbortController();

    fetchJson<Game[]>(url, controller.signal)
      .then((data) => {
        if (!Array.isArray(data)) throw new Error(`Unexpected response from ${url}`);
        setResult({
          key,
          status: "ready",
          planned: data
            .filter((g) => g.gameStatusId === 1)
            .sort(byDate(1))
            .slice(0, numNext),
          played: data
            .filter((g) => g.gameStatusId === 2)
            .sort(byDate(-1))
            .slice(0, numResults),
        });
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error(err);
        setResult({ key, status: "error", planned: [], played: [] });
      });

    return () => controller.abort();
  }, [key, url, numResults, numNext]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  const current = result?.key === key ? result : undefined;
  const status: LoadStatus = current?.status ?? "loading";
  return { status, planned: current?.planned ?? [], played: current?.played ?? [], retry };
}

/** Loads the ids of all clubs of the teams of a club; used to highlight "our" team. */
export function useClubIds(id: string | undefined) {
  const [clubIds, setClubIds] = useState<number[]>([Number(id)]);

  useEffect(() => {
    const controller = new AbortController();
    fetchJson<Team[]>(`/rest/v1/clubs/${id}/teams`, controller.signal)
      .then((data) => setClubIds(data.map((team) => team.clubId)))
      .catch((err) => {
        if (!controller.signal.aborted) console.error(err);
      });
    return () => controller.abort();
  }, [id]);

  return clubIds;
}
