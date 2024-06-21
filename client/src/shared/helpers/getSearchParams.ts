export const getSearchParams = (
  key: string,
  value: string | null,
  params: URLSearchParams,
) => {
  const newParams = new URLSearchParams(params);

  if (key === 'show') {
    newParams.delete('page');
  }

  if (!value) {
    newParams.delete(key);
  } else {
    newParams.set(key, value);
  }

  return newParams.toString();
};
