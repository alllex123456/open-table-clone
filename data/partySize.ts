export const partySize = () => {
  const partySizeArray = [];

  for (let i = 1; i <= 10; i++) {
    if (i === 1) {
      const obj = { value: i, label: i + ' person' };
      partySizeArray.push(obj);
    } else {
      const obj = { value: i, label: i + ' people' };
      partySizeArray.push(obj);
    }
  }
  return partySizeArray;
};
