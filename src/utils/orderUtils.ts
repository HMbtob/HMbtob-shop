import { db } from '../firebase';
import { WhereFilterOp } from '@firebase/firestore-types';
import { increment } from 'firebase/firestore';

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

export function toSelePrice(
  product: any,
  optionPrice: any,
  user: any,
  exchangeRate: any,
  qty: any = 1
): any {
  if (exchangeRate[user.currency] === 1) {
    return Number(
      (
        ((optionPrice -
          optionPrice * user.dcRates[product.data.category] -
          user.dcAmount[`${product.data.category}A`]) /
          exchangeRate[user.currency]) *
        qty
      ).toFixed(0)
    );
  } else {
    return Number(
      (
        ((optionPrice -
          optionPrice * user.dcRates[product.data.category] -
          user.dcAmount[`${product.data.category}A`]) /
          exchangeRate[user.currency]) *
        qty
      ).toFixed(2)
    );
  }
}

// Set Cart
export async function cartSet(
  user: any,
  product: any,
  optionPrice: any,
  optionName: any,
  qty: number,
  exchangeRate: any,
  optionId: any = 'none'
) {
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
      price: toSelePrice(product, optionPrice, user, exchangeRate),
      productId: product?.id ? product?.id : 'none',
      optioned: product?.data?.optioned ? product?.data?.optioned : false,
      optionId: optionId ? optionId : 'none',
      quan: qty,
      relDate: product.data.relDate,
      shipped: false,
      sku: product.data.sku,
      title: product.data.title.trim(),
      totalPrice: toSelePrice(product, optionPrice, user, exchangeRate, qty),
      totalWeight: product.data.weight * qty,
      weight: product.data.weight,
      optionName
    });
}

// Delete Cart
export function cartDelete(user: any, cart: any) {
  db.collection('accounts').doc(user.email).collection('cart').doc(cart.id).delete();
  alert('Deleted');
}

// Update Cart
export function cartUpdate(user: any, cart: any, qty: any) {
  db.collection('accounts')
    .doc(user.email)
    .collection('cart')
    .doc(cart.id)
    .update({ quan: qty, totalPrice: cart.data.price * qty, totalWeight: cart.data.weight * qty });
  alert('Updated');
}
// Update Order
export function orderUpdate(user: any, order: any, qty: any, memo: string) {
  db.collection('accounts')
    .doc(user.email)
    .collection('order')
    .doc(order.id)
    .update({
      quan: qty,
      totalPrice: order.data.price * qty,
      totalWeight: order.data.weight * qty,
      memo: memo
    });
  alert('Updated');
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
export function newOne(createdSec: number) {
  const today = new Date().getTime();
  const gap = today - new Date(createdSec * 1000).getTime();
  const dayGap = Math.ceil(gap / (1000 * 60 * 60 * 24));
  return { dayGap };
}

// ToLocalString date
export function toDate(timeSec: number) {
  return new Date(timeSec * 1000).toISOString().substring(0, 10);
}

// To locale currency(with cal)
export function toLocalCurrency(price: number, user: any, exchangeRate: any) {
  if (exchangeRate[user.currency] === 1) {
    return (price / exchangeRate[user.currency])?.toLocaleString('ko-KR');
  } else {
    return (price / exchangeRate[user.currency])?.toFixed(2)?.toLocaleString();
  }
}

// To locale currency(without cal)
export function toLocalCurrencyWithoutCal(price: number, user: any, exchangeRate: any) {
  if (exchangeRate[user.currency] === 1) {
    return Number(price)?.toLocaleString('ko-KR');
  } else {
    return Number(price)?.toFixed(2)?.toLocaleString();
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
      (price - price * user.dcRates[category] - user.dcAmount[`${category}A`]) /
      exchangeRate[user.currency]
    )
      .toFixed(2)
      .toLocaleString();
  }
}

export function deleteOrder(order: any, user: any) {
  if (confirm('really?')) {
    db.collection('products')
      .doc(order.data.productId)
      .update({ stock: increment(order.data.quan) });
    db.collection('products')
      .doc(order.data.productId)
      .collection('newStockHistory')
      .doc(order.id)
      .update({ canceled: true });
    db.collection('accounts').doc(user.email).collection('order').doc(order.id).delete();
  } else {
    return;
  }
}
