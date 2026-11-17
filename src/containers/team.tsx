import { useParams } from "react-router";
import GamesView from "../components/GamesView";
import { useGames } from "../hooks/useGames";

function Team() {
  const { id } = useParams();
  const { status, planned, played, retry } = useGames(`/rest/v1/teams/${id}/games`);

  return <GamesView status={status} planned={planned} played={played} onRetry={retry} />;
}

export default Team;
