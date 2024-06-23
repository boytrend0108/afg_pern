import * as productItem from '../../entities/ProductItem';
import localStorageService from '../services/localStorageService';

export function getProductsBySearch(
  query: string,
  dispatch: Function,
  searchParams: URLSearchParams,
) {
  if (!query) {
    return;
  }

  let searches = [];

  dispatch(productItem.getAll(searchParams));
  searches = (localStorageService.get('searches') as string[]) || [];

  if (!searches.includes(query)) {
    searches.push(query);
    localStorageService.set('searches', searches);
  }
}
