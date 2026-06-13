function getOwnerByTeam(sweepstake: Record<string, {teamId: string, teamName: string}[]>, teamCheck : string) : string[] | undefined {
    /*Search every entry to find the name that corresponds to the searched for team*/
    try {
        for (const [name, teams] of Object.entries(sweepstake)){
            for (const team of teams){
                if (team.teamId == teamCheck){
                    return [team.teamName, name]
                }
            }
        }
    }
    catch {
        return undefined
    }

    return undefined
}


export default getOwnerByTeam