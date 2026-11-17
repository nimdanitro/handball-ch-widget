import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, test } from "vitest";
import type { GamePlayed, GamesPlanned } from "../types/games";
import { NextGames } from "./nextGames";
import { Results } from "./results";

const base = {
  gameId: 7,
  gameNr: 1,
  gameDateTime: new Date("2026-01-10T20:30:00"),
  gameTypeLong: "Meisterschaft",
  gameTypeShort: "MS",
  clubTeamAId: 10,
  clubTeamBId: 20,
  teamAId: 100,
  teamBId: 200,
  teamAName: "Heim",
  teamBName: "Gast",
  leagueLong: "Liga lang",
  leagueShort: "L",
  gameStatus: "",
  venue: "Halle Nord",
  venueAddress: "Hallenweg 1",
  venueCity: "Bern Stadt",
  venueZip: 3000,
};

const played = {
  ...base,
  teamAScoreFT: 17,
  teamBScoreFT: 15,
  teamAScoreHT: 9,
  teamBScoreHT: 8,
  spectators: 99,
} as GamePlayed;

const planned = base as GamesPlanned;

const setViewport = (width: number) => {
  window.innerWidth = width;
};

afterEach(() => setViewport(1024));

const renderIn = (ui: React.ReactNode) => render(<MemoryRouter>{ui}</MemoryRouter>);

test("results show the winner in bold and link own teams", () => {
  renderIn(<Results games={[played]} clubIds={[10]} />);
  const [table] = screen.getAllByRole("table");
  const row = within(table).getAllByRole("row")[1];
  const home = within(row).getByText("Heim");
  expect(home.tagName).toBe("STRONG");
  expect(home.closest("a")).toHaveAttribute("href", "/team/100");
  expect(within(row).getByText("Gast").closest("a")).toBeNull();
  expect(within(row).getByText("Gast").tagName).not.toBe("STRONG");
  expect(within(row).getByText("17 - 15 (9 - 8)")).toBeInTheDocument();
});

test("results render the table on desktop and only the table", () => {
  renderIn(<Results games={[played]} />);
  expect(screen.getAllByRole("table")).toHaveLength(1);
  expect(screen.queryByText("Matchcenter")).not.toBeInTheDocument();
  const live = screen.getByText("Live-Ticker");
  expect(live).toHaveAttribute("target", "_blank");
  expect(live).toHaveAttribute("rel", "noopener noreferrer");
});

test("results render cards on small screens and only the cards", () => {
  setViewport(500);
  renderIn(<Results games={[played]} />);
  expect(screen.queryByRole("table")).not.toBeInTheDocument();
  expect(screen.getByText("Matchcenter")).toHaveAttribute(
    "href",
    "https://www.handball.ch/de/matchcenter/spiele/7",
  );
  expect(screen.queryByText("Live-Ticker")).not.toBeInTheDocument();
  expect(screen.getByText("17 : 15")).toBeInTheDocument();
  // the guest is rendered once and without the "-" separator on phones
  expect(screen.getAllByText("Gast")).toHaveLength(1);
  expect(screen.queryByText("-")).not.toBeInTheDocument();
});

test("next games link the venue to Google Maps", () => {
  renderIn(<NextGames games={[planned]} />);
  const venues = screen.getAllByText("Halle Nord");
  expect(venues).toHaveLength(1);
  for (const venue of venues)
    expect(venue).toHaveAttribute(
      "href",
      "https://www.google.com/maps/place/Hallenweg+1,+Bern+Stadt",
    );
});

test("next games hide the venue link without an address", () => {
  renderIn(<NextGames games={[{ ...planned, venueAddress: "" }]} />);
  expect(screen.queryByText("Halle Nord")).not.toBeInTheDocument();
});

test("renders nothing without games", () => {
  const { container } = renderIn(<Results games={[]} />);
  expect(container).toBeEmptyDOMElement();
});
