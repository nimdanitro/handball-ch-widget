import type { ReactNode } from "react";
import { DESKTOP, useMediaQuery } from "../hooks/useMediaQuery";

interface GamesSectionProps {
  title: string;
  /** Wide layout, rendered on desktop. */
  table: ReactNode;
  /** Compact layout, rendered on smaller screens. */
  cards: ReactNode;
}

function GamesSection({ title, table, cards }: GamesSectionProps) {
  const isDesktop = useMediaQuery(DESKTOP);
  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-uppercase is-size-4">{title}</h1>
        {isDesktop ? table : cards}
      </div>
    </section>
  );
}

export default GamesSection;
