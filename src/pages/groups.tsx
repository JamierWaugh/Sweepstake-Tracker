import GroupTables from '../components/GroupTables.tsx'
import sweepstakeData from '../data/sweepstake.json'

type SweepstakeType = Record<string, { teamId: string; teamName: string }[]>;
function Groups(){
    return (
        <>
        <GroupTables group="A" sweepstake={(sweepstakeData as unknown) as SweepstakeType}/>
        <GroupTables group="C" sweepstake={(sweepstakeData as unknown) as SweepstakeType}/>
        <GroupTables group="D" sweepstake={(sweepstakeData as unknown) as SweepstakeType}/>
        <GroupTables group="B" sweepstake={(sweepstakeData as unknown) as SweepstakeType}/>
        <GroupTables group="E" sweepstake={(sweepstakeData as unknown) as SweepstakeType}/>
        <GroupTables group="F" sweepstake={(sweepstakeData as unknown) as SweepstakeType}/>
        <GroupTables group="G" sweepstake={(sweepstakeData as unknown) as SweepstakeType}/>
        <GroupTables group="H" sweepstake={(sweepstakeData as unknown) as SweepstakeType}/>
        <GroupTables group="I" sweepstake={(sweepstakeData as unknown) as SweepstakeType}/>
        <GroupTables group="J" sweepstake={(sweepstakeData as unknown) as SweepstakeType}/>
        <GroupTables group="K" sweepstake={(sweepstakeData as unknown) as SweepstakeType}/>
        <GroupTables group="L" sweepstake={(sweepstakeData as unknown) as SweepstakeType}/>
        </>
    )
}

export default Groups;