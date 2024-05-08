export const normalizeFields = (dto) => {
  for (let [key, value] of Object.entries(dto)) {
    if (typeof dto[key] === 'string') {
      dto[key] = value.trim();
    }
  }

  return dto;
};
