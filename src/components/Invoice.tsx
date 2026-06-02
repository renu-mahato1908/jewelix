
// import axios from "axios";

// import React, { useEffect, useState } from "react";

// import {
//     IonPage,
//     IonContent,
//     IonGrid,
//     IonRow,
//     IonCol,
//     IonCard,
//     IonCardContent,
//     IonButton,
//     IonSpinner
// } from "@ionic/react";

// import { useSelector } from "react-redux";

// import { useParams } from "react-router-dom";

// import { usePDF } from "react-to-pdf";

// import Header from "../components/Header";

// import "./Invoice.css";

// const Invoice = () => {

//     // redux user
//     const { user: currentUser } = useSelector(
//         (state: any) => state.auth
//     );

//     // order state
//     const [order, setOrder] = useState<any>(null);

//     // order id
//     const { id }: any = useParams();

//     // pdf
//     const { toPDF, targetRef } = usePDF({
//         filename: "Invoice.pdf",
//     });

//     // api call
//     useEffect(() => {

//         console.log("Order ID :", id);

//         console.log("Current User :", currentUser);

//         axios
//             .get(
//                 `https://renuka-saa9.vercel.app/api/ssorders/${id}`
//             )

//             .then((response) => {

//                 console.log(
//                     "Invoice Response :",
//                     response.data
//                 );

//                 setOrder(response.data);

//             })

//             .catch((err) => {

//                 console.log(
//                     "Invoice Error :",
//                     err
//                 );

//             });

//     }, [id]);

//     // loading
//     if (!order) {

//         return (

//             <IonPage>

//                 <IonContent className="ion-padding">

//                     <div className="loader-box">

//                         <IonSpinner name="crescent" />

//                         <h3>
//                             Loading Invoice...
//                         </h3>

//                     </div>

//                 </IonContent>

//             </IonPage>
//         );
//     }

//     // subtotal
//     const subtotal = order.products?.reduce(
//         (acc: number, item: any) =>
//             acc + item.price * item.quantity,
//         0
//     );

//     // gst
//     const tax = subtotal * 0.18;

//     // total
//     const total = subtotal + tax;

//     return (

//         <IonPage>

//             <Header />

//             <IonContent className="ion-padding invoice-page">

//                 <IonGrid>

//                     <IonRow>

//                         <IonCol
//                             size="12"
//                             sizeMd="8"
//                             offsetMd="2"
//                         >

//                             {/* PDF CONTENT */}
//                             <div ref={targetRef}>

//                                 <IonCard className="invoice-card">

//                                     <IonCardContent>

//                                         {/* TITLE */}
//                                         <h1 className="invoice-title">
//                                             Tanishq Jewellery
//                                         </h1>

//                                         {/* ORDER */}
//                                         <div className="invoice-section">

//                                             <p>

//                                                 <strong>
//                                                     Order ID :
//                                                 </strong>{" "}

//                                                 {order.id}

//                                             </p>

//                                             <p>

//                                                 <strong>
//                                                     Date :
//                                                 </strong>{" "}

//                                                 {
//                                                     new Date(
//                                                         order.createdAt
//                                                     ).toLocaleDateString()
//                                                 }

//                                             </p>

//                                         </div>

//                                         {/* CUSTOMER */}
//                                         <div className="invoice-section">

//                                             <h3>
//                                                 Customer Details
//                                             </h3>

//                                             <p>
//                                                 {order.userId?.username}
//                                             </p>

//                                             <p>
//                                                 {order.userId?.email}
//                                             </p>

//                                         </div>

//                                         {/* ADDRESS */}
//                                         <div className="invoice-section">

//                                             <h3>
//                                                 Shipping Address
//                                             </h3>

//                                             <p>
//                                                 {order.addressId?.name}
//                                             </p>

//                                             <p>

//                                                 {
//                                                     order.addressId
//                                                         ?.addressLine1
//                                                 }

//                                                 ,{" "}

//                                                 {
//                                                     order.addressId
//                                                         ?.city
//                                                 }

//                                             </p>

//                                             <p>

//                                                 {
//                                                     order.addressId
//                                                         ?.state
//                                                 }

//                                                 {" - "}

//                                                 {
//                                                     order.addressId
//                                                         ?.pin
//                                                 }

//                                             </p>

//                                         </div>

//                                         {/* TABLE */}
//                                         <div className="table-responsive">

//                                             <table className="invoice-table">

//                                                 <thead>

//                                                     <tr>

//                                                         <th>
//                                                             Product
//                                                         </th>

//                                                         <th>
//                                                             Price
//                                                         </th>

//                                                         <th>
//                                                             Qty
//                                                         </th>

//                                                         <th>
//                                                             Total
//                                                         </th>

//                                                     </tr>

//                                                 </thead>

//                                                 <tbody>

//                                                     {
//                                                         order.products?.map(
//                                                             (
//                                                                 item: any,
//                                                                 index: number
//                                                             ) => (

//                                                                 <tr key={index}>

//                                                                     <td>

//                                                                         {
//                                                                             item.productId
//                                                                                 ?.productName
//                                                                         }

//                                                                     </td>

//                                                                     <td>

//                                                                         ₹
//                                                                         {
//                                                                             item.price.toLocaleString()
//                                                                         }

//                                                                     </td>

//                                                                     <td>

//                                                                         {
//                                                                             item.quantity
//                                                                         }

//                                                                     </td>

//                                                                     <td>

//                                                                         ₹
//                                                                         {
//                                                                             (
//                                                                                 item.price *
//                                                                                 item.quantity
//                                                                             ).toLocaleString()
//                                                                         }

//                                                                     </td>

//                                                                 </tr>
//                                                             )
//                                                         )
//                                                     }

//                                                 </tbody>

//                                             </table>

//                                         </div>

//                                         {/* SUMMARY */}
//                                         <div className="invoice-summary">

//                                             <p>

//                                                 Subtotal : ₹
//                                                 {
//                                                     subtotal.toLocaleString()
//                                                 }

//                                             </p>

//                                             <p>

//                                                 GST (18%) : ₹
//                                                 {
//                                                     tax.toFixed(2)
//                                                 }

//                                             </p>

//                                             <h2>

//                                                 Total : ₹
//                                                 {
//                                                     total.toLocaleString()
//                                                 }

//                                             </h2>

//                                         </div>

//                                     </IonCardContent>

//                                 </IonCard>

//                             </div>

//                             {/* BUTTON */}
//                             <div className="pdf-btn-box">

//                                 <IonButton
//                                     expand="block"
//                                     className="pdf-btn"
//                                     onClick={() => toPDF()}
//                                 >

//                                     Download Invoice PDF

//                                 </IonButton>

//                             </div>

//                         </IonCol>

//                     </IonRow>

//                 </IonGrid>

//             </IonContent>

//         </IonPage>
//     );
// };

// export default Invoice;


















import axios from "axios";
import React, { useEffect, useState } from "react";

import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonButton,
    IonSpinner,
} from "@ionic/react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { usePDF } from "react-to-pdf";

import Header from "../components/Header";

import "./Invoice.css";

/* =========================
   INTERFACES
========================= */

interface ProductId {
    productName: string;
}

interface OrderProduct {
    productId: ProductId;
    price: number;
    quantity: number;
}

interface UserId {
    username: string;
    email: string;
}

interface AddressId {
    name: string;
    addressLine1: string;
    city: string;
    state: string;
    pin: string;
}

interface Order {
    id: string;
    createdAt: string;

    userId: UserId;

    addressId: AddressId;

    products: OrderProduct[];
}

interface RootState {
    auth: {
        user: any;
    };
}



const Invoice: React.FC = () => {
    // redux user
    const { user: currentUser } = useSelector(
        (state: RootState) => state.auth
    );

    // order state
    const [order, setOrder] = useState<Order | null>(null);

    // order id
    const { id } = useParams<{ id: string }>();

    // pdf
    const { toPDF, targetRef } = usePDF({
        filename: "Invoice.pdf",
    });

    // api call
    useEffect(() => {
        console.log("Order ID :", id);

        console.log("Current User :", currentUser);

        axios
            .get<Order>(
                `https://renuka-saa9.vercel.app/api/ssorders/${id}`
            )

            .then((response) => {
                console.log(
                    "Invoice Response :",
                    response.data
                );

                setOrder(response.data);
            })

            .catch((err) => {
                console.log(
                    "Invoice Error :",
                    err
                );
            });

    }, [id, currentUser]);

    // loading
    if (!order) {
        return (
            <IonPage>
                <IonContent className="ion-padding">
                    <div className="loader-box">

                        <IonSpinner name="crescent" />

                        <h3>
                            Loading Invoice...
                        </h3>

                    </div>
                </IonContent>
            </IonPage>
        );
    }

    // subtotal
    const subtotal = order.products?.reduce(
        (acc: number, item: OrderProduct) =>
            acc + item.price * item.quantity,
        0
    );

    // gst
    const tax = subtotal * 0.18;

    // total
    const total = subtotal + tax;

    return (
        <IonPage>

            <Header />

            <IonContent className="ion-padding invoice-page">

                <IonGrid>

                    <IonRow>

                        <IonCol
                            size="12"
                            sizeMd="8"
                            offsetMd="2"
                        >

                            {/* PDF CONTENT */}
                            <div ref={targetRef}>

                                <IonCard className="invoice-card">

                                    <IonCardContent>

                                        {/* TITLE */}
                                        <h1 className="invoice-title">
                                            Tanishq Jewellery
                                        </h1>

                                        {/* ORDER */}
                                        <div className="invoice-section">

                                            <p>
                                                <strong>
                                                    Order ID :
                                                </strong>{" "}
                                                {order.id}
                                            </p>

                                            <p>
                                                <strong>
                                                    Date :
                                                </strong>{" "}

                                                {
                                                    new Date(
                                                        order.createdAt
                                                    ).toLocaleDateString()
                                                }

                                            </p>

                                        </div>

                                        {/* CUSTOMER */}
                                        <div className="invoice-section">

                                            <h3>
                                                Customer Details
                                            </h3>

                                            <p>
                                                {order.userId?.username}
                                            </p>

                                            <p>
                                                {order.userId?.email}
                                            </p>

                                        </div>

                                        {/* ADDRESS */}
                                        <div className="invoice-section">

                                            <h3>
                                                Shipping Address
                                            </h3>

                                            <p>
                                                {order.addressId?.name}
                                            </p>

                                            <p>

                                                {
                                                    order.addressId
                                                        ?.addressLine1
                                                }

                                                ,{" "}

                                                {
                                                    order.addressId
                                                        ?.city
                                                }

                                            </p>

                                            <p>

                                                {
                                                    order.addressId
                                                        ?.state
                                                }

                                                {" - "}

                                                {
                                                    order.addressId
                                                        ?.pin
                                                }

                                            </p>

                                        </div>

                                        {/* TABLE */}
                                        <div className="table-responsive">

                                            <table className="invoice-table">

                                                <thead>

                                                    <tr>

                                                        <th>
                                                            Product
                                                        </th>

                                                        <th>
                                                            Price
                                                        </th>

                                                        <th>
                                                            Qty
                                                        </th>

                                                        <th>
                                                            Total
                                                        </th>

                                                    </tr>

                                                </thead>

                                                <tbody>

                                                    {
                                                        order.products?.map(
                                                            (
                                                                item: OrderProduct,
                                                                index: number
                                                            ) => (

                                                                <tr key={index}>

                                                                    <td>

                                                                        {
                                                                            item.productId
                                                                                ?.productName
                                                                        }

                                                                    </td>

                                                                    <td>

                                                                        ₹
                                                                        {
                                                                            item.price.toLocaleString()
                                                                        }

                                                                    </td>

                                                                    <td>

                                                                        {
                                                                            item.quantity
                                                                        }

                                                                    </td>

                                                                    <td>

                                                                        ₹
                                                                        {
                                                                            (
                                                                                item.price *
                                                                                item.quantity
                                                                            ).toLocaleString()
                                                                        }

                                                                    </td>

                                                                </tr>
                                                            )
                                                        )
                                                    }

                                                </tbody>

                                            </table>

                                        </div>

                                        {/* SUMMARY */}
                                        <div className="invoice-summary">

                                            <p>

                                                Subtotal : ₹
                                                {
                                                    subtotal.toLocaleString()
                                                }

                                            </p>

                                            <p>

                                                GST (18%) : ₹
                                                {
                                                    tax.toFixed(2)
                                                }

                                            </p>

                                            <h2>

                                                Total : ₹
                                                {
                                                    total.toLocaleString()
                                                }

                                            </h2>

                                        </div>

                                    </IonCardContent>

                                </IonCard>

                            </div>

                            {/* BUTTON */}
                            <div className="pdf-btn-box">

                                <IonButton
                                    expand="block"
                                    className="pdf-btn"
                                    onClick={() => toPDF()}
                                >

                                    Download Invoice PDF

                                </IonButton>

                            </div>

                        </IonCol>

                    </IonRow>

                </IonGrid>

            </IonContent>

        </IonPage>
    );
};

export default Invoice;