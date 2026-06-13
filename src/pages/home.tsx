import OwnerMember from '../components/SweepstakeMember.tsx';
import sweepstake from "../data/sweepstake.json";
function Home(){

    const ownerNames = Object.keys(sweepstake);
    return (
        <>
        <div className="dashboard-container">
            <div className="members-grid">
                {ownerNames.map((ownerName) => (
                    <OwnerMember key={ownerName}
                    name={ownerName} 
                    />
                ))}
            </div>
        </div>
        </>
    )
}

export default Home;