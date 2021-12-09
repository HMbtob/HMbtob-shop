import { db, provider } from '../firebase';
import {
  sendPasswordResetEmail,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithRedirect
} from 'firebase/auth';
import { firebaseApp } from '../firebase';

const auth = getAuth(firebaseApp);

// DHL 나라 목록 가져오기
export async function countriesFetch(setCountries: any): Promise<void> {
  db.collection('shippingFee')
    .doc('dhl')
    .onSnapshot(async (snapshot) => {
      const coun = snapshot.data();
      const { z }: any = coun;
      await setCountries(
        [].concat(
          ...z
            ?.map((zo: any) => Object.values(zo).map((co: any) => co.country))
            .map((doc: any) => [].concat(...doc))
        )
      );
    });

  return;
}

// 비밀번호 재설정
export async function forgotPassword() {
  const inputEmail = prompt('Please enter your email address.');
  try {
    if (inputEmail != null) {
      await sendPasswordResetEmail(auth, inputEmail);
    }
  } catch (e) {
    console.log(e);
  } finally {
    alert('Please check your E-mail.');
  }
}

// 이메일로 회원가입
export async function signInWithEmail(email: string, password: string, data: any) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    delete data.email;
    delete data.password;
    setTimeout(async () => {
      await db.collection('accounts').doc(email).update({ survay: data });
      await db.collection('accounts').doc(email).collection('addresses').doc('defaultAddress').set({
        name: 'Default Address',
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
      await db.collection('accounts').doc(email).collection('addresses').doc('#1').set({
        name: '# 1',
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
      await db.collection('accounts').doc(email).collection('addresses').doc('#2').set({
        name: '# 2',
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
      await db.collection('accounts').doc(email).collection('addresses').doc('#3').set({
        name: '# 3',
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
      await db.collection('accounts').doc(email).collection('addresses').doc('shipToKorea').set({
        name: 'Ship To Korea',
        paymentMethod: '',
        shippingType: '',
        recipient: '',
        recipientPhoneNumber: '',
        recipientEmail: '',
        address: '',
        detailAddress: '',
        zipcode: ''
      });
    }, 5000);
  } catch (e) {
    console.log(e);
  }
}

export async function signInWithGoogle() {
  await signInWithRedirect(auth, provider).catch((e) => alert(e.message));
}
