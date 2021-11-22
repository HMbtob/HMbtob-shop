import { db } from '../firebase';
import { sendPasswordResetEmail, getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../firebase';

const auth = getAuth(firebaseApp);

// DHL 나라 목록 가져오기
export async function countriesFetch(setCountries: any): Promise<void> {
  await db
    .collection('shippingFee')
    .doc('dhl')
    .onSnapshot(async (snapshot) => {
      const coun = await snapshot.data();
      const { z }: any = coun;
      setCountries(
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
    await setInterval(
      async () => await db.collection('accounts').doc(email).update({ survay: data }),
      5000
    );
  } catch (e) {
    console.log(e);
  }
}
