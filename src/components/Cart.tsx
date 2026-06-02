

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
    productName: string;
    images: string[];
    productPrice: number;
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
            .get("https://renuka-saa9.vercel.app/api/ssproducts")
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
    const quantityUpdate = (
        productId: number,
        newQuantity: number
    ) => {

        if (newQuantity < 1) return;

        axios
            .put(
                `https://renuka-saa9.vercel.app/api/carts/user/${currentUser.id}/item/${productId}`,
                { quantity: newQuantity }
            )
            .then(() => {

                setCartItems((prev) =>
                    prev.map((item) =>
                        item.productId === productId
                            ? { ...item, quantity: newQuantity }
                            : item
                    )
                );

            })
            .catch((err) => {
                console.log(err);
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

    return (

        <IonPage>

            <IonHeader>
                <IonToolbar>

                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>

                    <IonTitle>Cart</IonTitle>

                </IonToolbar>
            </IonHeader>

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
                                                src={`renuka-saa9-git-main-renu-mahato1908s-projects.vercel.appupload/${products[cartItem.productId]?.images?.[0]}`}
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
                                                            ?.productName
                                                    }
                                                </h2>

                                                <p>
                                                    ₹ {cartItem.productDetails?.productPrice || 0}
                                                    × {cartItem.quantity}
                                                </p>

                                                <h3>
                                                    Total : ₹ {
                                                        (cartItem.productDetails?.productPrice || 0)
                                                        * cartItem.quantity
                                                    }
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

        </IonPage>
    );
};

export default Cart;













//  import Header from "../components/Header";
// import {
//     IonButtons,
//     IonContent,
//     IonGrid,
//     IonHeader,
//     IonMenuButton,
//     IonPage,
//     IonTitle,
//     IonToolbar,
//     IonRow,
//     IonCol,
//     IonCard,
//     IonCardContent,
//     IonButton,
//     IonImg,
//     IonText,
//     IonIcon,
//     IonItem,
//     IonLabel,
//     IonModal,
//     IonInput,
//     IonRadioGroup,
//     IonRadio,
//     IonBadge
// } from "@ionic/react";

// import axios from "axios";

// import React, { useEffect, useState } from "react";

// import { useSelector } from "react-redux";

// import {
//     trashOutline,
//     addOutline,
//     removeOutline
// } from "ionicons/icons";

// import { Formik, Form } from "formik";

// import * as Yup from "yup";

// import { useHistory } from "react-router-dom";

// // ================== Interfaces ==================

// interface Product {
//     id: number;
//     productName: string;
//     images: string[];
//     productPrice: number;
// }

// interface ProductDetails {
//     productPrice: number;
// }

// interface CartItem {
//     productId: number;
//     quantity: number;
//     productDetails?: ProductDetails;
// }

// interface RootState {
//     auth: {
//         user: {
//             id: number;
//         };
//     };
// }

// // ================= VALIDATION =================

// const AddressSchema = Yup.object().shape({

//     name: Yup.string()
//         .required("Name is required"),

//     addressLine1: Yup.string()
//         .required("Address Line 1 is required"),

//     addressLine2: Yup.string()
//         .required("Address Line 2 is required"),

//     city: Yup.string()
//         .required("City is required"),

//     district: Yup.string()
//         .required("District is required"),

//     state: Yup.string()
//         .required("State is required"),

//     pin: Yup.string()
//         .required("Pin is required"),

//     mobile: Yup.string()
//         .required("Mobile is required"),

//     email: Yup.string()
//         .email("Invalid Email")
//         .required("Email is required"),

//     addressType: Yup.string()
//         .required("Select Address Type")

// });

// const Cart: React.FC = () => {

//     const history = useHistory();

//     const [cartItems, setCartItems] =
//         useState<CartItem[]>([]);

//     const [nocartItems, setNoCartItems] =
//         useState<number>(0);

//     const [products, setProducts] =
//         useState<Record<number, Product>>({});

//     const [showModal, setShowModal] =
//         useState(false);

//     const [addresses, setAddresses] =
//         useState<any[]>([]);

//     const [selectedAddress, setSelectedAddress] =
//         useState("");

//     const { user: currentUser } =
//         useSelector(
//             (state: RootState) => state.auth
//         );

//     // ================= FETCH CART =================

//     useEffect(() => {

//         if (currentUser?.id) {

//             axios
//                 .get(
//                     `https://renuka-saa9.vercel.app/api/carts/user/${currentUser.id}`
//                 )
//                 .then((response) => {

//                     setCartItems(
//                         response.data.items || []
//                     );

//                     setNoCartItems(
//                         response.data.itemCount || 0
//                     );

//                 })
//                 .catch((err) => {

//                     console.log(err);

//                 });

//         }

//     }, [currentUser]);

//     // ================= FETCH PRODUCTS =================

//     useEffect(() => {

//         axios
//             .get(
//                 "https://renuka-saa9.vercel.app/api/ssproducts"
//             )
//             .then((res) => {

//                 const productMap:
//                     Record<number, Product> = {};

//                 res.data.forEach(
//                     (product: Product) => {

//                         productMap[product.id] =
//                             product;

//                     }
//                 );

//                 setProducts(productMap);

//             })
//             .catch((err) => {

//                 console.log(err);

//             });

//     }, []);

//     // ================= FETCH ADDRESS =================

//     useEffect(() => {

//         if (!currentUser?.id) return;

//         axios
//             .get(
//                 `https://renuka-saa9.vercel.app/api/addresses/user/${currentUser.id}`
//             )
//             .then((response) => {

//                 setAddresses(response.data);

//             })
//             .catch((err) => {

//                 console.log(err);

//             });

//     }, [currentUser]);

//     // ================= DELETE ITEM =================

//     const handleDelete = (
//         id: number
//     ) => {

//         axios
//             .delete(
//                 `https://renuka-saa9.vercel.app/api/carts/user/${currentUser.id}/item/${id}`
//             )
//             .then(() => {

//                 setCartItems((prev) =>
//                     prev.filter(
//                         (item) =>
//                             item.productId !== id
//                     )
//                 );

//                 setNoCartItems(
//                     (prev) => prev - 1
//                 );

//             })
//             .catch((err) => {

//                 console.log(err);

//             });

//     };

//     // ================= UPDATE QUANTITY =================

//     const quantityUpdate = (
//         productId: number,
//         newQuantity: number
//     ) => {

//         if (newQuantity < 1) return;

//         axios
//             .put(
//                 `https://renuka-saa9.vercel.app/api/carts/user/${currentUser.id}/item/${productId}`,
//                 {
//                     quantity: newQuantity
//                 }
//             )
//             .then(() => {

//                 setCartItems((prev) =>
//                     prev.map((item) =>
//                         item.productId === productId
//                             ? {
//                                 ...item,
//                                 quantity: newQuantity
//                             }
//                             : item
//                     )
//                 );

//             })
//             .catch((err) => {

//                 console.log(err);

//             });

//     };

//     // ================= TOTAL =================

//     const calculateTotal = () => {

//         return cartItems.reduce(
//             (
//                 total: number,
//                 product: CartItem
//             ) => {

//                 return (
//                     total +
//                     product.quantity *
//                     (
//                         product.productDetails
//                             ?.productPrice || 0
//                     )
//                 );

//             },
//             0
//         );
//     };

//     const subTotal = calculateTotal();

//     const handleLogout = () => {
//     localStorage.clear();
//   };


//     return (

//         <IonPage>

//          <Header handleLogout={handleLogout} />


//             {/* ================= HEADER ================= */}

//             <IonHeader>

//                 <IonToolbar>

//                     <IonButtons slot="start">

//                         <IonMenuButton />

//                     </IonButtons>

//                     <IonTitle>

//                         Cart

//                     </IonTitle>

//                 </IonToolbar>

//             </IonHeader>

//             {/* ================= CONTENT ================= */}

//             <IonContent
//                 fullscreen
//                 className="ion-padding"
//             >

//                 <IonGrid>

//                     {/* ================= ITEM COUNT ================= */}

//                     <IonRow>

//                         <IonCol size="12">

//                             <IonText color="primary">

//                                 <h2>

//                                     No of Items :
//                                     {" "}
//                                     {nocartItems}

//                                 </h2>

//                             </IonText>

//                         </IonCol>

//                     </IonRow>

//                     {/* ================= CART ITEMS ================= */}

//                     {

//                         cartItems.map(
//                             (cartItem, index) => (

//                                 <IonCard key={index}>

//                                     <IonCardContent>

//                                         <IonRow className="ion-align-items-center">

//                                             {/* IMAGE */}

//                                             <IonCol size="4">

//                                                 {

//                                                     products[
//                                                     cartItem.productId
//                                                     ] && (

//                                                         <IonImg
//                                                             src={`renuka-saa9-git-main-renu-mahato1908s-projects.vercel.appupload/${products[cartItem.productId]?.images?.[0]}`}
//                                                         />

//                                                     )

//                                                 }

//                                             </IonCol>

//                                             {/* DETAILS */}

//                                             <IonCol size="8">

//                                                 <IonItem lines="none">

//                                                     <IonLabel>

//                                                         <h2>

//                                                             {
//                                                                 products[
//                                                                     cartItem.productId
//                                                                 ]
//                                                                     ?.productName
//                                                             }

//                                                         </h2>

//                                                         <p>

//                                                             ₹
//                                                             {" "}

//                                                             {
//                                                                 cartItem
//                                                                     .productDetails
//                                                                     ?.productPrice
//                                                             }

//                                                             ×

//                                                             {" "}

//                                                             {
//                                                                 cartItem.quantity
//                                                             }

//                                                         </p>

//                                                         <h3>

//                                                             Total :
//                                                             {" "}
//                                                             ₹
//                                                             {" "}

//                                                             {
//                                                                 (
//                                                                     cartItem
//                                                                         .productDetails
//                                                                         ?.productPrice || 0
//                                                                 ) *
//                                                                 cartItem.quantity
//                                                             }

//                                                         </h3>

//                                                     </IonLabel>

//                                                 </IonItem>

//                                                 {/* BUTTONS */}

//                                                 <div
//                                                     style={{
//                                                         display: "flex",
//                                                         alignItems:
//                                                             "center",
//                                                         gap: "10px",
//                                                         marginTop: "10px"
//                                                     }}
//                                                 >

//                                                     {/* MINUS */}

//                                                     <IonButton
//                                                         size="small"
//                                                         color="danger"
//                                                         disabled={
//                                                             cartItem.quantity <= 1
//                                                         }
//                                                         onClick={() =>
//                                                             quantityUpdate(
//                                                                 cartItem.productId,
//                                                                 cartItem.quantity - 1
//                                                             )
//                                                         }
//                                                     >

//                                                         <IonIcon
//                                                             icon={
//                                                                 removeOutline
//                                                             }
//                                                         />

//                                                     </IonButton>

//                                                     <strong>

//                                                         {
//                                                             cartItem.quantity
//                                                         }

//                                                     </strong>

//                                                     {/* PLUS */}

//                                                     <IonButton
//                                                         size="small"
//                                                         color="success"
//                                                         onClick={() =>
//                                                             quantityUpdate(
//                                                                 cartItem.productId,
//                                                                 cartItem.quantity + 1
//                                                             )
//                                                         }
//                                                     >

//                                                         <IonIcon
//                                                             icon={
//                                                                 addOutline
//                                                             }
//                                                         />

//                                                     </IonButton>

//                                                     {/* DELETE */}

//                                                     <IonButton
//                                                         color="danger"
//                                                         fill="clear"
//                                                         onClick={() =>
//                                                             handleDelete(
//                                                                 cartItem.productId
//                                                             )
//                                                         }
//                                                     >

//                                                         <IonIcon
//                                                             icon={
//                                                                 trashOutline
//                                                             }
//                                                         />

//                                                     </IonButton>

//                                                 </div>

//                                             </IonCol>

//                                         </IonRow>

//                                     </IonCardContent>

//                                 </IonCard>

//                             )
//                         )

//                     }

//                     {/* ================= TOTAL ================= */}

//                     <IonRow>

//                         <IonCol
//                             size="12"
//                             className="ion-text-center"
//                         >

//                             <h2>

//                                 Total Amount :
//                                 {" "}
//                                 ₹
//                                 {" "}
//                                 {subTotal}

//                             </h2>

//                             <IonButton
//                                 color="primary"
//                                 onClick={() =>
//                                     setShowModal(true)
//                                 }
//                             >

//                                 Add Address

//                             </IonButton>

//                         </IonCol>

//                     </IonRow>

//                 </IonGrid>

//                 {/* ================= MODAL ================= */}

//                 <IonModal
//                     isOpen={showModal}
//                     onDidDismiss={() =>
//                         setShowModal(false)
//                     }
//                 >

//                     <IonHeader>

//                         <IonToolbar>

//                             <IonTitle>

//                                 Address

//                             </IonTitle>

//                             <IonButtons slot="end">

//                                 <IonButton
//                                     onClick={() =>
//                                         setShowModal(false)
//                                     }
//                                 >

//                                     Close

//                                 </IonButton>

//                             </IonButtons>

//                         </IonToolbar>

//                     </IonHeader>

//                     <IonContent className="ion-padding">

//                         {/* ================= FORM ================= */}

//                         <Formik

//                             initialValues={{
//                                 name: "",
//                                 addressLine1: "",
//                                 addressLine2: "",
//                                 city: "",
//                                 district: "",
//                                 state: "",
//                                 pin: "",
//                                 mobile: "",
//                                 email: "",
//                                 addressType: ""
//                             }}

//                             validationSchema={
//                                 AddressSchema
//                             }

//                             onSubmit={(
//                                 values,
//                                 { resetForm }
//                             ) => {

//                                 const data = {
//                                     ...values,
//                                     userId:
//                                         currentUser.id
//                                 };

//                                 axios
//                                     .post(
//                                         "https://renuka-saa9.vercel.app/api/addresses",
//                                         data
//                                     )
//                                     .then(
//                                         (response) => {

//                                             setAddresses([
//                                                 ...addresses,
//                                                 response.data
//                                             ]);

//                                             resetForm();

//                                             alert(
//                                                 "Address Saved"
//                                             );

//                                         }
//                                     )
//                                     .catch((err) => {

//                                         console.log(err);

//                                     });

//                             }}

//                         >

//                             {({
//                                 values,
//                                 handleChange,
//                                 handleSubmit,
//                                 setFieldValue,
//                                 errors,
//                                 touched
//                             }) => (

//                                 <Form>

//                                     <IonItem>

//                                         <IonInput
//                                             label="Name"
//                                             labelPlacement="stacked"
//                                             name="name"
//                                             value={values.name}
//                                             onIonChange={
//                                                 handleChange
//                                             }
//                                         />

//                                     </IonItem>

//                                     {
//                                         errors.name &&
//                                         touched.name && (

//                                             <p style={{ color: "red" }}>
//                                                 {errors.name}
//                                             </p>

//                                         )
//                                     }

//                                     <IonItem>

//                                         <IonInput
//                                             label="Address Line 1"
//                                             labelPlacement="stacked"
//                                             name="addressLine1"
//                                             value={
//                                                 values.addressLine1
//                                             }
//                                             onIonChange={
//                                                 handleChange
//                                             }
//                                         />

//                                     </IonItem>

//                                     <IonItem>

//                                         <IonInput
//                                             label="Address Line 2"
//                                             labelPlacement="stacked"
//                                             name="addressLine2"
//                                             value={
//                                                 values.addressLine2
//                                             }
//                                             onIonChange={
//                                                 handleChange
//                                             }
//                                         />

//                                     </IonItem>

//                                     <IonItem>

//                                         <IonInput
//                                             label="City"
//                                             labelPlacement="stacked"
//                                             name="city"
//                                             value={values.city}
//                                             onIonChange={
//                                                 handleChange
//                                             }
//                                         />

//                                     </IonItem>

//                                     <IonItem>

//                                         <IonInput
//                                             label="District"
//                                             labelPlacement="stacked"
//                                             name="district"
//                                             value={
//                                                 values.district
//                                             }
//                                             onIonChange={
//                                                 handleChange
//                                             }
//                                         />

//                                     </IonItem>

//                                     <IonItem>

//                                         <IonInput
//                                             label="State"
//                                             labelPlacement="stacked"
//                                             name="state"
//                                             value={values.state}
//                                             onIonChange={
//                                                 handleChange
//                                             }
//                                         />

//                                     </IonItem>

//                                     <IonItem>

//                                         <IonInput
//                                             label="Pin"
//                                             type="number"
//                                             labelPlacement="stacked"
//                                             name="pin"
//                                             value={values.pin}
//                                             onIonChange={
//                                                 handleChange
//                                             }
//                                         />

//                                     </IonItem>

//                                     <IonItem>

//                                         <IonInput
//                                             label="Mobile"
//                                             type="number"
//                                             labelPlacement="stacked"
//                                             name="mobile"
//                                             value={values.mobile}
//                                             onIonChange={
//                                                 handleChange
//                                             }
//                                         />

//                                     </IonItem>

//                                     <IonItem>

//                                         <IonInput
//                                             label="Email"
//                                             type="email"
//                                             labelPlacement="stacked"
//                                             name="email"
//                                             value={values.email}
//                                             onIonChange={
//                                                 handleChange
//                                             }
//                                         />

//                                     </IonItem>

//                                     {/* ADDRESS TYPE */}

//                                     <IonRadioGroup
//                                         value={
//                                             values.addressType
//                                         }
//                                         onIonChange={(e) =>
//                                             setFieldValue(
//                                                 "addressType",
//                                                 e.detail.value
//                                             )
//                                         }
//                                     >

//                                         <IonItem>

//                                             <IonLabel>

//                                                 Home

//                                             </IonLabel>

//                                             <IonRadio
//                                                 slot="start"
//                                                 value="Home"
//                                             />

//                                         </IonItem>

//                                         <IonItem>

//                                             <IonLabel>

//                                                 Office

//                                             </IonLabel>

//                                             <IonRadio
//                                                 slot="start"
//                                                 value="Office"
//                                             />

//                                         </IonItem>

//                                     </IonRadioGroup>

//                                     <IonButton
//                                         expand="block"
//                                         className="ion-margin-top"
//                                         onClick={() =>
//                                             handleSubmit()
//                                         }
//                                     >

//                                         Save Address

//                                     </IonButton>

//                                 </Form>

//                             )}

//                         </Formik>

//                         {/* ================= SAVED ADDRESS ================= */}

//                         <div className="ion-margin-top">

//                             <h2>

//                                 Saved Address

//                             </h2>

//                             <IonRadioGroup
//                                 value={selectedAddress}
//                                 onIonChange={(e) =>
//                                     setSelectedAddress(
//                                         e.detail.value
//                                     )
//                                 }
//                             >

//                                 {

//                                     addresses.map(
//                                         (address, index) => (

//                                             <IonCard key={index}>

//                                                 <IonCardContent>

//                                                     <IonItem lines="none">

//                                                         <IonRadio
//                                                             slot="start"
//                                                             value={address.id}
//                                                         />

//                                                         <IonLabel>

//                                                             <h3>

//                                                                 {
//                                                                     address.name
//                                                                 }

//                                                             </h3>

//                                                             <p>

//                                                                 {
//                                                                     address.addressLine1
//                                                                 }

//                                                                 ,

//                                                                 {" "}

//                                                                 {
//                                                                     address.addressLine2
//                                                                 }

//                                                                 ,

//                                                                 {" "}

//                                                                 {
//                                                                     address.city
//                                                                 }

//                                                                 ,

//                                                                 {" "}

//                                                                 {
//                                                                     address.state
//                                                                 }

//                                                                 ,

//                                                                 {" "}

//                                                                 {
//                                                                     address.pin
//                                                                 }

//                                                             </p>

//                                                             <p>

//                                                                 Mobile :
//                                                                 {" "}

//                                                                 {
//                                                                     address.mobile
//                                                                 }

//                                                             </p>

//                                                             <IonBadge color="primary">

//                                                                 {
//                                                                     address.addressType
//                                                                 }

//                                                             </IonBadge>

//                                                         </IonLabel>

//                                                     </IonItem>

//                                                 </IonCardContent>

//                                             </IonCard>

//                                         )
//                                     )

//                                 }

//                             </IonRadioGroup>

//                             {/* NEXT BUTTON */}

//                             <IonButton
//                                 expand="block"
//                                 color="success"
//                                 className="ion-margin-top"
//                                 disabled={!selectedAddress}
//                                 onClick={() => {

//                                     history.push("/Order");

//                                 }}
//                             >

//                                 Next

//                             </IonButton>

//                         </div>

//                     </IonContent>

//                 </IonModal>

//             </IonContent>

//         </IonPage>
//     );
// };

// export default Cart;