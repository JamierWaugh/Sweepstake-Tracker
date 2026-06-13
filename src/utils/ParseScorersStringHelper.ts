function parseScorersString(scorersRaw: string): string[]{
    if (!scorersRaw || scorersRaw === "null" || scorersRaw.trim() === "{}") return [];

    
    return scorersRaw
        .replace(/^\{|}$/g,"") //Removes outer curly braces
        .replace(/"/g, "") //Remove all double quotes
        .split(',') //Remove commas
        .map(name=> name.trim()) //Trim any trailing characters
        .filter(name => name.length > 0); //Filter out empty strings
}

export default parseScorersString;