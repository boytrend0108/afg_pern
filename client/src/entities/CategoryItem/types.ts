export type CategoryCreateDTO = {
  name: string;
  image: Blob;
};

export type CategoryType = {
  id: number;
  name: string;
  image: string;
};

export type CategoryDeleteDTO = {
  id: number;
  fileId: string;
};
