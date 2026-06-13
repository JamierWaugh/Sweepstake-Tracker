import { useEffect, useState } from "react";
import sweepstake from "../data/sweepstake.json";
import LeagueTable, {type PlayerRow} from "../components/LeagueTable.tsx";
import getOwnerByTeam from "../utils/GetOwnerByTeamHelper";

function League(){
    const [leagueTableData, setLeagueTableData] = useState<PlayerRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function calculateLeagueTable() {
            try {
                const response = await fetch(`https://worldcup26.ir/get/groups`);
                const data = await response.json();

                const ownerLookup: Record<string, {pts: number; gd: number; gf: number; played: number}> = {};

                //Get team_id, pts, gd, and gf for all teams in every group.
                data.groups.forEach((groupData: any) => {
                    if (groupData && groupData.teams){
                        groupData.teams.forEach((team: any) => {
                            const teamObject = getOwnerByTeam(sweepstake, team.team_id) || undefined;
                            //const teamName = teamObject?.[0] || "No team"; Uncomment if I want to also show team array.
                            const ownerName = teamObject?.[1] || "No Owner";
                            
                            //If this is the first time the loop, create the structure
                            if (!ownerLookup[ownerName]){
                                ownerLookup[ownerName] = {
                                    pts: 0,
                                    gd: 0,
                                    gf: 0,
                                    played: 0
                                };
                            }
                            //Sum pts and goals for each player.
                            ownerLookup[ownerName].pts += Number(team.pts) || 0;
                            ownerLookup[ownerName].gd += Number(team.gd) || 0;
                            ownerLookup[ownerName].gf += Number(team.gf) || 0;
                            ownerLookup[ownerName].played += Number(team.mp) || 0;
                        });
                    };
                });

                const finalLeague = Object.keys(ownerLookup).map(name => ({
                    playerName: name,
                    totalPoints: ownerLookup[name].pts,
                    totalGD: ownerLookup[name].gd,
                    totalGF: ownerLookup[name].gf,
                    totalPlayed: ownerLookup[name].played
                })).sort((a, b) => {
                    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
                    if (b.totalGD !== a.totalGD) return b.totalGD - a.totalGD;
                    return b.totalGF - a.totalGF;
                })

                setLeagueTableData(finalLeague);

            } catch(error){
                console.error("Error generating league table:", error);
            } finally {
                setLoading(false);
            }
        }
        calculateLeagueTable();
    }, [])

    if (loading){
        return (
            <div> Loading league table... </div>
        )
    }

    return (
        <>
        <div>
            <div>
                <LeagueTable table={leagueTableData}/>
            </div> 
        </div>
        
        </>
    )
}

export default League;