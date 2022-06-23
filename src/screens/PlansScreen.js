import React, { useEffect, useState } from 'react';
// IMPORTING db FROM LOCAL firebase.js FILE IN src FOLDER //
import db from '../firebase';
import './PlansScreen.css';

/* PLANSSCREEN COMPONENT */
const PlansScreen = () => {
  /* STATE - ACTIVE PRODUCT (PLAN) */
  const [products, setProducts] = useState([]);

  /* EFFECT - PULL PRODUCT (PLAN) INFO FROM DB ONCE ON MOUNT */
  useEffect(() => {
    db.collection('products')
      .where('active', '==', 'true')
      .get()
      .then((queySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection('prices').get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data,
            };
          });
        });
        setProducts(products);
      });
  }, []);

  /* RETURN RENDER */
  return <div className='PlansScreen'>PlansScreen</div>;
};

export default PlansScreen;
