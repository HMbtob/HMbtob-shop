import { db } from '../firebase';

// 배송지 추가하기
export function addShippingAddresses(email: string, shippingAddresses: any) {
  try {
    db.collection('accounts')
      .doc(email)
      .collection('shippingAddresses')
      .doc()
      .set({
        name: `# ${shippingAddresses.length + 1}`,
        paymentMethod: '',
        shippingType: '',
        recipient: '',
        recipientPhoneNumber: '',
        recipientEmail: '',
        street: '',
        city: '',
        states: '',
        country: '',
        zipcode: ''
      });
  } catch (e) {
    console.log(e);
  }
}

// 배송지 삭제하기
export function delShippingAddresses(
  shippingAddressType: string,
  shippingAddresses: any,
  email: any
) {
  try {
    const id = shippingAddresses.find((li: any) => li.data.name === shippingAddressType).id;
    db.collection('accounts').doc(email).collection('shippingAddresses').doc(id).delete();
  } catch (e) {
    console.log(e);
  }
}
