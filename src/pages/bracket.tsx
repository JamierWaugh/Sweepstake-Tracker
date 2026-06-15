import {useEffect, useState} from "react";
import { fetchGameDisplay } from "./games"
import { type CleanedGame } from "../components/Game.tsx"
import MiniGame from "../components/MiniGame.tsx"
import "../components/Bracket.css" //Not taking Bracket.css for now, not functional for the bracket

interface GroupedBracket {
    r32: CleanedGame[];
    r16: CleanedGame[];
    qf: CleanedGame[];
    sf: CleanedGame[];
    finals: CleanedGame[];
}

function Bracket(){

    const [tournamentData, setTournamentData] = useState<GroupedBracket>({
        r32: [], r16: [], qf: [], sf: [], finals: []
    });
    const [loading, setLoading] = useState(true);
    
    //Fetch function on load
    useEffect(() => {
        async function loadBracket(){
            try {
                const cleanGames = await fetchGameDisplay();
                //TODO: Check, do we need to sort?
                cleanGames.sort((a: any, b: any) => {
                    return a.parsedDate.date.getTime() - b.parsedDate.date.getTime();
                });

                const groupedRounds: GroupedBracket = {
                    r32: cleanGames.filter((g: any) => g.group === "R32"),
                    r16: cleanGames.filter((g: any) => g.group === "R16"),
                    qf: cleanGames.filter((g: any) => g.group === "QF"),
                    sf: cleanGames.filter((g: any) => g.group === "SF"),
                    finals: cleanGames.filter((g: any) => g.group === "FINAL" || g.group === "3RD"),
                };

                setTournamentData(groupedRounds);
                setLoading(false);
            } catch (error) {
                console.error("Failed to load bracket:", error);
                setLoading(false);
            }
        }

        loadBracket()
    }, []);

    if (loading) return <div> Loading tournament bracket... </div>


    // These definitions guarantee that parent matches are grouped together
    const LAYOUT_ORDERS = {
        r32: ["74", "77", "73", "75", "83", "84", "81", "82", "76", "78", "79", "80", "86", "88", "85", "87"],
        r16: ["89", "90", "93", "94", "91", "92", "95", "96"],
        qf:  ["97", "98", "99", "100"],
        sf:  ["101", "102"],
        finals: ["104", "103"] // Grand Final on top, Third Place on bottom
    };

    //Helper to rearrange games into static bracket tree slots
    const alignMatchesForTree = (rawGroupMatches: CleanedGame[], orderArray: string[]) => {
        return orderArray
            .map(id => rawGroupMatches.find(game => game.id === id))
            .filter(Boolean) as CleanedGame[] //Fallback on missing data
    }

    const alignedR32 = alignMatchesForTree(tournamentData.r32, LAYOUT_ORDERS.r32);
    const alignedR16 = alignMatchesForTree(tournamentData.r16, LAYOUT_ORDERS.r16);
    const alignedQF = alignMatchesForTree(tournamentData.qf, LAYOUT_ORDERS.qf);
    const alignedSF = alignMatchesForTree(tournamentData.sf, LAYOUT_ORDERS.sf);
    const alignedFinals = alignMatchesForTree(tournamentData.finals, LAYOUT_ORDERS.finals);

    return (
        <div className="page-container">
            <div className="bracket-scroll-area"> 
            <table className="bracket-table"> 
                <thead>
                    <tr>
                        <th> R32 </th>
                        <th> R16 </th>
                        <th> QF </th>
                        <th> SF </th>
                        <th> FINAL </th>
                    </tr>
                </thead>
                <tbody>
                    {alignedR32.map((game, idx) => (
                        <tr key={game.id}>
                            <td>
                                <div className="game-card-wrapper"> 
                                    <MiniGame gameParsed={game}/> 
                                </div>
                            </td>
                            {idx % 2 == 0 && alignedR16[idx / 2] && (
                                <td rowSpan={2}>  
                                    <div className="game-card-wrapper">
                                        <MiniGame gameParsed={alignedR16[idx / 2]} />  
                                    </div>
                                </td>
                            )}
                            {idx % 4 === 0 && alignedQF[idx / 4] && (
                            <td rowSpan={4}>
                                <div className="game-card-wrapper">
                                    <MiniGame gameParsed={alignedQF[idx / 4]} />
                                </div>
                            </td>
                        )}
                        {idx % 8 === 0 && alignedSF[idx / 8] && (
                            <td rowSpan={8}>
                                <div className="game-card-wrapper">
                                    <MiniGame gameParsed={alignedSF[idx / 8]} />
                                </div>
                            </td>
                        )}
                        {idx % 16 === 0 && alignedFinals[idx / 16] && (
                            <td rowSpan={16}>
                                <div className="game-card-wrapper">
                                    <MiniGame gameParsed={alignedFinals[0]}/>
                                    <div></div>
                                    <MiniGame gameParsed={alignedFinals[1]}/>
                                </div>
                            </td>
                        )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
        );
}

export default Bracket;