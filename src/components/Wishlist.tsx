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
//         productName: string;
//         productCategory: string;
//         productPrice: string;
//         productDescription: string;
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
//                                                 {wishlistproduct.productId?.productName}
//                                             </h2>
//                                         </IonText>

//                                         <p>
//                                             Category :
//                                             {wishlistproduct.productId?.productCategory}
//                                         </p>

//                                         <h3>
//                                             ₹ {wishlistproduct.productId?.productPrice}
//                                         </h3>



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











import Header from "../components/Header";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
    IonSpinner,
    IonButtons,
    IonMenuButton,
    IonIcon
} from '@ionic/react';
import { trash, cart } from 'ionicons/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from "../Slices/auth";
import "./Wishlist.css";

interface WishlistProduct {
    _id: string;
    productId: {
        id: string; // Agar backend me _id hai, toh isko update karein
        productName: string;
        productCategory: string;
        productPrice: string;
        productDescription: string;
        image: string;
    };
}

const Wishlist: React.FC = () => {
    const [wishlistproducts, setWishlistProducts] = useState<WishlistProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const { user: currentUser } = useSelector((state: any) => state.auth);
    const history = useHistory();
    const dispatch = useDispatch();

    // ================= FETCH WISHLIST =================
    useEffect(() => {
        if (!currentUser) return;

        axios
            .get(`https://renuka-saa9.vercel.app/api/wishlist/user/${currentUser.id}`)
            .then((response) => {
                console.log("Wishlist Data:", response.data);
                setWishlistProducts(response.data);
            })
            .catch((error) => {
                console.error("Wishlist Error:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [currentUser]);

    // ================= ADD TO CART (FIXED) =================
    const handleCart = (product: any) => {
        if (!currentUser) {
            setToastMessage("Please login first");
            setShowToast(true);
            return;
        }

        // Aapke interface me field ka naam productPrice hai, price nahi.
        // ID ke liye safely dono fallback check karte hain (id ya _id)
        const data = {
            userId: currentUser.id,
            items: [
                {
                    productId: product.id || product._id,
                    quantity: 1,
                    price: product.productPrice // FIXED: product.price se badalkar product.productPrice kiya
                }
            ]
        };

        console.log("Sending Cart Payload Data:", data); // Check data formatting in console

        axios
            .post("https://renuka-saa9.vercel.app/api/carts", data)
            .then((res) => {
                console.log("Cart Success Response:", res.data);
                setToastMessage("Added To Cart Successfully");
                setShowToast(true);
            })
            .catch((error) => {
                console.error("Cart Error Response:", error.response?.data || error);
                setToastMessage(error.response?.data?.message || "Cart Error");
                setShowToast(true);
            });
    };

    // ================= DELETE WISHLIST =================
    const handleDelete = (id: string) => {
        axios
            .delete(`https://renuka-saa9.vercel.app/api/wishlist/${id}`)
            .then(() => {
                setWishlistProducts(wishlistproducts.filter((item) => item._id !== id));
                setToastMessage("Removed From Wishlist");
                setShowToast(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("user");
        history.replace("/SignIn");
    };

    return (
        <IonPage>
            <Header handleLogout={handleLogout} />
            <IonButtons slot="start">
                <IonMenuButton />
            </IonButtons>

            <IonContent className="ion-padding">
                <IonGrid>
                    {loading && (
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <IonSpinner name="crescent" />
                            </IonCol>
                        </IonRow>
                    )}

                    {/* ================= WISHLIST PRODUCTS ================= */}
                    <IonRow>
                        {wishlistproducts.map((wishlistproduct) => (
                            <IonCol
                                size="12"
                                sizeSm="6"
                                sizeMd="4"
                                sizeLg="3"
                                key={wishlistproduct._id} // FIXED: Array index se badalkar actual db unique id use ki
                            >
                                <IonCard className="wishlist-card">
                                    <IonButton
                                        fill="clear"
                                        color="danger"
                                        className="delete-btn"
                                        onClick={() => handleDelete(wishlistproduct._id)}
                                    >
                                        <IonIcon icon={trash} />
                                    </IonButton>

                                    <IonImg
                                        className="wishlist-img"
                                        src={wishlistproduct.productId?.image}
                                    />

                                    <IonCardContent>
                                        <IonText>
                                            <h2>{wishlistproduct.productId?.productName}</h2>
                                        </IonText>

                                        <p>Category : {wishlistproduct.productId?.productCategory}</p>
                                        <h3>₹ {wishlistproduct.productId?.productPrice}</h3>

                                        <IonButton
                                            expand="block"
                                            onClick={() => handleCart(wishlistproduct.productId)}
                                        >
                                            <IonIcon icon={cart} slot="start" />
                                            Add To Cart
                                        </IonButton>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        ))}
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













