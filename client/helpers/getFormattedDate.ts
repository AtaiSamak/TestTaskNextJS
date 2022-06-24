const getFormattedDate = (date: string) => {
    if (date.length === 3 && date[2] !== "/") {
        return date.slice(0, 2) + "/" + date[date.length - 1];
    } else if (date.length === 3 && date[2] === "/") {
        return date.slice(0, 2);
    }
    return date;
};

export default getFormattedDate;
