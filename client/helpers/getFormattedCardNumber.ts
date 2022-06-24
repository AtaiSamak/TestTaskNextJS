const getFormattedCardNumber = (cardNumber: string) => {
    return cardNumber
        .replace(/[^\d]/g, "")
        .replace(/(.{4})(?=\d{1})/g, "$1-")
        .trim();
};

export default getFormattedCardNumber;
