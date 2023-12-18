export const productFilterableFields: string[] = [
  "searchTerm",
  "minPrice",
  "maxPrice",
  "category",
  'productstate',
  "brand",
  "stock"
];

export const productSearchableFields: string[] = ["name", "description"];
export const productRelationalFields: string[] = ["categoryId","brandId"];

export const productRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: "category",
  brandId:"brand"
};
export type IProductFilterRequest = {
  searchTerm?: string | undefined;
  minPrice?: string | undefined;
  stock?:string|undefined;
  maxPrice?: string | undefined;
  category?: string | undefined;
  brand?: string | undefined;
  productstate?:string|undefined;
};
