import sweepstake from "../data/sweepstake.json"
import "./SweepstakeMember.css"

interface MemberName {
    name: string
}


function OwnerMember({name}: MemberName){

    const sweepstakeData = sweepstake as Record<string, Array<{ teamId: string; teamName: string}>>;
    const memberTeams = sweepstakeData[name] || [];
    let team1 = memberTeams[0]?.teamName || "TBD";
    let team2 = memberTeams[1]?.teamName || "TBD";
    let team3 = memberTeams[2]?.teamName || "TBD";
    let team4 = memberTeams[3]?.teamName || "TBD";

    return (<>
        <div className="owner-card"> 
            <h2 className="owner-name">
            {name}:
            </h2>
            <ol className="team-list">
                <li className="team-item">
                    <span className="team-slot-badge">1</span> {team1}
                </li>
                <li className="team-item">
                    <span className="team-slot-badge">2</span>{team2}
                </li>
                <li className="team-item">
                    <span className="team-slot-badge">3</span>{team3}
                </li>
                <li className="team-item">
                    <span className="team-slot-badge">4</span>{team4}
                </li>
            </ol>
         </div>
    </>
    )
}

export default OwnerMember