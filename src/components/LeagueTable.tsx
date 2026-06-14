import "./LeagueTable.css";

export interface PlayerRow {
    playerName: string;
    totalPlayed: number;
    totalW: number;
    totalD: number;
    totalL: number;
    totalGD: number;
    totalGF: number;
    totalPoints: number;
    
}

interface LeagueTableProps {
    table: PlayerRow[]; 
}

function LeagueTable({table} : LeagueTableProps){
    return (
        <div className="league-container">
            <h2 className="league-title"> Sweepstake League </h2>
        <table className="custom-league-table">
            <thead>
                <tr>
                    <th className="col-rank">Pos</th>
                    <th className="col-player">Player</th>
                    <th className="col-stat">PLD</th>
                    <th className="col-stat">W</th>
                    <th className="col-stat">D</th>
                    <th className="col-stat">L</th>
                    <th className="col-stat">GD</th>
                    <th className="col-stat">GF</th>
                    <th className="col-stat col-pts">Pts</th>
                </tr>
            </thead>
            <tbody>
                {table.map((player, index) => {
                    const rankClass = index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : index === table.length - 1 ? "wooden" : "normal";
                    
                    return (
                    <tr key={player.playerName}>
                        <td className="col-rank"><span className={`rank-medallion ${rankClass}`}>
                            {index+1}
                            </span>
                        </td>
                        <td className="col-player text-left">{player.playerName}</td>
                        <td className="col-stat numeric-data">{player.totalPlayed}</td>
                        <td className="col-stat numeric-data">{player.totalW}</td>
                        <td className="col-stat numeric-data">{player.totalD}</td>
                        <td className="col-stat numeric-data">{player.totalL}</td>
                        <td className="col-stat numeric-data">{player.totalGD}</td>
                        <td className="col-stat numeric-data">{player.totalGF}</td>
                        <td className="col-stat col-pts total-pts-cell">{player.totalPoints}</td>
                    </tr>
            )})}
            </tbody>
        </table>
        </div>
    )
}

export default LeagueTable;