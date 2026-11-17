import type { ReactNode } from "react";
import { TABLET, useMediaQuery } from "../hooks/useMediaQuery";
import { type GameBase, GuestName, HomeName, MatchcenterLink, formatDateTime } from "./gameParts";

interface GameCardProps {
  game: GameBase;
  clubIds?: number[];
  /** Text of the link in the top right corner. */
  linkLabel: string;
  winner?: "home" | "guest";
  /** Optional row below the teams, e.g. the score. */
  score?: ReactNode;
  /** Content of the bottom right corner. */
  footerRight?: ReactNode;
  /** Use a small gap between the teams and the next row. */
  tight?: boolean;
}

function GameCard({ game, clubIds, linkLabel, winner, score, footerRight, tight }: GameCardProps) {
  const isTablet = useMediaQuery(TABLET);
  const guest = <GuestName game={game} clubIds={clubIds} bold={winner === "guest"} />;
  return (
    <div className="card mb-1">
      <div className="card-content">
        <div className="content">
          <div className="container">
            <div className="columns is-gapless is-size-7 is-mobile">
              <div className="column has-text-primary">
                <p>{game.leagueShort}</p>
              </div>
              <div className="column is-size-7 is-half has-text-right">
                <MatchcenterLink game={game} className="has-text-primary">
                  {linkLabel}
                </MatchcenterLink>
              </div>
            </div>
          </div>
          <div className={`columns mt-1 ${tight ? "mb-1 " : ""}is-gapless`}>
            <div className="column is-one-third is-size-6">
              <HomeName game={game} clubIds={clubIds} bold={winner === "home"} />
            </div>
            {isTablet ? (
              <>
                <div className="column is-one-third is-size-6 has-text-centered">-</div>
                <div className="column is-one-third is-size-6 has-text-right">{guest}</div>
              </>
            ) : (
              <div className="column is-one-third is-size-6">{guest}</div>
            )}
          </div>
          {score}
          <div className="columns is-gapless is-size-7 is-mobile">
            <div className="column is-half has-text-primary">
              {formatDateTime(game.gameDateTime)}
            </div>
            <div className="column is-size-7 is-half has-text-right">{footerRight}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
