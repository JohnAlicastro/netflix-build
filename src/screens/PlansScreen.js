import React, { useEffect, useState } from 'react';
import { doc, collection, query, where, getDocs, getDoc, setDoc, onSnapshot, addDoc } from 'firebase/firestore';
// IMPORTING db FROM LOCAL firebase.js FILE IN src FOLDER //
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';
import './PlansScreen.css';

/* PLANSSCREEN COMPONENT */
const PlansScreen = () => {
  /* STATE - AVAILABLE PRODUCTS (PLANS) */
  const [products, setProducts] = useState([]);
  /* USER VARIABLE GETTING user FROM REDUX STORE, USED FOR LOAD CHECKOUT FUNC & RETURN RENDER BELOW */
  const user = useSelector(selectUser);
  /* STATE - WHICH SUBSCRIPTION USER HAS ACTIVE */
  const [subscription, setSubscription] = useState(null);

  /* EFFECT - PULL USER SUBSCRIPTION INFO FROM DB BASED ON USER.UID */
  useEffect(() => {
    // QUERY //
    const q = query(collection(db, `customers/${user.uid}/subscriptions`));

    // GET DOCS FROM FIREBASE //
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach(async (subscription) => {
        // SET STATE OF SUBSCRIPTION DATA //
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start: subscription.data().current_period_start.seconds,
        });
      });
    });
  }, [user.uid]);

  /* EFFECT - PULL PRODUCTS (PLANS) INFO FROM DB ONCE ON MOUNT */
  useEffect(() => {
    // QUERY //
    const q = query(collection(db, 'products'), where('active', '==', true));

    // GET DOCS FROM FIREBASE //
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
  console.log(subscription);

  /* LOAD CHECKOUT FUNC */
  const loadCheckout = async (priceId) => {
    /* DOCREF FOR STRIPE / FIREBASE CREATE NEW CHECKOUT SESSION DOC IN FIREBASE */
    const docRef = await addDoc(collection(db, `customers/${user.uid}/checkout_sessions`), {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    /* ON SNAPSHOT - INIT STRIPE AND REDIRECT TO CHECKOUT */
    onSnapshot(docRef, async (snap) => {
      // console.log(snap);

      const { error, sessionId } = snap.data();

      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        // we have a session, lets redirect to checkout, Init Stripe
        const stripe = await loadStripe('pk_test_51LDvSGHR9oRmjwsIfJ4rcA4DzytNuM6vGdE7a0As5GdNpfgaLMwmEWv7KSQaEZYIk4h9yxDk44in0XDvIzy22VGI00RUGKMpXU');
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  /* RETURN RENDER */
  return (
    <div className='PlansScreen'>
      <br />
      {/* CONDITIONAL TEXT RENDERING FOR RENEWAL DATE IF THERE IS ACTIVE SUBSCRIPTION */}
      {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}

      {/* RENDER ALL AVAILABLE ACTIVE PRODUCTS (PLANS) */}
      {Object.entries(products).map(([productId, productData]) => {
        // GET USER CURRENT PACKAGE INFO //
        const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);

        return (
          // CONDITIONAL STRING VALUE FOR className //
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
