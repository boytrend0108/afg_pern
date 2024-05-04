export const getPreparedCards = (
  cards: number[],
  currentWidth: number,
): number[] => {
  switch (true) {
    case currentWidth <= 1024:
      return cards.slice(0, 4);

    case currentWidth <= 1200:
      return cards.slice(0, 3);

    default:
      return cards.slice(0, 4);
  }
};
