export interface ProductModel {
  id: string;
  logo: string;
  name: string;
  description: string;
  date_release: string;
  date_revision: string;
}

export interface FilterProductModel {
  filter: string,
  pageSize: number,
  page: number
}

export interface ProductPage {
  items: ProductModel[],
  total: number,
}

