/* eslint-disable new-cap */
import currencyapi from '@everapi/currencyapi-js';

export const client = new currencyapi(import.meta.env.VITE_CURRENCY_API_KEY);
