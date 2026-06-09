


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
//     IonSpinner,
// } from "@ionic/react";

// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { usePDF } from "react-to-pdf";

// import Header from "../components/Header";

// import "./Invoice.css";

// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { Filesystem, Directory } from "@capacitor/filesystem";

// const downloadInvoice = async () => {
//     const element = targetRef.current;

//     const canvas = await html2canvas(element);
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4");
//     pdf.addImage(imgData, "PNG", 10, 10, 190, 0);

//     const pdfBase64 = pdf.output("datauristring").split(",")[1];

//     await Filesystem.writeFile({
//         path: `Invoice-${Date.now()}.pdf`,
//         data: pdfBase64,
//         directory: Directory.Documents,
//     });

//     alert("Invoice saved successfully");
// };

// /* =========================
//    INTERFACES
// ========================= */

// interface ProductId {
//     productName: string;
// }

// interface OrderProduct {
//     productId: ProductId;
//     price: number;
//     quantity: number;
// }

// interface UserId {
//     username: string;
//     email: string;
// }

// interface AddressId {
//     name: string;
//     addressLine1: string;
//     city: string;
//     state: string;
//     pin: string;
// }

// interface Order {
//     id: string;
//     createdAt: string;

//     userId: UserId;

//     addressId: AddressId;

//     products: OrderProduct[];
// }

// interface RootState {
//     auth: {
//         user: any;
//     };
// }



// const Invoice: React.FC = () => {
//     // redux user
//     const { user: currentUser } = useSelector(
//         (state: RootState) => state.auth
//     );

//     // order state
//     const [order, setOrder] = useState<Order | null>(null);

//     // order id
//     const { id } = useParams<{ id: string }>();

//     // pdf
//     const { toPDF, targetRef } = usePDF({
//         filename: "Invoice.pdf",
//     });

//     // api call
//     useEffect(() => {
//         console.log("Order ID :", id);

//         console.log("Current User :", currentUser);

//         axios
//             .get<Order>(
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

//     }, [id, currentUser]);

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
//         (acc: number, item: OrderProduct) =>
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
//                                             Jewelix Jewellery
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
//                                                                 item: OrderProduct,
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
import React, { useEffect, useState, useRef } from "react";

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
    IonText,
} from "@ionic/react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import "./Invoice.css";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Filesystem, Directory } from "@capacitor/filesystem";

/* =========================
   👑 INTERFACES (Sahi Keys Ke Saath)
========================= */
interface ProductId {
    productName: string;
    images?: string[];
}

interface OrderItem {
    productId: ProductId | null;
    price: number;
    quantity: number;
    _id?: string;
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
    userId: UserId | null;
    addressId: AddressId | null;
    items: OrderItem[];
    totalAmount?: number;
}

interface RootState {
    auth: {
        user: any;
    };
}

const Invoice: React.FC = () => {
    const { user: currentUser } = useSelector((state: RootState) => state.auth);
    const [order, setOrder] = useState<Order | null>(null);
    const [loadingError, setLoadingError] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();

    const targetRef = useRef<HTMLDivElement>(null);

    // API Call
    useEffect(() => {
        if (!id) return;

        axios
            .get<Order>(`https://renuka-saa9.vercel.app/api/ssorders/${id}`)
            .then((response) => {
                console.log("Invoice Response Data:", response.data);
                setOrder(response.data);
            })
            .catch((err) => {
                console.error("Invoice Fetch Error:", err);
                setLoadingError("Failed to load invoice details.");
            });
    }, [id, currentUser]);

    // Download Function
    const handleDownloadInvoice = async () => {
        if (!targetRef.current) return;

        try {
            const element = targetRef.current;
            const canvas = await html2canvas(element, { scale: 2, useCORS: true }); // useCORS: true image PDF me laane ke liye zaroori hai
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");
            pdf.addImage(imgData, "PNG", 10, 10, 190, 0);

            const pdfBase64 = pdf.output("datauristring").split(",")[1];

            await Filesystem.writeFile({
                path: `Invoice-${id || Date.now()}.pdf`,
                data: pdfBase64,
                directory: Directory.Documents,
            });

            alert("Invoice saved to Documents successfully!");
        } catch (error) {
            console.error("PDF Generation Error:", error);
            alert("Error saving PDF file.");
        }
    };

    if (loadingError) {
        return (
            <IonPage>
                <Header />
                <IonContent className="ion-padding">
                    <div style={{ textAlign: "center", marginTop: "50px" }}>
                        <IonText color="danger"><h3>{loadingError}</h3></IonText>
                    </div>
                </IonContent>
            </IonPage>
        );
    }

    if (!order) {
        return (
            <IonPage>
                <IonContent className="ion-padding">
                    <div className="loader-box" style={{ textAlign: "center", marginTop: "100px" }}>
                        <IonSpinner name="crescent" />
                        <h3>Loading Invoice...</h3>
                    </div>
                </IonContent>
            </IonPage>
        );
    }

    const subtotal = order.items?.reduce(
        (acc: number, item: OrderItem) => acc + (item.price || 0) * (item.quantity || 0),
        0
    ) || 0;

    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    return (
        <IonPage>
            <Header />

            <IonContent className="ion-padding invoice-page">
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" sizeMd="8" offsetMd="2">

                            {/* PDF CONTENT BOX */}
                            <div ref={targetRef}>
                                <IonCard className="invoice-card">
                                    <IonCardContent>

                                        {/* TITLE */}
                                        <h1 className="invoice-title" style={{ textAlign: "center", marginBottom: "20px" }}>
                                            Jewelix Jewellery
                                        </h1>

                                        {/* ORDER INFO */}
                                        <div className="invoice-section">
                                            <p><strong>Order ID:</strong> {order.id}</p>
                                            <p>
                                                <strong>Date:</strong>{" "}
                                                {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                                            </p>
                                        </div>

                                        {/* CUSTOMER INFO */}
                                        <div className="invoice-section" style={{ marginTop: "15px" }}>
                                            <h3>Customer Details</h3>
                                            <p><b>Name:</b> {order.userId?.username}</p>
                                            <p><b>Email:</b> {order.userId?.email}</p>
                                        </div>

                                        {/* ADDRESS INFO */}
                                        <div className="invoice-section" style={{ marginTop: "15px" }}>
                                            <h3>Shipping Address</h3>
                                            {order.addressId ? (
                                                <>
                                                    <p>{order.addressId.name}</p>
                                                    <p>{order.addressId.addressLine1}</p>
                                                    <p>{order.addressId.city}, {order.addressId.state} - {order.addressId.pin}</p>
                                                </>
                                            ) : (
                                                <p style={{ color: "#888" }}>No shipping address linked.</p>
                                            )}
                                        </div>

                                        {/* PRODUCTS TABLE */}
                                        <div className="table-responsive" style={{ marginTop: "20px" }}>
                                            <table className="invoice-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                                                <thead>
                                                    <tr style={{ background: "#f5f5f5", textAlign: "left" }}>
                                                        <th style={{ padding: "8px" }}>Product</th>
                                                        <th style={{ padding: "8px" }}>Price</th>
                                                        <th style={{ padding: "8px" }}>Qty</th>
                                                        <th style={{ padding: "8px" }}>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.items && order.items.length > 0 ? (
                                                        order.items.map((item: OrderItem, index: number) => (
                                                            <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                                                                
                                                                <td style={{ padding: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
                                                                    {item.productId?.images && item.productId.images.length > 0 ? (
                                                                        <img
                                                                            src={item.productId.images[0]}
                                                                            alt={item.productId.productName}
                                                                            style={{ width: "40px", height: "40px", borderRadius: "6px", objectFit: "cover" }}
                                                                        />
                                                                    ) : (
                                                                        <div style={{ width: "40px", height: "40px", borderRadius: "6px", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#aaa" }}>No Img</div>
                                                                    )}
                                                                    <span>{item.productId?.productName}</span>
                                                                </td>
                                                                <td style={{ padding: "8px" }}>₹{(item.price || 0).toLocaleString()}</td>
                                                                <td style={{ padding: "8px" }}>{item.quantity || 0}</td>
                                                                <td style={{ padding: "8px" }}>
                                                                    ₹{((item.price || 0) * (item.quantity || 0)).toLocaleString()}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={4} style={{ textAlign: "center", padding: "10px" }}>
                                                                No items found in this order.
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* SUMMARY SECTION */}
                                        <div className="invoice-summary" style={{ textAlign: "right", marginTop: "20px" }}>
                                            <p>Subtotal: ₹{subtotal.toLocaleString()}</p>
                                            <p>GST (18%): ₹{tax.toFixed(2)}</p>
                                            <h2 style={{ marginTop: "10px" }}>Total: ₹{total.toLocaleString()}</h2>
                                        </div>

                                    </IonCardContent>
                                </IonCard>
                            </div>

                            {/* ACTION BUTTON */}
                            <div className="pdf-btn-box" style={{ marginTop: "20px" }}>
                                <IonButton expand="block" className="pdf-btn" onClick={handleDownloadInvoice}>
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