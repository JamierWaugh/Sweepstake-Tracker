import "./MiniGame.css";
import {type GameProps} from "./Game.tsx";

function MiniGame({gameParsed} : GameProps){
    return (
        <div className="mini-card-box">
            <div className="mini-header">
                <span className="group-badge"> {gameParsed.group} </span>
                <span className="date-text"> {gameParsed.parsedDate.display} </span>
            </div>

            <div className="scoreboard"> 
                <div className="team-cluster-left">
                    <span className="owner-text"> {gameParsed.homeTeamOwner} </span>
                    <span className="team-name"> {gameParsed.homeTeamName} </span>
                </div>

                <div className="center-section">
                    <span className="score-left"> {gameParsed.homeScore}</span>
                    <div className="status-wrapper">
                    {gameParsed.isLive ? (
                        <span className="live-badge"> LIVE </span>
                    ) : gameParsed.isFinished === true ? (
                        <span className="ft-badge"> FT </span>
                    ) : (
                    <span className="vs-badge"> VS </span>) 
                    }
                    </div>
                    <span className="score-right"> {gameParsed.awayScore} </span>
                </div>

                <div className="team-cluster-right">
                    <span className="owner-text">  {gameParsed.awayTeamOwner} </span>
                    <span className="team-name"> {gameParsed.awayTeamName} </span>
                </div> 
            </div>
        </div>
    )
}

export default MiniGame;