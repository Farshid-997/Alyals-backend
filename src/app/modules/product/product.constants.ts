export const productFilterableFields: string[] = [
  "searchTerm",
  "minPrice",
  "maxPrice",
  "category",
  'productstate',
  "bramd"
];

export const productSearchableFields: string[] = ["name", "description"];
export const productRelationalFields: string[] = ["categoryId","brandId"];

export const productRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: "category",
  brandId:"brand"
};
export type IProductFilterRequest = {
  searchTerm?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  category?: string | undefined;
  brand?: string | undefined;
  productstate?:string|undefined;
};
