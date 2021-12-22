import { db } from '../firebase';

export async function productFetch(setter: any, query: any, setLoading: any) {
  const asdasd: any = [];

  await db
    .collection('products')
    .where('exposeToB2b', '==', '노출')
    .orderBy('createdAt', 'desc')
    .get()
    .then((snapshot) => snapshot.forEach((doc) => asdasd.push({ id: doc.id, data: doc.data() })));
  setter(
    asdasd.filter((doc: any) =>
      query.split(' ').length === 1
        ? doc.data.title.toLowerCase().includes(query.toLowerCase()) ||
          doc.data.title.toUpperCase().includes(query.toUpperCase()) ||
          doc.data.sku.toLowerCase().includes(query.toLowerCase()) ||
          doc.data.sku.toUpperCase().includes(query.toUpperCase()) ||
          doc.data.barcode.toLowerCase().includes(query.toLowerCase()) ||
          doc.data.barcode.toUpperCase().includes(query.toUpperCase())
        : query.split(' ').length === 2
        ? ((doc.data.title.toLowerCase().includes(query.split(' ')[0].toLowerCase()) ||
            doc.data.title.toUpperCase().includes(query.split(' ')[0].toUpperCase())) &&
            (doc.data.title.toLowerCase().includes(query.split(' ')[1].toLowerCase()) ||
              doc.data.title.toUpperCase().includes(query.split(' ')[1].toUpperCase()))) ||
          ((doc.data.sku.toLowerCase().includes(query.split(' ')[0].toLowerCase()) ||
            doc.data.sku.toUpperCase().includes(query.split(' ')[0].toUpperCase())) &&
            (doc.data.sku.toLowerCase().includes(query.split(' ')[1].toLowerCase()) ||
              doc.data.sku.toUpperCase().includes(query.split(' ')[1].toUpperCase()))) ||
          ((doc.data.barcode.toLowerCase().includes(query.split(' ')[0].toLowerCase()) ||
            doc.data.barcode.toUpperCase().includes(query.split(' ')[0].toUpperCase())) &&
            (doc.data.barcode.toLowerCase().includes(query.split(' ')[1].toLowerCase()) ||
              doc.data.barcode.toUpperCase().includes(query.split(' ')[1].toUpperCase())))
        : null
    )
  );
  setLoading(false);
}

export function mobileFetch(setter: any, setLoading: any) {
  db.collection('products')
    .where('exposeToB2b', '==', '노출')
    .orderBy('createdAt', 'desc')
    .onSnapshot((snapshot) =>
      setter(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    );
  setLoading(false);
}

export function filterByQuery(searched: any, query: any, setLoading: any, setter: any) {
  setter(
    searched.filter((doc: any) =>
      query.split(' ').length === 1
        ? doc.data.title.toLowerCase().includes(query.toLowerCase()) ||
          doc.data.title.toUpperCase().includes(query.toUpperCase()) ||
          doc.data.sku.toLowerCase().includes(query.toLowerCase()) ||
          doc.data.sku.toUpperCase().includes(query.toUpperCase()) ||
          doc.data.barcode.toLowerCase().includes(query.toLowerCase()) ||
          doc.data.barcode.toUpperCase().includes(query.toUpperCase())
        : query.split(' ').length === 2
        ? ((doc.data.title.toLowerCase().includes(query.split(' ')[0].toLowerCase()) ||
            doc.data.title.toUpperCase().includes(query.split(' ')[0].toUpperCase())) &&
            (doc.data.title.toLowerCase().includes(query.split(' ')[1].toLowerCase()) ||
              doc.data.title.toUpperCase().includes(query.split(' ')[1].toUpperCase()))) ||
          ((doc.data.sku.toLowerCase().includes(query.split(' ')[0].toLowerCase()) ||
            doc.data.sku.toUpperCase().includes(query.split(' ')[0].toUpperCase())) &&
            (doc.data.sku.toLowerCase().includes(query.split(' ')[1].toLowerCase()) ||
              doc.data.sku.toUpperCase().includes(query.split(' ')[1].toUpperCase()))) ||
          ((doc.data.barcode.toLowerCase().includes(query.split(' ')[0].toLowerCase()) ||
            doc.data.barcode.toUpperCase().includes(query.split(' ')[0].toUpperCase())) &&
            (doc.data.barcode.toLowerCase().includes(query.split(' ')[1].toLowerCase()) ||
              doc.data.barcode.toUpperCase().includes(query.split(' ')[1].toUpperCase())))
        : null
    )
  );
  setLoading(false);
}
export function sortByCreatedAt(products: any) {
  return products.sort((a: any, b: any): any => {
    let dateA = a.data.createdAt;
    let dateB = b.data.createdAt;
    return dateA < dateB ? 1 : -1;
  });
}
