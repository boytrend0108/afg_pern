export const getSearchParams = (
  key: string,
  value: string | null,
  params: URLSearchParams,
) => {
  const newParams = new URLSearchParams(params);

  if (!value) {
    newParams.delete(key);
  } else {
    newParams.set(key, value);
  }

  return newParams.toString();
};
