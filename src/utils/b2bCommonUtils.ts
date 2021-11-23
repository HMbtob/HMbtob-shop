import { db } from '../firebase';

export async function productsFetch(setter: any): Promise<void> {
  const today = new Date();
  await db
    .collection('products')
    .where('preOrderDeadline', '<=', today)
    .onSnapshot((snapshot) =>
      setter(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    );
}
