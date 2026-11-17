import type { ReactNode } from "react";

interface GamesSectionProps {
  title: string;
  /** Wide layout, shown on desktop. */
  table: ReactNode;
  /** Compact layout, shown on touch devices. */
  cards: ReactNode;
}

function GamesSection({ title, table, cards }: GamesSectionProps) {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-uppercase is-size-4">{title}</h1>
        <div className="is-hidden-touch">{table}</div>
        <div className="is-hidden-desktop">{cards}</div>
      </div>
    </section>
  );
}

export default GamesSection;
