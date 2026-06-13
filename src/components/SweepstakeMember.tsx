import sweepstake from "../data/sweepstake.json"
import "./SweepstakeMember.css"

interface MemberName {
    name: string
}


function OwnerMember({name}: MemberName){

    const sweepstakeData = sweepstake as Record<string, Array<{ teamId: string; teamName: string}>>;
    const memberTeams = sweepstakeData[name] || [];

    return (<>
        <div className="owner-card"> 
            <h2 className="owner-name">
            {name}:
            </h2>
            {memberTeams.length > 0 ? (
                <ol className="team-list">
                    {memberTeams.map((team, index) => (
                        <li className="team-item" key={team.teamId || index}>
                            <span className="team-slot-badge">{index+1}</span>
                            {team.teamName}
                        </li>
                    ))}
                </ol>
            ) : (
                <p> No teams assigned</p>
            )}
         </div>
    </>
    )
}

export default OwnerMember