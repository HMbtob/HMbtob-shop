import { db } from '../firebase';
import { WhereFilterOp } from '@firebase/firestore-types';

// Fetching product by date
export async function productsFetch(
  setter: any,
  sign: WhereFilterOp,
  category?: string
): Promise<void> {
  const today = new Date();

  if (category) {
    await db
      .collection('products')
      .where('preOrderDeadline', sign, today)
      .where('exposeToB2b', '==', '노출')
      .where('category', '==', category)
      .limit(5)
      .onSnapshot((snapshot) =>
        setter(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  } else {
    await db
      .collection('products')
      .where('preOrderDeadline', sign, today)
      .where('exposeToB2b', '==', '노출')
      .onSnapshot((snapshot) =>
        setter(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }
}

// Categories for common product
export const categories = [
  { cd: 'cd' },
  { dvdBlueRay: 'dvd/blue-ray' },
  { photoBook: 'photo book' },
  { goods: 'goods/magazine' },
  { officialStore: 'official store' },
  { beauty: 'beauty' }
];

// Time gap for preorder
export function preOrderLimitTime(deadLineSec: number) {
  const today = new Date().getTime();
  const gap = new Date(deadLineSec * 1000).getTime() - today;
  const day = Math.ceil(gap / (1000 * 60 * 60 * 24));
  const hour = Math.ceil((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return { day, hour };
}

// ToLocalString date
export function toDate(timeSec: number) {
  return new Date(timeSec * 1000).toISOString().substring(0, 10);
}

// To locale currency
export function toLocalCurrency(price: number, user: any, exchangeRate: any) {
  if (exchangeRate[user.currency] === 1) {
    return (price / exchangeRate[user.currency])?.toLocaleString('ko-KR');
  } else {
    return (price / exchangeRate[user.currency])?.toFixed(2)?.toLocaleString();
  }
}

// toSalePriceToLocaleCurrency
export function toSalePriceToLocaleCurrency(
  price: number,
  user: any,
  exchangeRate: any,
  category: string
) {
  if (exchangeRate[user.currency] === 1) {
    return (
      (price - price * user.dcRates[category] - user.dcAmount[`${category}A`]) /
      exchangeRate[user.currency]
    ).toLocaleString('ko-KR');
  } else {
    return (
      (price - (price * user.dcRates[category] - user.dcAmount[`${category}A`])) /
      exchangeRate[user.currency]
    )
      .toFixed(2)
      .toLocaleString();
  }
}
