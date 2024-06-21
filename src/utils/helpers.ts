export const extractValuesBetween = (
  array: string[],
  startMarker: string,
  endMarker: string
) => {
  const startIndex = array.indexOf(startMarker) + 1;
  const endIndex = array.indexOf(endMarker);
  if (startIndex === 0 || endIndex === -1 || startIndex >= endIndex) {
    return [];
  }
  return array.slice(startIndex, endIndex);
};

export const parseItemString = (item: string) => {
  const parts = item.split(' ');
  return {
    quantidade: parseInt(parts[0]),
    nome: parts.slice(1, -2).join(' '),
    preco_unidade: parseFloat(parts[parts.length - 2]),
    valor: parseFloat(parts[parts.length - 1]),
  };
};
