import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

export async function specialOrderSubmit(
  user: any,
  data: any,
  today: any,
  exchangeRate: any,
  country: any
): Promise<void> {
  await db
    .collection('accounts')
    .doc(user.email)
    .collection('order')
    .doc()
    .set({
      addName: data.addName,
      barcode: 'specialOrder',
      canceled: false,
      category: 'specialOrder',
      createdAt: today,
      country: country,
      currency: user.currency,
      dcAmount: user.dcAmount['specialOrderA'],
      dcRate: user.dcRates['specialOrder'],
      exchangeRate,
      nickName: user.nickName,
      paymentMethod: 'specialOrder',
      preOrderDeadline: today,
      price: Number(
        data.price * (1 - user.dcRates['specialOrder']) -
          Number(user.dcAmount['specialOrderA'].toFixed(0))
      ),

      productId: uuidv4(),
      quan: data.qty,
      relDate: today,
      shipped: false,
      shippingType: data.addName,
      sku: 'specialOrder',
      title: data.title,
      totalPrice:
        Number(
          data.price * (1 - user.dcRates['specialOrder']) -
            Number(user.dcAmount['specialOrderA'].toFixed(0))
        ) * data.qty,
      totalWeight: 1,
      userId: user.email,
      userUid: user.uid,
      weight: 1,
      url: data.url,
      thumbNailurl: data.thumbNailurl
    });
}
