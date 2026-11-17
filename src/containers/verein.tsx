import { useParams } from "react-router";
import GamesView from "../components/GamesView";
import { useClubIds, useGames } from "../hooks/useGames";

function Verein() {
  const { id } = useParams();
  const clubIds = useClubIds(id);
  const { status, planned, played, retry } = useGames(`/rest/v1/clubs/${id}/games`);

  return (
    <GamesView
      status={status}
      planned={planned}
      played={played}
      clubIds={clubIds}
      onRetry={retry}
    />
  );
}

export default Verein;
