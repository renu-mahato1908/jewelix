// import Header from "../components/Header";

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// import {
//     IonPage,
//     IonHeader,
//     IonToolbar,
//     IonTitle,
//     IonContent,
//     IonGrid,
//     IonRow,
//     IonCol,
//     IonCard,
//     IonCardContent,
//     IonImg,
//     IonButton,
//     IonText,
//     IonToast,
//     IonSpinner,

//     IonButtons,
//     IonMenuButton
// } from '@ionic/react';

// import { trash, cart } from 'ionicons/icons';

// import { useSelector, useDispatch, } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { logout } from "../Slices/auth";

// import { heartOutline, heart } from 'ionicons/icons';
// import { IonIcon } from '@ionic/react'
// import "./Wishlist.css";


// interface WishlistProduct {
//     _id: string;
//     productId: {
//         id: string;
//         name: string;
//         category: string;
//         price: string;
//         description: string;
//         image: string;
//     };
// }

// const Wishlist: React.FC = () => {

//     const [wishlistproducts, setWishlistProducts] = useState<WishlistProduct[]>([]);
//     const [loading, setLoading] = useState(true);

//     const [toastMessage, setToastMessage] = useState("");
//     const [showToast, setShowToast] = useState(false);

//     const { user: currentUser } = useSelector((state: any) => state.auth);

//     // ================= FETCH WISHLIST =================

//     useEffect(() => {

//         if (!currentUser) return;

//         axios
//             .get(`https://renuka-saa9.vercel.app/api/wishlist/user/${currentUser.id}`)

//             .then((response) => {

//                 console.log(response.data);

//                 setWishlistProducts(response.data);

//             })

//             .catch((error) => {

//                 console.log(error);

//             })

//             .finally(() => {

//                 setLoading(false);

//             });

//     }, [currentUser]);
//     localStorage.getItem("user");

//     // ================= ADD TO CART =================

//     // const handleCart = (product: any) => {

//     //     const data = {

//     //         userId: currentUser.id,

//     //         items: [
//     //             {
//     //                 productId: product.id,
//     //                 quantity: 1,
//     //                 price: product.productPrice
//     //             }
//     //         ]
//     //     };

//     //     axios
//     //         .post(`https://renuka-saa9.vercel.app/api/carts`, data)

//     //         .then((response) => {

//     //             console.log(response.data);

//     //             setToastMessage("Added To Cart");
//     //             setShowToast(true);

//     //         })

//     //         .catch((error) => {

//     //             console.log(error);

//     //             setToastMessage("Cart Error");
//     //             setShowToast(true);

//     //         });
//     // };



//     const handleCart = (product: any) => {

//         const data = {
//             userId: currentUser.id,
//             items: [
//                 {
//                     productId: product.id,
//                     quantity: 1,
//                     price: product.price
//                 }
//             ]
//         };

//         axios
//             .post(
//                 "https://renuka-saa9.vercel.app/api/carts",
//                 data
//             )
//             .then(() => {
//                 setToastMessage("Added To Cart");
//                 setShowToast(true);
//             })
//             .catch(() => {
//                 setToastMessage("Cart Error");
//                 setShowToast(true);
//             });
//     };

//     // ================= DELETE WISHLIST =================

//     const handleDelete = (id: string) => {

//         axios
//             .delete(`https://renuka-saa9.vercel.app/api/wishlist/${id}`)

//             .then(() => {

//                 setWishlistProducts(

//                     wishlistproducts.filter(

//                         (item) => item._id !== id

//                     )

//                 );

//                 setToastMessage("Removed From Wishlist");
//                 setShowToast(true);

//             })

//             .catch((error) => {

//                 console.log(error);

//             });
//     };
//     const history = useHistory();

//     const dispatch = useDispatch();

//     const handleLogout = () => {
//         dispatch(logout());          // Redux state clear
//         localStorage.removeItem("user");
//         history.replace("/SignIn");   // redirect to login page
//     };






//     return (

//         <IonPage>
//             <Header handleLogout={handleLogout} />


//             <IonButtons slot="start">
//                 <IonMenuButton />
//             </IonButtons>



//             <IonContent className="ion-padding">

//                 <IonGrid>


//                     {

//                         loading && (

//                             <IonRow>

//                                 <IonCol className="ion-text-center">

//                                     <IonSpinner name="crescent" />

//                                 </IonCol>

//                             </IonRow>

//                         )

//                     }

//                     {/* ================= WISHLIST PRODUCTS ================= */}

//                     {/* <IonRow>

//                         {

//                             wishlistproducts.map((wishlistproduct, index) => (

//                                 <IonCol
//                                     size="12"
//                                     sizeSm="6"
//                                     sizeMd="4"
//                                     sizeLg="3"
//                                     key={index}
//                                 >

//                                     <IonCard className="wishlist-card">


//                                         <IonButton
//                                             fill="clear"
//                                             color="danger"
//                                             className="delete-btn"
//                                             onClick={() =>
//                                                 handleDelete(wishlistproduct._id)
//                                             }
//                                         >

//                                             <IonIcon
//                                                 icon={trash}
//                                             />

//                                         </IonButton>


//                                         {

//                                             wishlistproduct.productId?.images?.length > 0 && (

//                                                 <IonImg
//                                                     className="wishlist-img"
//                                                     src={`https://renuka-saa9.vercel.app/upload/${wishlistproduct.productId.images[0]}`}
//                                                 />

//                                             )

//                                         }


//                                         <IonCardContent>

//                                             <IonText>

//                                                 <h2>

//                                                     {
//                                                         wishlistproduct.productId?.productName
//                                                     }

//                                                 </h2>

//                                             </IonText>

//                                             <p>

//                                                 Category :
//                                                 {
//                                                     wishlistproduct.productId?.productCategory
//                                                 }

//                                             </p>

//                                             <h3>

//                                                 ₹
//                                                 {
//                                                     wishlistproduct.productId?.productPrice
//                                                 }

//                                             </h3>

//                                             <p className="desc">

//                                                 {
//                                                     wishlistproduct.productId?.productDescription
//                                                 }

//                                             </p>


//                                             <IonButton
//                                                 expand="block"
//                                                 onClick={() =>
//                                                     handleCart(
//                                                         wishlistproduct.productId
//                                                     )
//                                                 }
//                                             >

//                                                 <IonIcon
//                                                     icon={cart}
//                                                     slot="start"
//                                                 />

//                                                 Add To Cart

//                                             </IonButton>

//                                         </IonCardContent>

//                                     </IonCard>

//                                 </IonCol>

//                             ))

//                         }

//                     </IonRow> */}



//                     <IonRow>
//                         {wishlistproducts.map((wishlistproduct, index) => (
//                             <IonCol
//                                 size="12"
//                                 sizeSm="6"
//                                 sizeMd="4"
//                                 sizeLg="3"
//                                 key={index}
//                             >
//                                 <IonCard className="wishlist-card">

//                                     <IonButton
//                                         fill="clear"
//                                         color="danger"
//                                         className="delete-btn"
//                                         onClick={() => handleDelete(wishlistproduct._id)}
//                                     >
//                                         <IonIcon icon={trash} />
//                                     </IonButton>

//                                     <IonImg
//                                         className="wishlist-img"
//                                         src={wishlistproduct.productId?.image}
//                                     />

//                                     <IonCardContent>

//                                         <IonText>
//                                             <h2>
//                                                 {wishlistproduct.productId?.name}
//                                             </h2>
//                                         </IonText>

//                                         <p>
//                                             Category :
//                                             {wishlistproduct.productId?.category}
//                                         </p>

//                                         <h3>
//                                             ₹ {wishlistproduct.productId?.price}
//                                         </h3>

//                                         <p className="desc">
//                                             {wishlistproduct.productId?.description}
//                                         </p>

//                                         <IonButton
//                                             expand="block"
//                                             onClick={() =>
//                                                 handleCart(wishlistproduct.productId)
//                                             }
//                                         >
//                                             <IonIcon
//                                                 icon={cart}
//                                                 slot="start"
//                                             />
//                                             Add To Cart
//                                         </IonButton>

//                                     </IonCardContent>

//                                 </IonCard>
//                             </IonCol>
//                         ))}
//                     </IonRow>

//                 </IonGrid>

//                 {/* ================= TOAST ================= */}

//                 <IonToast
//                     isOpen={showToast}
//                     message={toastMessage}
//                     duration={2000}
//                     onDidDismiss={() => setShowToast(false)}
//                 />

//             </IonContent>

//         </IonPage>
//     );
// };

// export default Wishlist;




























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
    IonMenuButton,
    IonIcon
} from '@ionic/react';
import { trash, cart } from 'ionicons/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header';
import { logout } from '../Slices/auth';
import './Wishlist.css';

interface WishlistProduct {
    _id: string;
    userId: string;
    productId: {
        _id: string;
        id?: string;
        name: string;
        category: string;
        price: string;
        description: string;
        image: string;
    } | null;
    status: boolean;
}

const Wishlist: React.FC = () => {
    const [wishlistproducts, setWishlistProducts] = useState<WishlistProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToast, setShowToast] = useState(false);

    const { user: currentUser } = useSelector((state: any) => state.auth);
    const history = useHistory();
    const dispatch = useDispatch();

    // ================= FETCH WISHLIST =================
    // useEffect(() => {
    //     if (!currentUser || !currentUser.id) {
    //         setLoading(false);
    //         return;
    //     }

    //     setLoading(true);

    //     axios
    //         .get(`https://vercel.app{currentUser.id}`)
    //         .then((response) => {
    //             setWishlistProducts(response.data);
    //         })
    //         .catch((error) => {
    //             console.error("Frontend Fetch Error:", error);
    //             setToastMessage("Failed to load wishlist items");
    //             setShowToast(true);
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });
    // }, [currentUser]);



    useEffect(() => {

        if (!currentUser) return;

        axios
            .get(`https://renuka-saa9.vercel.app/api/wishlist/user/${currentUser.id}`)

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
    localStorage.getItem("user");

    // ================= ADD TO CART =================
    // const handleCart = (product: any) => {
    //     if (!currentUser) {
    //         setToastMessage('Please login first');
    //         setShowToast(true);
    //         return;
    //     }

    //     if (!product) return;

    //     const data = {
    //         userId: currentUser.id,
    //         items: [
    //             {
    //                 productId: product._id || product.id,
    //                 quantity: 1,
    //                 price: product.price
    //             }
    //         ]
    //     };

    //     axios
    //         .post('https://vercel.app', data)
    //         .then(() => {
    //             setToastMessage('Added To Cart');
    //             setShowToast(true);
    //         })
    //         .catch((error) => {
    //             console.error("Cart API Error:", error);
    //             if (error.response && error.response.status === 409) {
    //                 setToastMessage('Product already exists in cart');
    //             } else {
    //                 setToastMessage('Cart Error');
    //             }
    //             setShowToast(true);
    //         });
    // };



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
            .post(`https://renuka-saa9.vercel.app/api/carts`, data)

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
    // const handleDelete = (id: string) => {
    //     axios
    //         .delete(`https://vercel.app{id}`)
    //         .then(() => {
    //             setWishlistProducts(wishlistproducts.filter((item) => item._id !== id));
    //             setToastMessage('Removed From Wishlist');
    //             setShowToast(true);
    //         })
    //         .catch((error) => {
    //             console.error("Delete Error:", error);
    //             setToastMessage('Failed to remove item');
    //             setShowToast(true);
    //         });
    // };


    const handleDelete = (id: string) => {

        axios
            .delete(`https://renuka-saa9.vercel.app/api/wishlist/${id}`)

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

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('user');
        history.replace('/SignIn');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Wishlist</IonTitle>
                </IonToolbar>
            </IonHeader>

            <Header handleLogout={handleLogout} />

            <IonContent className="ion-padding">
                <IonGrid>
                    {loading && (
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <IonSpinner name="crescent" />
                            </IonCol>
                        </IonRow>
                    )}

                    {/* ================= WISHLIST PRODUCTS DISPLAY ================= */}
                    <IonRow>
                        {!loading && wishlistproducts.length === 0 && (
                            <IonCol className="ion-text-center">
                                <p>Your wishlist is empty.</p>
                            </IonCol>
                        )}

                        {wishlistproducts.map((wishlistproduct, index) => {
                            const product = wishlistproduct.productId;
                            if (!product) return null; // Safe Failback Check

                            return (
                                <IonCol size="12" sizeSm="6" sizeMd="4" sizeLg="3" key={wishlistproduct._id || index}>
                                    <IonCard className="wishlist-card">
                                        <IonButton
                                            fill="clear"
                                            color="danger"
                                            className="delete-btn"
                                            onClick={() => handleDelete(wishlistproduct._id)}
                                        >
                                            <IonIcon icon={trash} />
                                        </IonButton>

                                        {/* इमेज रेंडरिंग */}
                                        <IonImg className="wishlist-img" src={product.image} />

                                        <IonCardContent>
                                            <IonText>
                                                <h2>{product.name}</h2>
                                            </IonText>
                                            <p>Category: {product.category}</p>
                                            <h3>₹ {product.price}</h3>
                                            <p className="desc">{product.description}</p>

                                            <IonButton
                                                expand="block"
                                                onClick={() => handleCart(product)}
                                            >
                                                <IonIcon icon={cart} slot="start" />
                                                Add To Cart
                                            </IonButton>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            );
                        })}
                    </IonRow>
                </IonGrid>

                {/* ================= TOAST ALERTS ================= */}
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
