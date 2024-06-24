export type CategoryCreateDTO = {
  name: string;
  image: Blob;
};

export type CategoryType = {
  id: number;
  name: string;
  image: string;
  productCount: string;
};

export type CategoryDeleteDTO = {
  id: number;
  fileId: string;
};
