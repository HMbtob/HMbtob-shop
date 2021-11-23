import { Dispatch, SetStateAction } from 'react';

export interface setCatProps {
  cat: string;
  setCat: Dispatch<SetStateAction<string>>;
}
