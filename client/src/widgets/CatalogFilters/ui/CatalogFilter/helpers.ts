export const setQueryParams = (
  key: string,
  value: string,
  search: URLSearchParams,
  setSearchParams: Function,
) => {
  const query = new URLSearchParams(search);

  query.set(key, value);
  setSearchParams(query);
};
