import type { ReactNode } from "react";
import { Link } from "react-router";
import type { GamesPlanned } from "../types/games";

/** Fields that every game (played or planned) has. */
export type GameBase = GamesPlanned;

const dateFormat = new Intl.DateTimeFormat("de-CH", { dateStyle: "medium" });
const timeFormat = new Intl.DateTimeFormat("de-CH", { hour: "numeric", minute: "numeric" });
const dateTimeFormat = new Intl.DateTimeFormat("de-CH", {
  dateStyle: "medium",
  timeStyle: "short",
});

export const formatDate = (date: Date) => dateFormat.format(new Date(date));
export const formatTime = (date: Date) => timeFormat.format(new Date(date));
export const formatDateTime = (date: Date) => dateTimeFormat.format(new Date(date));

interface ExternalLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export function ExternalLink({ href, className, children }: ExternalLinkProps) {
  return (
    <a className={className} target="_blank" rel="noopener noreferrer" href={href}>
      {children}
    </a>
  );
}

export function MatchcenterLink({
  game,
  className,
  children,
}: {
  game: GameBase;
  className?: string;
  children: ReactNode;
}) {
  return (
    <ExternalLink
      className={className}
      href={`https://www.handball.ch/de/matchcenter/spiele/${game.gameId}`}
    >
      {children}
    </ExternalLink>
  );
}

/** Link to the venue on Google Maps; renders nothing if the address is incomplete. */
export function VenueLink({ game, className }: { game: GameBase; className?: string }) {
  if (!game.venueAddress || !game.venueCity || !game.venue) return null;
  const address = game.venueAddress.replaceAll(" ", "+");
  const city = game.venueCity.replaceAll(" ", "+");
  return (
    <ExternalLink
      className={className}
      href={`https://www.google.com/maps/place/${address},+${city}`}
    >
      {game.venue}
    </ExternalLink>
  );
}

interface TeamNameProps {
  name: string;
  teamId: number;
  clubTeamId: number;
  clubIds?: number[];
  /** Show the name in bold, e.g. for the winner of a played game. */
  bold?: boolean;
}

/** A team name; links to the team page if the team belongs to one of `clubIds`. */
export function TeamName({ name, teamId, clubTeamId, clubIds, bold }: TeamNameProps) {
  const label = bold ? <strong>{name}</strong> : name;
  return clubIds?.includes(clubTeamId) ? <Link to={`/team/${teamId}`}>{label}</Link> : label;
}

/** Both team names of a game; `winner` bolds the team with the higher score. */
export function HomeName({
  game,
  clubIds,
  bold,
}: {
  game: GameBase;
  clubIds?: number[];
  bold?: boolean;
}) {
  return (
    <TeamName
      name={game.teamAName}
      teamId={game.teamAId}
      clubTeamId={game.clubTeamAId}
      clubIds={clubIds}
      bold={bold}
    />
  );
}

export function GuestName({
  game,
  clubIds,
  bold,
}: {
  game: GameBase;
  clubIds?: number[];
  bold?: boolean;
}) {
  return (
    <TeamName
      name={game.teamBName}
      teamId={game.teamBId}
      clubTeamId={game.clubTeamBId}
      clubIds={clubIds}
      bold={bold}
    />
  );
}
