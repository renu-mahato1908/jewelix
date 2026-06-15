import Header from "../components/Header";
import Footer from '../components/Footer'

import {
    IonButtons,
    IonContent,
    IonGrid,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonButton,
    IonImg,
    IonText,
    IonIcon,
    IonItem,
    IonLabel,
} from "@ionic/react";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { trashOutline, addOutline, removeOutline } from "ionicons/icons";
import { Link } from "react-router-dom";


// ================== Interfaces ==================

interface Product {
    id: number;
    name: string;
    images: string[];
    rice: number;
}

interface ProductDetails {
    productPrice: number;
}

interface CartItem {
    productId: number;
    quantity: number;
    productDetails?: ProductDetails;
}

interface RootState {
    auth: {
        user: {
            id: number;
        };
    };
}

interface CartItem {
    
    quantity: number;
    price: number;
}


const Cart: React.FC = () => {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [nocartItems, setNoCartItems] = useState<number>(0);
    const [products, setProducts] = useState<Record<number, Product>>({});

    const { user: currentUser } = useSelector(
        (state: RootState) => state.auth
    );

    // Fetch Cart
    useEffect(() => {

        if (currentUser?.id) {

            axios
                .get(`https://renuka-saa9.vercel.app/api/carts/user/${currentUser.id}`)
                .then((response) => {

                    console.log(response.data);

                    setCartItems(response.data.items || []);
                    setNoCartItems(response.data.itemCount || 0);

                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }, [currentUser]);

    // Fetch Products
    useEffect(() => {

        axios
            .get("https://renuka-saa9.vercel.app/api/ssproduct")
            .then((res) => {

                const productMap: Record<number, Product> = {};

                res.data.forEach((product: Product) => {
                    productMap[product.id] = product;
                });

                setProducts(productMap);

            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    // Delete Item
    const handleDelete = (id: number) => {

        axios
            .delete(
                `https://renuka-saa9.vercel.app/api/carts/user/${currentUser.id}/item/${id}`
            )
            .then(() => {

                setCartItems((prev) =>
                    prev.filter((item) => item.productId !== id)
                );

                setNoCartItems((prev) => prev - 1);

            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Quantity Update

    // const quantityUpdate = (
    //     productId: number,
    //     newQuantity: number
    // ) => {

    //     if (newQuantity < 1) return;

    //     axios
    //         .put(
    //             `https://renuka-saa9.vercel.app/api/carts/user/${currentUser.id}/item/${productId}`,
    //             { quantity: newQuantity }
    //         )
    //         .then(() => {

    //             setCartItems((prev) =>
    //                 prev.map((item) =>
    //                     item.productId === productId
    //                         ? { ...item, quantity: newQuantity }
    //                         : item
    //                 )
    //             );

    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };


    const quantityUpdate = (productId: number, newQuantity: number) => {
        console.log("Updating:", productId, newQuantity);

        axios.put(
            `https://renuka-saa9.vercel.app/api/carts/user/${currentUser.id}/item/${productId}`,
            { quantity: newQuantity }
        )
            .then((res) => {
                console.log("Success:", res.data);

                setCartItems((prev) =>
                    prev.map((item) =>
                        item.productId === productId
                            ? { ...item, quantity: newQuantity }
                            : item
                    )
                );
            })
            .catch((err) => {
                console.log("Error:", err.response?.data || err);
            });
    };

    // Total Amount
    const calculateTotal = (): number => {

        return cartItems.reduce((total: number, product: CartItem) => {

            return (
                total +
                product.quantity *
                (product.productDetails?.productPrice || 0)
            );

        }, 0);
    };



    const subTotal = calculateTotal();

    const handleLogout = () => {
        localStorage.clear();
    };

    return (

        <IonPage>

            <Header handleLogout={handleLogout} />



            <IonContent fullscreen className="ion-padding">

                <IonGrid>

                    {/* No of Items */}
                    <IonRow>
                        <IonCol size="12">

                            <IonText color="primary">
                                <h2>No of Items : {nocartItems}</h2>
                            </IonText>

                        </IonCol>
                    </IonRow>

                    {/* Cart Items */}
                    {cartItems.map((cartItem, index) => (

                        <IonCard key={index}>

                            <IonCardContent>

                                <IonRow className="ion-align-items-center">

                                    {/* Product Image */}
                                    <IonCol size="4">

                                        {products[cartItem.productId] && (

                                            <IonImg
                                                src={`https://renuka-saa9.vercel.app/upload/${products[cartItem.productId]?.images?.[0]}`}
                                            />

                                        )}

                                    </IonCol>

                                    {/* Product Details */}
                                    <IonCol size="8">

                                        <IonItem lines="none">

                                            <IonLabel>

                                                <h2>
                                                    {
                                                        products[cartItem.productId]
                                                            ?.name
                                                    }
                                                </h2>

                                                {/* <p>
                                                    ₹ {cartItem.productDetails?.productPrice || 0}
                                                    × {cartItem.quantity}
                                                </p>

                                                <h3>
                                                    Total : ₹ {
                                                        (cartItem.productDetails?.productPrice || 0)
                                                        * cartItem.quantity
                                                    }
                                                </h3> */}

                                                <p>
                                                    ₹ {cartItem.price}
                                                    × {cartItem.quantity}
                                                </p>

                                                <h3>
                                                    Total : ₹ {cartItem.price * cartItem.quantity}
                                                </h3>

                                            </IonLabel>

                                        </IonItem>

                                        {/* Quantity Buttons */}
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                                marginTop: "10px",
                                            }}
                                        >

                                            {/* Minus */}
                                            <IonButton
                                                size="small"
                                                color="danger"
                                                disabled={cartItem.quantity <= 1}
                                                onClick={() =>
                                                    quantityUpdate(
                                                        cartItem.productId,
                                                        cartItem.quantity - 1
                                                    )
                                                }
                                            >
                                                <IonIcon icon={removeOutline} />
                                            </IonButton>

                                            <strong>{cartItem.quantity}</strong>

                                            {/* Plus */}
                                            <IonButton
                                                size="small"
                                                color="success"
                                                onClick={() =>
                                                    quantityUpdate(
                                                        cartItem.productId,
                                                        cartItem.quantity + 1
                                                    )
                                                }
                                            >
                                                <IonIcon icon={addOutline} />
                                            </IonButton>

                                            {/* Delete */}
                                            <IonButton
                                                color="danger"
                                                fill="clear"
                                                onClick={() =>
                                                    handleDelete(cartItem.productId)
                                                }
                                            >
                                                <IonIcon icon={trashOutline} />
                                            </IonButton>

                                        </div>

                                    </IonCol>

                                </IonRow>

                            </IonCardContent>

                        </IonCard>

                    ))}

                    {/* Total */}
                    <IonRow>

                        <IonCol size="12" className="ion-text-center">

                            <h2>Total Amount : ₹ {subTotal}</h2>

                            <Link to="/Address">

                                <IonButton color="primary">
                                    Add Address
                                </IonButton>

                            </Link>

                        </IonCol>

                    </IonRow>

                </IonGrid>

            </IonContent>
            <Footer />
        </IonPage>
    );
};

export default Cart;




