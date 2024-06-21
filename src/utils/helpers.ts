export const extractValuesBetween = (
  array: string[],
  startMarker: string,
  endMarker: string
) => {
  const startIndex = array.indexOf(startMarker) + 1;
  const endIndex = array.findIndex((item) => item.includes(endMarker));
  if (startIndex === 0 || endIndex === -1 || startIndex >= endIndex) {
    return [];
  }
  return array.slice(startIndex, endIndex);
};

export const parseItemString = (item: string) => {
  const parts = item.split(' ');
  return {
    quantity: parseInt(parts[0]),
    name: parts.slice(1, -2).join(' '),
    unit_price: parseFloat(parts[parts.length - 2]),
    total_value: parseFloat(parts[parts.length - 1]),
  };
};
