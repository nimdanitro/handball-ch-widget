export interface Team {
  teamId: number;
  teamName: string;
  leagueId: number;
  clubId: number;
  clubName: string;
  languageId: number;
  leagueLong: string;
  leagueShort: string;
  groupText: string;
  groupId: number;
  playerShirtColor: string;
  playerShortColor: string;
  goalkeeperShirtColor: string;
  goalkeeperShortColor: string;
  topscorerPlayerFirstName: string | null;
  topscorerPlayerSurname: string | null;
  topscorerTotalScore: number | null;
}
