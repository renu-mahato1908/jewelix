import Header from "../components/Header";

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
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
    IonSpinner,

    IonButtons,
    IonMenuButton
} from '@ionic/react';

import { trash, cart } from 'ionicons/icons';

import { useSelector, useDispatch, } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { heartOutline, heart } from 'ionicons/icons';
import { IonIcon } from '@ionic/react'
import { cartOutline, } from 'ionicons/icons';
import { personOutline, person, peopleOutline } from 'ionicons/icons';
import { Link } from "react-router-dom";

interface WishlistProduct {
    _id: string;

    productId: {
        id: number;
        productName: string;
        productCategory: string;
        productPrice: number;
        productDescription: string;
        images: string[];
    };
}

const Wishlist: React.FC = () => {

    const [wishlistproducts, setWishlistProducts] = useState<WishlistProduct[]>([]);
    const [loading, setLoading] = useState(true);

    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const { user: currentUser } = useSelector((state: any) => state.auth);

    // ================= FETCH WISHLIST =================

    useEffect(() => {

        if (!currentUser) return;

        axios
            .get(`http://localhost:8090/api/wishlist/user/${currentUser.id}`)

            .then((response) => {

                console.log(response.data);

                setWishlistProducts(response.data);

            })

            .catch((error) => {

                console.log(error);

            })

            .finally(() => {

                setLoading(false);

            });

    }, [currentUser]);

    // ================= ADD TO CART =================

    const handleCart = (product: any) => {

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

        axios
            .post(`http://localhost:8090/api/carts`, data)

            .then((response) => {

                console.log(response.data);

                setToastMessage("Added To Cart");
                setShowToast(true);

            })

            .catch((error) => {

                console.log(error);

                setToastMessage("Cart Error");
                setShowToast(true);

            });
    };

    // ================= DELETE WISHLIST =================

    const handleDelete = (id: string) => {

        axios
            .delete(`http://localhost:8090/api/wishlist/${id}`)

            .then(() => {

                setWishlistProducts(

                    wishlistproducts.filter(

                        (item) => item._id !== id

                    )

                );

                setToastMessage("Removed From Wishlist");
                setShowToast(true);

            })

            .catch((error) => {

                console.log(error);

            });
    };
    const history = useHistory();

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());          // Redux state clear
        localStorage.removeItem("user");
        history.replace("/SignIn");   // redirect to login page
    };


    

    return (

        <IonPage>
            <Header handleLogout={handleLogout} />


            {/* ================= HEADER ================= */}
            <IonButtons slot="start">
                <IonMenuButton />
            </IonButtons>

            {/* <IonHeader>

                <IonToolbar color="light">

                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>

                    <IonTitle>

                        My Wishlist

                    </IonTitle>


                    <IonButtons slot="end">


                        <Link to={"./Wishlist"}><IonIcon icon={heartOutline} /></Link>

                        <Link to={"./Cart"}> <IonIcon icon={cartOutline} /></Link>

                        <Link to={"./Account"}> <IonIcon icon={personOutline} /></Link>

                        <IonButton onClick={handleLogout} className="logout-btn">
                            Logout
                        </IonButton>

                    </IonButtons>

                </IonToolbar>

            </IonHeader> */}

            {/* ================= CONTENT ================= */}

            <IonContent className="ion-padding">

                <IonGrid>

                    {/* ================= LOADING ================= */}

                    {

                        loading && (

                            <IonRow>

                                <IonCol className="ion-text-center">

                                    <IonSpinner name="crescent" />

                                </IonCol>

                            </IonRow>

                        )

                    }

                    {/* ================= WISHLIST PRODUCTS ================= */}

                    <IonRow>

                        {

                            wishlistproducts.map((wishlistproduct, index) => (

                                <IonCol
                                    size="12"
                                    sizeSm="6"
                                    sizeMd="4"
                                    sizeLg="3"
                                    key={index}
                                >

                                    <IonCard className="wishlist-card">

                                        {/* DELETE BUTTON */}

                                        <IonButton
                                            fill="clear"
                                            color="danger"
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDelete(wishlistproduct._id)
                                            }
                                        >

                                            <IonIcon
                                                icon={trash}
                                            />

                                        </IonButton>

                                        {/* IMAGE */}

                                        {

                                            wishlistproduct.productId?.images?.length > 0 && (

                                                <IonImg
                                                    className="wishlist-img"
                                                    src={`http://localhost:8090/upload/${wishlistproduct.productId.images[0]}`}
                                                />

                                            )

                                        }

                                        {/* CARD CONTENT */}

                                        <IonCardContent>

                                            <IonText>

                                                <h2>

                                                    {
                                                        wishlistproduct.productId?.productName
                                                    }

                                                </h2>

                                            </IonText>

                                            <p>

                                                Category :
                                                {
                                                    wishlistproduct.productId?.productCategory
                                                }

                                            </p>

                                            <h3>

                                                ₹
                                                {
                                                    wishlistproduct.productId?.productPrice
                                                }

                                            </h3>

                                            <p className="desc">

                                                {
                                                    wishlistproduct.productId?.productDescription
                                                }

                                            </p>

                                            {/* ADD TO CART */}

                                            <IonButton
                                                expand="block"
                                                onClick={() =>
                                                    handleCart(
                                                        wishlistproduct.productId
                                                    )
                                                }
                                            >

                                                <IonIcon
                                                    icon={cart}
                                                    slot="start"
                                                />

                                                Add To Cart

                                            </IonButton>

                                        </IonCardContent>

                                    </IonCard>

                                </IonCol>

                            ))

                        }

                    </IonRow>

                </IonGrid>

                {/* ================= TOAST ================= */}

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

export default Wishlist;