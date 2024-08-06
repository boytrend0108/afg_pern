export type ProductOptionsType = {
  [key: string]: string | number | string[] | FileList | boolean;
  id: number;
  promoType: 'new' | 'used' | 'recomended';
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
  certificate: string;
  serialNumber: string;
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
  tracksSprocket: number;
  quickCoupler: boolean;
  radio: boolean;
  extraHuidraulic: boolean;
  centralGreasing: boolean;
  hammerFunction: boolean;
};

export type ProductOptionsBooleanType = {
  quickCoupler: boolean;
  radio: boolean;
  extraHuidraulic: boolean;
  centralGreasing: boolean;
  hammerFunction: boolean;
};

export type OptionType = {
  title: keyof ProductOptionsType;
  description: string | boolean | number;
};

export type ProductType = {
  id: number;
  title: string;
  image: string;
  brand: string;
  brandId: number;
  category: string;
  categoryId: number;
  price: number;
  year: number;
  hours: number;
  product_infos: OptionType[];
  product_images: string[];
  product_image_inters: string[];
};

export type ResponseGetProducts = {
  count: number;
  products: ProductType[];
};

export type ProductState = {
  product: null | ProductType;
  products: ProductType[];
  compare: ProductType[];
  favorite: (string | number)[];
  booked: ProductType | null;
  count: number;
  page: number;
  limit: number;
  loading: boolean;
  error: null | string;
};

export type PromoType = 'New' | 'Recommended' | 'Top';

export type DTOBookProduct = {
  address: string;
  city: string;
  company: string;
  country: string;
  email: string;
  name: string;
  phone: number | null;
  productId: number;
  userId: number | null;
};

export type DTOSendRequest = Omit<DTOBookProduct, 'productId' | 'userId'>;

export type BookProductResponse = {
  result: string;
  message: string;
};
