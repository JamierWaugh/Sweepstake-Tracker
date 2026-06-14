import Game, { type CleanedGame } from "../components/Game.tsx"
import {useState, useEffect } from 'react';
import parseLocalDateToUKDate from "../utils/ParseLocalToUKHelper"
import sweepstake from "../data/sweepstake.json";
import getOwnerByTeam from "../utils/GetOwnerByTeamHelper"

export async function fetchGameDisplay(){
    const [gameResponse, stadiumResponse] = await Promise.all([
        fetch("https://worldcup26.ir/get/games"),
        fetch("https://worldcup26.ir/get/stadiums")
    ]);
    const gameData = await gameResponse.json();
    const stadiumData = await stadiumResponse.json();

    //Look up stadium data
    const stadiumLookup: Record<string, {name: string; region: string, city: string}> = {};
    stadiumData.stadiums.forEach((stadium: any) => {
        stadiumLookup[stadium.id] = {
            name: stadium.name_en,
            region: stadium.region,
            city: stadium.city_en
        };
    })

    const cleanGames = gameData.games
        .map((game: any) => ({
            id: game.id,
            isFinished: game.finished === "TRUE",
            timeElapsed: game.time_elapsed,
            homeScore: game.home_score,
            awayScore: game.away_score,
            homeTeamId: game.home_team_id,
            awayTeamId: game.away_team_id,
            homeTeamName: game.home_team_name_en || game.home_team_label || "Unknown Team",
            awayTeamName: game.away_team_name_en || game.away_team_label || "Unknown Team",
            homeScorers: game.home_scorers,
            awayScorers: game.away_scorers,
            stadiumName: stadiumLookup[game.stadium_id].name || "Unknown Stadium",
            stadiumRegion: stadiumLookup[game.stadium_id].region,
            stadiumCity: stadiumLookup[game.stadium_id].city,
            group: game.group,
            parsedDate: parseLocalDateToUKDate(stadiumLookup[game.stadium_id].region, game.local_date),
            homeTeamOwner: getOwnerByTeam(sweepstake, game.home_team_id)?.[1] || "No Owner",
            awayTeamOwner: getOwnerByTeam(sweepstake, game.away_team_id)?.[1] || "No Owner",
            isLive: game.time_elapsed !== "notstarted" && game.time_elapsed !== "finished"
        }))
    return cleanGames;
}

function Games(){
    // Creates state container, starting as an empty array
    const [games, setGames] = useState<CleanedGame[]>([]);
    const [loading, setLoading] = useState(true);

    //Use useEffect to run the fetch function during load
    useEffect(() => {
        async function loadData(){
            try {
                const cleanGames = await fetchGameDisplay();
                cleanGames.sort((a: any, b: any) => {
                    return a.parsedDate.date.getTime() - b.parsedDate.date.getTime();
                })
                const recent = cleanGames
                    .filter((game: any) => game.isFinished)
                    .reverse()
                    .slice(0,4)
                    .reverse();
                let upcoming = cleanGames
                    .filter((game: any) => !game.isFinished)
                if (upcoming.length < 8 ){
                    upcoming = upcoming.slice(0,upcoming.length);
                } else{
                    upcoming = upcoming.slice(0,8);
                }

            const nextGames = [...recent, ...upcoming]; //... is a spread operation to unpack an array or object
                
            setGames(nextGames);
            } catch (error){
                console.error("Error loading matches:", error);
            } finally {
                setLoading(false);
            }
        }
        
        loadData();
    }, []); //Empty array at end ensures it only runs once on load

    if (loading){
        return <div>Loading upcoming matches...</div>;
    }

    return (
        <>
        {/* Search until find most recent unfinished game
        Display teams, scores, goalscorers, kickoff, time elapsed, owner names
        */}
        <div>
            <h2> Upcoming Matches </h2>
            <ul>
                {games.map((game) => (
                    <Game key={game.id} gameParsed={game}/>))}
            </ul>
        </div>
        </>
    )
}

export default Games;