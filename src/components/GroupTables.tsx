import {useState, useEffect } from 'react';
import enrichStandings, {type EnrichedStandingRows} from "../utils/EnrichStandingsHelper.tsx";
import "./GroupTables.css";

interface GroupTables{
    group: string,
    sweepstake : Record<string, {teamId: string, teamName: string}[]>
}

function GroupTables({group, sweepstake} : GroupTables){
    //For passed group, get the below info for each team
    //Get group info (contains group name)
    const [enrichedStandings, setEnrichedStandings] = useState<EnrichedStandingRows>();

    //Enrich standings for the whole group
    useEffect(() => {
        async function fetchStandings() {
            const response = await fetch(`https://worldcup26.ir/get/group?name=${group}`);
            const groupStandings = await response.json();
            const enriched = enrichStandings(groupStandings.group, sweepstake);

            if (enriched && enriched.teams){
                enriched.teams.sort((teamA: any, teamB: any) => {
                    //Sort by points
                    if (teamB.pts !== teamA.pts){
                        return teamB.pts - teamA.pts;
                    }

                    //Sort by Goal Difference if points are tied
                    if (teamB.gd !== teamA.gd) {
                        return teamB.gd - teamA.gd;
                    }

                    //If points and goal difference are tied, sort by goals for
                    return teamB.gf - teamA.gf;
                })
            }
            setEnrichedStandings(enriched)
        }
        fetchStandings();
    }, [group])

    if (!enrichedStandings){
        return <p> Loading standings for Group {group}...</p>
    }
    
    
    return (
        <div className="table-container">
        <h3> Group {group}</h3>
        <table className="standings-table">
            <thead>
                <tr>
                    <th> Name </th>
                    <th> Team </th>
                    <th> MP </th>
                    <th> W </th>
                    <th> L </th>
                    <th> D </th>
                    <th> GF </th>
                    <th> GA </th>
                    <th> GD </th>
                    <th className="pts-header"> PTS </th>
                </tr>
            </thead>
            <tbody>
                {enrichedStandings.teams.map(row => (
                    <tr key={row.team_id}>
                        <td data-label="Owner">{row.owner_name}</td>
                        <td data-label="Team">{row.team_name}</td>
                        <td data-label="MP">{row.mp}</td>
                        <td data-label="Won">{row.w}</td>
                        <td data-label="Drawn">{row.d}</td>
                        <td data-label="Lost">{row.l}</td>
                        <td data-label="GF">{row.gf}</td>
                        <td data-label="GA">{row.ga}</td>
                        <td data-label="GD">{row.gd}</td>
                        <td data-label="Points" className="pts-cell">{row.pts}</td>
                    </tr>
                ))}
                
            </tbody>
        </table>
        </div>
    )
}

export default GroupTables