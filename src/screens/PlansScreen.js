import React, { useEffect, useState } from 'react';
import { doc, collection, query, where, getDocs, getDoc, setDoc, onSnapshot, addDoc } from 'firebase/firestore';
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';
import './PlansScreen.css';

const PlansScreen = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  /* PULL USER SUBSCRIPTION INFO FROM DB BASED ON USER.UID */
  useEffect(() => {
    const q = query(collection(db, `customers/${user.uid}/subscriptions`));

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach(async (subscription) => {
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start: subscription.data().current_period_start.seconds,
        });
      });
    });
  }, [user.uid]);

  /* PULL PRODUCTS (PLANS) INFO FROM DB ONCE ON MOUNT */
  useEffect(() => {
    const q = query(collection(db, 'products'), where('active', '==', true));

    getDocs(q).then((querySnapshot) => {
      const products = {};

      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();

        const priceSnap = await getDocs(collection(productDoc.ref, 'prices'));

        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price._document.data.value.mapValue.fields,
          };
        });
      });
      setProducts(products);
    });
  }, []);

  /* LOAD CHECKOUT */
  const loadCheckout = async (priceId) => {
    const docRef = await addDoc(collection(db, `customers/${user.uid}/checkout_sessions`), {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    /* INIT STRIPE AND REDIRECT TO CHECKOUT */
    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe('pk_test_51LDvSGHR9oRmjwsIfJ4rcA4DzytNuM6vGdE7a0As5GdNpfgaLMwmEWv7KSQaEZYIk4h9yxDk44in0XDvIzy22VGI00RUGKMpXU');
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className='PlansScreen'>
      <br />
      {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}

      {/* RENDER ALL AVAILABLE ACTIVE PRODUCTS (PLANS) */}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);

        return (
          <div key={productId} className={`${isCurrentPackage && 'plansScreen__plan--disabled'} plansScreen__plan`}>
            <div className='plansScreen__info'>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            {/* CONDITIONAL TEXT RENDERING FOR CURRENT PACKAGE / ONLY LOAD CHECKOUT IF NOT CURRENT PACKAGE */}
            <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>{isCurrentPackage ? `Current Package` : `Subscribe`}</button>
          </div>
        );
      })}
    </div>
  );
};

export default PlansScreen;
