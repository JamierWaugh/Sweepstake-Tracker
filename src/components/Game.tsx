import parseScorersString from "../utils/ParseScorersStringHelper"
import "./Game.css"; 

export interface CleanedGame{
    id: string,
    isFinished: boolean,
    timeElapsed: string,
    homeScore: string,
    awayScore: string,
    homeTeamId: string,
    awayTeamId: string,
    homeTeamName: string,
    awayTeamName: string,
    homeScorers: string,
    awayScorers: string,
    stadiumName: string,
    stadiumRegion: string,
    stadiumCity: string,
    group: string,
    parsedDate: {date: Date, display:string},
    homeTeamOwner: string,
    awayTeamOwner: string,
    isLive: boolean
}



interface GameProps {
    gameParsed: CleanedGame;
}

function Game({gameParsed}: GameProps){
    //Parse raw strings into arrays of clean lines
    const homeScorersList = parseScorersString(gameParsed.homeScorers);
    const awayScorersList = parseScorersString(gameParsed.awayScorers);
    const hasScorers = homeScorersList.length > 0 || awayScorersList.length > 0;

    return (
        <li className="card">
        <div className="header">
            <span className="group-badge"> {gameParsed.group}</span>
            <span className="date-text"> {gameParsed.parsedDate.display}</span>
        </div>

        <div className="scoreboard">
            {/* Home Team */}
            <div className="team-cluster-left">
                <span className="owner-text"> {gameParsed.homeTeamOwner}</span>
                <span className="team-name"> {gameParsed.homeTeamName} </span>
            </div>

            {/* Match Status */}
            <div className="center-section"> 
                <span className="score"> {gameParsed.homeScore} </span>
                <div className="status-wrapper">
                {gameParsed.isLive ? (
                    <span className="live-badge"> LIVE </span>
                ) : gameParsed.isFinished === true ? (
                    <span className="ft-badge"> FT </span>
                ) : (
                <span className="vs-badge"> VS </span>) 
                }
                </div>
                <span className="score"> {gameParsed.awayScore} </span>
            </div>

            {/*Away Team */}
            <div className="team-cluster-right">
                <span className="owner-text">  {gameParsed.awayTeamOwner} </span>
                <span className="team-name"> {gameParsed.awayTeamName} </span>
            </div>  
        </div>

        <div className="stadium-footer">
            {gameParsed.stadiumName}, {gameParsed.stadiumCity}
        </div>

        {/* Goalscorer strings */}
        {hasScorers && (
            <div className="scorers-section">
                <div className="scorers-left">
                    {homeScorersList.map((scorer,idx) => (
                        <div key={idx} className="scorer-line"> {scorer} </div>
                    ))}
                </div>
                <div className="scorers-right"> 
                    {awayScorersList.map((scorer, idx) => (
                    <div key={idx} className="scorer-line"> {scorer} </div> 
                    ))}
                </div>
            </div>
        )}
        </li>
    )
}

export default Game;