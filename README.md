# Handball Schweiz API Widget

This project allows you to view and embed last results and next games for teams and clubs using the [API from Handball Schweiz](https://www.handball.ch/media/1845/vat-anleitung-dataservice_de.pdf)

## How to use

You can iframe the following URLs:

- See all results and next games of a club: [https://${hostname}/verein/${club.id}](https://${hostname}/verein/140675) where $(club.id) is the ID of the club as seen in the Matchcenter URL of Handball Schweiz: e.g. 140675 for [https://www.handball.ch/de/matchcenter/vereine/140675](https://www.handball.ch/de/matchcenter/vereine/140675)
- See all results and next games of a team: [https://${hostname}/team/${team.id}](https://${hostname}/team/36184) where $(team.id) is the ID of the team as seen in the Matchcenter URL of Handball Schweiz: e.g. 36184 for [https://www.handball.ch/de/matchcenter/teams/36184](https://www.handball.ch/de/matchcenter/teams/36184)

### Controlling the number of results and next games

By default the last 10 and the next 10 games are displayed for both club and team. This can be changed by adding the following query parameters:

- results: for defining the number of played games displayed
- next: for defining the number of planned games displayed

Hence, if you want do display the last 20 results and the next 30 games of club 140675, you would use the following URL:

[https://${hostname}/verein/140675?results=20&next=30](https://${hostname}/verein/140675?results=20&next=30)


# Acknowledgements

This project has been created in collaboration with the [HC KTV Altdorf](https://hc-ktv-altdorf.ch/).
