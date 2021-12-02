import { db } from '../firebase';
import { WhereFilterOp } from '@firebase/firestore-types';

// Fetching product by date
export function productsFetch(setter: any, sign: WhereFilterOp, category?: string): void {
  const today = new Date();

  if (category) {
    db.collection('products')
      .where('preOrderDeadline', sign, today)
      .where('exposeToB2b', '==', '노출')
      .where('category', '==', category)
      .onSnapshot((snapshot) =>
        setter(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  } else {
    db.collection('products')
      .where('preOrderDeadline', sign, today)
      .where('exposeToB2b', '==', '노출')
      .onSnapshot((snapshot) =>
        setter(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }
}

// Fetching Notice
export function noticeFetch(setter: any) {
  db.collection('notice')
    .orderBy('createdAt')
    .onSnapshot((snapshot) =>
      setter(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    );
}

// Fetching Cart
export function cartFetch(setter: any, email: string) {
  db.collection('accounts')
    .doc(email)
    .collection('cart')
    .orderBy('createdAt')
    .onSnapshot((snapshot) =>
      setter(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    );
}

// Set Cart
export async function cartSet(user: any, product: any, qty: number, exchangeRate: any) {
  await db
    .collection('accounts')
    .doc(user.email)
    .collection('cart')
    .doc()
    .set({
      barcode: product.data.barcode,
      canceled: false,
      category: product.data.category,
      createdAt: new Date(),
      currency: user.currency,
      dcAmount: user.dcAmount[`${product.data.category}A`],
      dcRate: user.dcRates[product.data.category],
      exchangeRate: exchangeRate,
      nickName: user.nickName,
      preOrderDeadline: product.data.preOrderDeadline,
      price: product.data.price,
      productId: product.id,
      quan: qty,
      relDate: product.data.relDate,
      shipped: false,
      sku: product.data.sku,
      title: product.data.title,
      totalPrice: product.data.price * qty,
      totalWeight: product.data.weight * qty,
      weight: product.data.weight
    });
}

// Delete Cart
export function cartDelete(user: any, cart: any) {
  db.collection('accounts').doc(user.email).collection('cart').doc(cart.id).delete();
}

// Update Cart
export function cartUpdate(user: any, cart: any, qty: any) {
  db.collection('accounts').doc(user.email).collection('cart').doc(cart.id).update({ quan: qty });
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
