import { Dispatch, SetStateAction } from 'react';

export interface SetCategoryTypes {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

export interface ProductsTypes {
  preOrderProducts: Array<object>;
  commonProducts: Array<object>;
}
