
import Header from "../components/Header";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonImg,
  IonButton,
  IonText,
  IonToast,
  IonSpinner
} from '@ionic/react';

import { useSelector } from "react-redux";
// import './SignIn.css'

import { FiHeart } from "react-icons/fi";

interface Product {
  id: number;
  productName: string;
  productPrice: number;
  productCategory: string;
  productGender: string;
  productDescription: string;
  images: string[];
}

const ViewProduct = () => {

  const { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);

  const [toastMessage, setToastMessage] = useState("");

  const [showToast, setShowToast] = useState(false);

  const { user: currentUser } = useSelector(
    (state: any) => state.auth
  );

  // ================= FETCH PRODUCT =================

  useEffect(() => {

    setLoading(true);

    axios
      .get(`https://renuka-saa9.vercel.app/api/ssproducts/${productId}`)

      .then((response) => {

        console.log(response.data);

        setProduct(response.data);

      })

      .catch((err) => {

        console.log(err);

      })

      .finally(() => {

        setLoading(false);

      });

  }, [productId]);

  // ================= WISHLIST =================

  const handleWishlist = (product: Product | null) => {

    if (!currentUser) {

      setToastMessage("Please login first");
      setShowToast(true);

      return;
    }

    if (!product) return;

    const data = {

      userId: currentUser.id,
      productId: product.id,

    };

    axios.post(`https://renuka-saa9.vercel.app/api/wishlist`, data)

      .then((response) => {

        console.log(response.data);

        setToastMessage("Added to wishlist");

        setShowToast(true);

      })

      .catch((error) => {

        console.log(error);

        if (error.response?.status === 409) {

          setToastMessage("Already in wishlist");

        }

        else {

          setToastMessage("Something went wrong");

        }

        setShowToast(true);

      });

  };

  // ================= ADD TO CART =================

  const handleCart = (product: Product | null) => {

    if (!currentUser) {

      setToastMessage("Please login first");
      setShowToast(true);

      return;
    }

    if (!product) return;

    const data = {

      userId: currentUser.id,

      items: [
        {
          productId: product.id,
          quantity: 1,
          price: product.productPrice
        }
      ]
    };

    axios.post(`https://renuka-saa9.vercel.app/api/carts`, data)

      .then((response) => {

        console.log(response.data);

        setToastMessage("Product added to cart");

        setShowToast(true);

      })

      .catch((error) => {

        console.log(error);

        setToastMessage("Cart error");

        setShowToast(true);

      });

  };


  const handleLogout = () => {
    localStorage.clear();
  };

  return (

    <IonPage>
      <Header handleLogout={handleLogout} />


      <IonContent className="ion-padding">

        {
          loading && (

            <div className="ion-text-center">

              <IonSpinner name="crescent" />

            </div>

          )
        }

        {
          product && (

            <IonGrid>

              <IonRow className="ion-align-items-center">

                {/* IMAGE */}

                <IonCol
                  size="12"
                  sizeMd="4"
                  className="ion-text-center"
                >

                  <div className="product-image-wrapper">

                    <IonImg
                      className="product-image"
                      src={`https://renuka-saa9.vercel.app/upload/${product?.images?.[0]}`}
                    />

                    {/* WISHLIST */}

                    <IonButton
                      className="wishlist-btn"
                      fill="solid"
                      onClick={() => handleWishlist(product)}
                    >

                      <FiHeart />

                    </IonButton>

                  </div>

                </IonCol>

                {/* DETAILS */}

                <IonCol
                  size="12"
                  sizeMd="6"
                >

                  <IonCard className="details-card">

                    <IonCardContent>

                      <h2 className="product-name">

                        {product?.productName}

                      </h2>

                      <h3 className="product-price">

                        ₹ {product?.productPrice}

                      </h3>

                      <IonText>

                        <p>

                          <strong>Category :</strong>

                          {product?.productCategory}

                        </p>

                        <p>

                          <strong>Gender :</strong>

                          {product?.productGender}

                        </p>

                        <p>

                          <strong>Description :</strong>

                          {product?.productDescription}

                        </p>

                      </IonText>

                      {/* CART BUTTON */}

                      <IonButton
                        expand="block"
                        className="cart-btn"
                        onClick={() => handleCart(product)}
                      >

                        Add To Cart

                      </IonButton>

                    </IonCardContent>

                  </IonCard>

                </IonCol>

              </IonRow>

            </IonGrid>

          )
        }

        {/* TOAST */}

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />

      </IonContent>

    </IonPage>
  );
};

export default ViewProduct;







