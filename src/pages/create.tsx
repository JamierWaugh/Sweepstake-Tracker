import {useState} from "react";

interface TeamData {
    teamId: string;
    teamName: string
}

type OwnerList = {
    [key:string] : TeamData[]
}


const WORLD_CUP_2026_TEAMS: TeamData[] = [
  { teamId: "38", teamName: "Algeria" },  { teamId: "37", teamName: "Argentina" },
  { teamId: "15", teamName: "Australia" },  { teamId: "39", teamName: "Austria" },
  { teamId: "25", teamName: "Belgium" },  { teamId: "6",  teamName: "Bosnia and Herzegovina" },
  { teamId: "9",  teamName: "Brazil" },  { teamId: "5",  teamName: "Canada" },
  { teamId: "30", teamName: "Cape Verde" },  { teamId: "44", teamName: "Colombia" },
  { teamId: "46", teamName: "Croatia" },  { teamId: "18", teamName: "Curaçao" },
  { teamId: "4",  teamName: "Czech Republic" },  { teamId: "42", teamName: "Democratic Republic of the Congo" },
  { teamId: "20", teamName: "Ecuador" },  { teamId: "26", teamName: "Egypt" },
  { teamId: "45", teamName: "England" },  { teamId: "33", teamName: "France" },
  { teamId: "17", teamName: "Germany" },  { teamId: "47", teamName: "Ghana" },
  { teamId: "11", teamName: "Haiti" },  { teamId: "27", teamName: "Iran" },
  { teamId: "35", teamName: "Iraq" },  { teamId: "19", teamName: "Ivory Coast" },
  { teamId: "22", teamName: "Japan" },  { teamId: "40", teamName: "Jordan" },
  { teamId: "1",  teamName: "Mexico" },  { teamId: "10", teamName: "Morocco" },
  { teamId: "21", teamName: "Netherlands" },  { teamId: "28", teamName: "New Zealand" },
  { teamId: "36", teamName: "Norway" },  { teamId: "48", teamName: "Panama" },
  { teamId: "14", teamName: "Paraguay" },  { teamId: "41", teamName: "Portugal" },
  { teamId: "7",  teamName: "Qatar" },  { teamId: "31", teamName: "Saudi Arabia" },
  { teamId: "12", teamName: "Scotland" },  { teamId: "34", teamName: "Senegal" },
  { teamId: "2",  teamName: "South Africa" },  { teamId: "3",  teamName: "South Korea" },
  { teamId: "29", teamName: "Spain" },  { teamId: "23", teamName: "Sweden" },
  { teamId: "8",  teamName: "Switzerland" },  { teamId: "24", teamName: "Tunisia" },
  { teamId: "16", teamName: "Turkey" },  { teamId: "13", teamName: "United States" },
  { teamId: "32", teamName: "Uruguay" },  { teamId: "43", teamName: "Uzbekistan" }
];


function Create(){
    //Track what user is currently typing
    const [currentInput, setCurrentInput] = useState<string>("");

    //Track saved players
    const [playerList, setPlayerList] = useState<string[]>([]);

    //Track remaining selections 
    const [selections, setSelections] = useState<OwnerList>({}); //How to default?

    //Create list of all teams without already chosen teams
    const allSelectedIds = Object.values(selections).flat();
    console.log(allSelectedIds);
    const REMAINING_TEAMS : TeamData[] = WORLD_CUP_2026_TEAMS.filter(team => !allSelectedIds.includes(team))

    //Track email input
    const [currentEmail, setCurrentEmail] = useState<string>("");


    const handleAddPlayer = (e: React.SubmitEvent) => {
        //Add player to list
        //Prevent default used to stop submission on refresh
        e.preventDefault();

        //Front end sanitisation
        const cleanedName = (rawInput : string): string => {
            return rawInput.replace(/[^a-zA-Z0-9 ]/g, "");
        }

        const trimmedName = cleanedName(currentInput).trim();


        //Dont add empty names, duplicates or if there is already 24 players
        if (trimmedName && !playerList.includes(trimmedName) && playerList.length < 24){
            setPlayerList([...playerList, trimmedName]);
            //Initiate trimmedName into selections
            setSelections({...selections, [trimmedName] : []});
            setCurrentInput("");
        }
    }

    const handleRemovePlayer = (nameToRemove: string) => {
        //Remove player from list
        setPlayerList(playerList.filter(player => player !== nameToRemove));
        const { [nameToRemove]: _, ...rest} = selections;
        setSelections((rest));
    };

    const handleAddSelection = (player: string, teamToAdd: string) => {
        //Add selection to player
        console.log(teamToAdd)
        const teamData : TeamData = WORLD_CUP_2026_TEAMS.find(team => teamToAdd === team.teamId)
        if (!teamData){
            return;
        }
        setSelections({...selections, [player] : [...selections[player], teamData]})
    }

    const handleRemoveSelection = (player: string, teamId: string) => {
        //Remove selection from player
        setSelections(
            {...selections, [player]: selections[player].filter(team => team.teamId !== teamId)
            }
        );
    }

    const handleSubmitSelection = (e: React.SubmitEvent) => {
        //Submit selections to db
        e.preventDefault();
        //TO DO: Check if email already exists within db
        if (playerList.length < 2){
            //Flash error
            console.warn("Error: Need two players at least");
            return;
        }
        //TO DO: Ensure email is an email
        if (currentEmail == ""){
            //Flash error
            console.warn("Error: must be an email");
            return;
        }

        //Convert into json with a parse
        const selectionJSON = JSON.stringify(selections);
        console.log(selectionJSON);

        setCurrentInput("");
        setCurrentEmail("");
        setPlayerList([]);
        setSelections({});

        //TO DO, implement email auth?, pass JSON to backend, clean json (ensure no dangerous characters), input json into db with email attached.
        
    }

    return (
        <div>
            <div>
            <h1>Input your sweepstake here</h1>
            <h2> Enter Sweepstake Players </h2>
            <form onSubmit={handleAddPlayer}> 
                <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Enter player name"
                />
                <button
                type="submit"
                >Add
                </button>
            </form>
            {playerList.map(player => (
                <li
                key={player} 
                >
                <div style={{display:"flex"}}>
                <span>{player}</span>
                <button onClick={() => handleRemovePlayer(player)}
                >Remove</button>
                {(selections[player] ?? []).map(team => (
                <div key={team.teamId}>
                    <span>{team.teamName}
                    <button onClick={() => handleRemoveSelection(player, team.teamId)}
                    >Remove</button>
                    </span>
                </div>
                ))}
                
                <select multiple onChange={(e) => handleAddSelection(player, e.target.value)}>
                    {REMAINING_TEAMS.map(team => (
                        <option key= {team.teamId} value={team.teamId}>{team.teamName}</option>
                    ))}
                </select>
                </div>
                </li>
            ))}

            </div>
            <div>
            <span>Enter email for sweepstake</span>
            <form onSubmit={handleSubmitSelection}>
                <input 
                type="text"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                placeholder="Enter your email"
                ></input>
                <button
                type="submit"
            >Submit Sweepstake</button>
            <span><br/>Warning, You have still not assigned the following teams: <br/>
            {REMAINING_TEAMS.map(team => (
                team.teamName
            )).join(", ")}</span>
            </form>
            </div>
        </div>
    )
}

export default Create;