export type ProductOptionsType = {
  [key: string]: string | number | string[] | FileList | boolean;
  id: number;
  title: string;
  images: string[] | FileList;
  imagesInter: string[] | FileList;
  brand: string;
  brandId: number;
  category: string;
  categoryId: number;
  price: number;
  year: number;
  hours: number;
  type: string;
  location: string;
  descriptions: string;
  height: number;
  width: number;
  length: number;
  weight: number;
  engineBrand: string;
  engineModel: string;
  capacity: number;
  tracksChain: number;
  tracksPlate: number;
  tracksPlateWidth: number;
  tracksSproket: number;
  datchMachine: boolean;
  quickCoupler: boolean;
  radio: boolean;
  extraHuidraulic: boolean;
  centralGreasing: boolean;
};

export type ProductOptionsBooleanType = {
  datchMachine: boolean;
  quickCoupler: boolean;
  radio: boolean;
  extraHuidraulic: boolean;
  centralGreasing: boolean;
};

export type OptionType = {
  title: keyof ProductOptionsType;
  description: string;
};

export type ProductType = {
  id: number;
  title: string;
  image: string;
  brand: string;
  category: string;
  price: number;
  year: number;
  hours: number;
  product_infos: OptionType[];
};

export type ResponseGetProducts = {
  count: number;
  rows: ProductType[];
};

export type ProductState = {
  product: null | ProductType;
  products: ProductType[];
  loading: boolean;
  error: null | string;
};
