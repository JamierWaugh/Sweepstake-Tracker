import sweepstake from "../data/sweepstake.json"
import "./SweepstakeMember.css"

interface MemberName {
    name: string
}


function FamilyMember({name}: MemberName){

    let team1 = sweepstake[name][0].teamName;
    let team2 = sweepstake[name][1].teamName;
    let team3 = sweepstake[name][2].teamName;
    let team4 = sweepstake[name][3].teamName;

    return (<>
        <div className="family-card"> 
            <h2 className="family-name">
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

export default FamilyMember