import { client } from '../configs/currencyConfig.js';
import { AppDispatch } from '../configs/storeConfig.js';
import * as currencyAction from '../store/currencyReducer.js';

export const getCurrencyRate = (dispatch: AppDispatch) => {
  client
    .latest({
      base_currency: 'USD',
      currencies: 'EUR,GBP',
    })
    .then((response: any) => {
      dispatch(currencyAction.setRates(response));
    });
};
