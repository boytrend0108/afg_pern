import { ProductOptionsBooleanType, ProductOptionsType } from './types';

export const PRODUCT_OPTIONS: (keyof ProductOptionsType)[] = [
  'title',
  'price',
  'year',
  'hours',
  'type',
  'location',
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
  'tracksPlateWidth',
];

export const PRODUCT_OPTIONS_BOOLEAN: (keyof ProductOptionsBooleanType)[] = [
  'datchMachine',
  'quickCoupler',
  'radio',
  'extraHuidraulic',
  'centralGreasing',
];
