import sweepstake from "../data/sweepstake.json";

interface OwnerProp{
    pts: number; 
    w: number;
    d: number;
    l: number;
    gd: number;
    gf: number; 
    played: number
}

export const ownerLookup: Record<string, OwnerProp> = {};

function initiateOwnerLookup(){
    Object.keys(sweepstake).forEach((owner) => {
        ownerLookup[owner] = {
            pts: 0,
            w: 0,
            d: 0,
            l: 0,
            gd: 0,
            gf: 0,
            played: 0
        };
    });
}

export default initiateOwnerLookup