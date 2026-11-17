import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import Team from "./team";

const game = (id: number, status: number, day: number) => ({
  gameId: id,
  gameStatusId: status,
  gameDateTime: `2026-01-${String(day).padStart(2, "0")}T20:00:00`,
  gameTypeLong: "Meisterschaft",
  gameTypeShort: "MS",
  leagueLong: "Liga",
  leagueShort: "L",
  teamAName: `Heim ${id}`,
  teamBName: `Gast ${id}`,
  venue: "Halle",
  teamAScoreFT: 1,
  teamBScoreFT: 2,
  teamAScoreHT: 0,
  teamBScoreHT: 1,
});

function renderTeam(search = "") {
  return render(
    <MemoryRouter initialEntries={[`/team/1${search}`]}>
      <Routes>
        <Route path="/team/:id" element={<Team />} />
      </Routes>
    </MemoryRouter>,
  );
}

const respond = (body: unknown, ok = true, status = 200) =>
  Promise.resolve({ ok, status, json: () => Promise.resolve(body) } as Response);

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("shows the games once loaded", async () => {
  vi.spyOn(globalThis, "fetch").mockReturnValue(respond([game(1, 2, 1), game(2, 1, 2)]));
  renderTeam();
  expect(screen.getByText("Lade Spiele")).toBeInTheDocument();
  expect(await screen.findAllByText("Letzte Resultate")).not.toHaveLength(0);
  expect(screen.getAllByText("Nächste Spiele")).not.toHaveLength(0);
});

test("limits the amount of games with the query parameters", async () => {
  const games = [game(1, 2, 1), game(2, 2, 2), game(3, 2, 3)];
  vi.spyOn(globalThis, "fetch").mockReturnValue(respond(games));
  renderTeam("?results=1");
  await screen.findAllByText("Letzte Resultate");
  // latest game first, rendered once (table on desktop)
  expect(screen.getAllByText(/Heim 3/)).toHaveLength(1);
  expect(screen.queryByText(/Heim 2/)).not.toBeInTheDocument();
});

test("shows an empty state when there are no games", async () => {
  vi.spyOn(globalThis, "fetch").mockReturnValue(respond([]));
  renderTeam();
  expect(await screen.findByText("Keine Spiele gefunden")).toBeInTheDocument();
});

test("shows an error state for an HTTP error and allows to retry", async () => {
  const fetchMock = vi
    .spyOn(globalThis, "fetch")
    .mockReturnValueOnce(respond({ message: "nope" }, false, 500))
    .mockReturnValue(respond([game(1, 2, 1)]));
  renderTeam();

  expect(await screen.findByText("Spiele konnten nicht geladen werden")).toBeInTheDocument();
  expect(screen.getByRole("alert")).toBeInTheDocument();

  await userEvent.click(screen.getByText("Erneut versuchen"));
  expect(await screen.findAllByText("Letzte Resultate")).not.toHaveLength(0);
  expect(fetchMock).toHaveBeenCalledTimes(2);
});

test("shows an error state when the request fails", async () => {
  vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("network"));
  renderTeam();
  expect(await screen.findByText("Spiele konnten nicht geladen werden")).toBeInTheDocument();
});
