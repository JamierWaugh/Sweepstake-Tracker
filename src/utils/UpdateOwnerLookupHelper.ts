import {ownerLookup} from "./InitiateOwnerLookupHelper";


function updateOwnerLookup(gameData: any, homeOwnerName: string, awayOwnerName: string)
{
    //Calculate points gained from result
    let homeScore: number = Number(gameData?.home_score || 0);
    let awayScore: number = Number(gameData?.away_score || 0);


    let homeGD : number = homeScore - awayScore;
    let awayGD : number = homeGD * -1;
    if (homeGD > 0){
        ownerLookup[homeOwnerName].pts += 3;
        ownerLookup[homeOwnerName].w += 1;
        ownerLookup[awayOwnerName].l += 1;
    }
    if (homeGD === 0){
        ownerLookup[homeOwnerName].pts += 1;
        ownerLookup[awayOwnerName].pts += 1;
        ownerLookup[homeOwnerName].d += 1;
        ownerLookup[awayOwnerName].d += 1;
    }
    if (homeGD < 0) {
        ownerLookup[awayOwnerName].pts += 3;
        ownerLookup[awayOwnerName].w += 1;
        ownerLookup[homeOwnerName].l += 1;
    }

    //Additional values for home
    ownerLookup[homeOwnerName].played += 1;
    ownerLookup[homeOwnerName].gd += homeGD;
    ownerLookup[homeOwnerName].gf += homeScore

    //Additional values for away
    ownerLookup[awayOwnerName].played += 1;
    ownerLookup[awayOwnerName].gd += awayGD;
    ownerLookup[awayOwnerName].gf += awayScore
};


export default updateOwnerLookup;