import getOwnerByTeam from "./GetOwnerByTeamHelper.tsx"

interface StandingRow{
    team_id: string,
    mp: string,
    w: string,
    l: string,
    d: string,
    pts: string,
    gf: string,
    ga: string,
    gd: string,
    _id: string
}

interface StandingRows{
    teams: StandingRow[]
}

export interface EnrichedStandingRow{
    team_id: string,
    mp: string,
    w: string,
    l: string,
    d: string,
    pts: string,
    gf: string,
    ga: string,
    gd: string,
    _id: string,
    team_name: string,
    owner_name: string
}

export interface EnrichedStandingRows{
    teams: EnrichedStandingRow[]
}

function enrichStandings(standings: StandingRows, sweepstake: Record<string, {teamId: string, teamName: string}[]>) : EnrichedStandingRows{

    //implement enrich to make the standings enriched
    return{
        teams: standings.teams.map(row => {
        const teamDetails = getOwnerByTeam(sweepstake, row.team_id);
        const team_name = teamDetails ? teamDetails[0] : "Unknown Team";
        const owner_name = teamDetails ? teamDetails[1] : "No Owner";
        
        const enrichedRow: EnrichedStandingRow = {
            ...row,
            team_name,
            owner_name
        };

        return enrichedRow
        })
    }
}

export default enrichStandings;