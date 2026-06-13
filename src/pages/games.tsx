import Game, { type CleanedGame } from "../components/Game.tsx"
import {useState, useEffect } from 'react';

async function fetchGameDisplay(){
    const [gameResponse, stadiumResponse] = await Promise.all([
        fetch("https://worldcup26.ir/get/games"),
        fetch("https://worldcup26.ir/get/stadiums")
    ]);
    const gameData = await gameResponse.json();
    const stadiumData = await stadiumResponse.json();

    //Look up stadium data
    const stadiumLookup: Record<string, {name: string; region: string}> = {};
    stadiumData.stadiums.forEach((stadium: any) => {
        stadiumLookup[stadium.id] = {
            name: stadium.name_en,
            region: stadium.region
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
            homeTeamName: game.home_team_name_en,
            awayTeamName: game.away_team_name_en,
            homeScorers: game.home_scorers,
            awayScorers: game.away_scorers,
            stadiumName: stadiumLookup[game.stadium_id].name || "Unknown Stadium",
            stadiumRegion: stadiumLookup[game.stadium_id].region,
            group: game.group,
            localDate: game.local_date 
        }));
        const recent = cleanGames
            .filter((game: any) => game.isFinished)
            .reverse()
            .slice(0,2)
            .reverse();
        const upcoming = cleanGames
            .filter((game: any) => !game.isFinished)
            .slice(0,5);
        
        const combinedTimeLine = [...recent, ...upcoming]; //... is a spread operation to unpack an array or object

    return combinedTimeLine;
}

function Games(){
    // Creates state container, starting as an empty array
    const [games, setGames] = useState<CleanedGame[]>([]);
    const [loading, setLoading] = useState(true);

    //Use useEffect to run the fetch function during load
    useEffect(() => {
        async function loadData(){
            try {
                const nextFive = await fetchGameDisplay();
                setGames(nextFive);
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