import { ProductOptionsBooleanType, ProductOptionsType } from './types';

export const PRODUCT_OPTIONS: (keyof ProductOptionsType)[] = [
  'title',
  'price',
  'year',
  'hours',
  'type',
  'location',
  'certificate',
  'serialNumber',
  'descriptions',
  'height',
  'width',
  'length',
  'weight',
  'engineBrand',
  'engineModel',
  'capacity',
  'tracksChain',
  'tracksPlate',
  'tracksSprocket',
  'tracksPlateWidth',
];

export const PRODUCT_OPTIONS_BOOLEAN: (keyof ProductOptionsBooleanType)[] = [
  'quickCoupler',
  'radio',
  'extraHuidraulic',
  'centralGreasing',
  'hammerFunction',
];
