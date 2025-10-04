export type Dessert = {
  images: {
    desktop: string,
    mobile: string,
    thumbnail: string
  }
  price: number,
  name: string,
  category: string,
  _id: number
}


export interface dessertCategories {
  name: string;
  category: string;
  [key: string]: any;
}