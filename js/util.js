function formatTitleMessage(itemName, number) {
    let numberText = (number === 0) ? "no" : number;
    let be = "was";
    if (number !== 1) {
        itemName = itemName + "s";
        be = "were";
    }
    return `${numberText} ${itemName} ${be} found`;
}

export {
    formatTitleMessage,
};