function parseLocalToUKDate(region: string ,dateStr: string) : string{
    if (!dateStr) return "TBD";
    try {
        const [datePart, timePart] = dateStr.split(" ");
        if (!datePart || !timePart) return dateStr;

        const [month, day, year] = datePart.split("/");
        const [hours, minutes] = timePart.split(":");
        const matchDate = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(hours),
            Number(minutes)
        )

        let hoursToAdd = 5; //Default fallback to Eastern Time (+5)
        if (region === "Central"){
            hoursToAdd = 6; //Central time +6
        } else if (region === "Western"){
            hoursToAdd = 8; //Western time +8
        }

        matchDate.setHours(matchDate.getHours() + hoursToAdd);

        return new Intl.DateTimeFormat("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
        }).format(matchDate)
    } catch (error){
        console.error("Failed converting time to UK format:", error);
        return dateStr;
    }
}

export default parseLocalToUKDate;