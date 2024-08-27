/* eslint-disable no-undef */
import { toggleFavorite } from './toogleFavorite';
// import { getFavorite } from '../api';

describe('toogleFavorite', () => {
  const USER_ID = 36;
  const PRODUCT_ID = '100';

  const args = {
    productId: PRODUCT_ID,
    userId: USER_ID,
    setIsFavorite: () => {
      return false;
    },
  };

  it('should be a function', () => {
    expect(typeof toggleFavorite).toBe('function');
  });

  it('should add favorite to localstorage', () => {
    toggleFavorite(args);

    const favorite = JSON.parse(localStorage.getItem('favorite') || '');

    expect(favorite[0]).toBe(PRODUCT_ID);
  });

  it('should add favorite to database', async () => {
    // NOT IMPLEMENT
  });

  it('should remove favorite from database', async () => {
    // NOT IMPLEMENT
  });

  it('should delete favorite from localstorage', () => {
    toggleFavorite(args);

    const favorite = JSON.parse(localStorage.getItem('favorite') || '');

    expect(favorite).toHaveLength(0);
  });
});
