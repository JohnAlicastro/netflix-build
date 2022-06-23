import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
// IMPORTING db FROM LOCAL firebase.js FILE IN src FOLDER //
import db from '../firebase';
import './PlansScreen.css';

/* PLANSSCREEN COMPONENT */
const PlansScreen = () => {
  /* STATE - AVAILABLE PRODUCTS (PLANS) */
  const [products, setProducts] = useState([]);

  /* EFFECT - PULL PRODUCTS (PLANS) INFO FROM DB ONCE ON MOUNT */
  useEffect(() => {
    // db.collection('products')
    //   .where('active', '==', true)
    //   .get()
    //   .then((querySnapshot) => {
    //     const products = {};
    //     querySnapshot.forEach(async (productDoc) => {
    //       products[productDoc.id] = productDoc.data();
    //       const priceSnap = await productDoc.ref.collection('prices').get();
    //       priceSnap.docs.forEach((price) => {
    //         products[productDoc.id].prices = {
    //           priceId: price.id,
    //           priceData: price.data,
    //         };
    //       });
    //     });
    //     setProducts(products);
    //   });

    // QUERY //
    const q = query(collection(db, 'products'), where('active', '==', true));

    // GET DOCS //
    getDocs(q).then((querySnapshot) => {
      // TEMP PRODUCTS OBJ TO BE POPULATED //
      const products = {};

      querySnapshot.forEach(async (productDoc) => {
        // FOREACH POPULATE THE PRODUCTS OBJ WITH DOCUMENT DATA //
        products[productDoc.id] = productDoc.data();

        // ALL PRICE DOCUMENTS INSIDE EACH PRODUCT DOCUMENT //
        const priceSnap = await getDocs(collection(productDoc.ref, 'prices'));

        // FOREACH PRICE DOC ADDITIONALLY POPULATE THE PRODUCTS OBJ //
        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price._document.data.value.mapValue.fields,
          };
        });
      });
      // USE STATE TO SET PRODUCTS STATE //
      setProducts(products);
    });
  }, []);

  console.log(products);

  /* RETURN RENDER */
  return <div className='PlansScreen'>PlansScreen</div>;
};

export default PlansScreen;
