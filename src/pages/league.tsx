import { useEffect, useState } from "react";
import sweepstake from "../data/sweepstake.json";
import LeagueTable, {type PlayerRow} from "../components/LeagueTable.tsx";
import getOwnerByTeam from "../utils/GetOwnerByTeamHelper";
import updateOwnerLookup from "../utils/UpdateOwnerLookupHelper";
import initiateOwnerLookup, {ownerLookup} from "../utils/InitiateOwnerLookupHelper";
import fetchWithRetry from "../utils/FetchWithRetryHelper";

function League(){
    const [leagueTableData, setLeagueTableData] = useState<PlayerRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function calculateLeagueTable() {
            try {
                const data = await fetchWithRetry<any>(`https://worldcup26.ir/get/games`);

                initiateOwnerLookup();
                
                data.games.forEach((gameData: any) => {
                    if (gameData && gameData.time_elapsed){
                        if(gameData.time_elapsed !== "notstarted"){
                            const ownerNameHome = getOwnerByTeam(sweepstake, gameData.home_team_id)?.[1] ?? "No Owner";
                            const ownerNameAway = getOwnerByTeam(sweepstake, gameData.away_team_id)?.[1] ?? "No Owner";
                            if (ownerNameHome != "No Owner" && ownerNameAway !== "No Owner"){
                                updateOwnerLookup(gameData, ownerNameHome, ownerNameAway);
                            }
                        };
                }});

                const finalLeague = Object.keys(ownerLookup).map(name => ({
                    playerName: name,
                    totalPoints: ownerLookup[name].pts,
                    totalW: ownerLookup[name].w,
                    totalD: ownerLookup[name].d,
                    totalL: ownerLookup[name].l,
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