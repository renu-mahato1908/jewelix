



import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonImg,
  IonText,
} from "@ionic/react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Orderstatus.css";

// TYPES
interface Product {
  productName: string;
  images: string[];
}

interface OrderItem {
  productId: Product;
  quantity: number;
  price: number;
}

interface Order {
  id: any;
  products: OrderItem[];
  status: string;
  totalAmount: number;
  createdAt: string;
}

const OrderStatus: React.FC = () => {

  const { user: currentUser } = useSelector(
    (state: any) => state.auth
  );

  const [orders, setOrders] = useState<Order[]>([]);
  const currentUserId = currentUser?._id || currentUser?.id;


  // FETCH ORDERS
  useEffect(() => {
    if (currentUser?.id) {
      axios
        .get(
          `https://renuka-saa9.vercel.app/api/ssorders/user/${currentUserId}`
        )
        .then((response) => {
          const sortedOrders = response.data.sort(
            (a: Order, b: Order) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          );
          setOrders(sortedOrders);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser]);

  // STATUS BAR COMPONENT
  const OrderStatusBar = ({
    status,
  }: {
    status: string;
  }) => {
    const steps = [
      "Ordered",
      "Shipped",
      "Out for Delivery",
      "Delivered",
    ];

    const currentStep = steps.findIndex(
      (step) =>
        step.toLowerCase() === status?.toLowerCase()
    );

    return (
      <div className="status-wrapper">
        {/* LINE */}
        <div className="status-line"></div>

        {/* ACTIVE LINE */}
        <div
          className="status-line-active"
          style={{
            width: `${currentStep === -1
              ? 0
              : (currentStep / (steps.length - 1)) * 100
              }%`,
          }}
        ></div>

        {/* STEPS */}
        <div className="status-steps">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-box"
            >
              <div
                className={`step-circle ${index <= currentStep ? "active" : ""}`}
              >
                {index < currentStep ? "✓" : index + 1}
              </div>
              <p
                className={`step-text ${index <= currentStep ? "active-text" : ""}`}
              >
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // IMAGE SRC LOGIC FUNCTION
  const getProductImageSrc = (images: string[] | undefined) => {
    if (!images || images.length === 0) return "assets/placeholder.png"; // Fallback image if empty

    const firstImage = images[0];

    // Agar database mein pehle se hi http/https wala full URL saved hai
    if (firstImage.startsWith("http://") || firstImage.startsWith("https://")) {
      return firstImage;
    }

    // Agar database mein sirf file ka naam hai (jaise: abc.jpg)
    return `https://renuka-saa9.vercel.app/upload/${firstImage}`;
  };

  return (
    <IonPage>
      <IonContent fullscreen className="orders-page">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8">

              <div className="heading">
                <h1>My Orders</h1>
              </div>

              {orders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <IonText color="medium">No orders found.</IonText>
                </div>
              ) : (
                orders.map((order, index) => (
                  <IonCard key={index} className="order-card">

                    {/* HEADER */}
                    <IonCardHeader>
                      <IonCardTitle>
                        Order ID: {order.id}
                      </IonCardTitle>
                      <IonCardSubtitle>
                        Date: {new Date(order.createdAt).toLocaleString()}
                      </IonCardSubtitle>
                      <Link to={`/Invoice/${order.id}`}>
                        <IonButton size="small" className="invoice-btn">
                          Invoice
                        </IonButton>
                      </Link>
                    </IonCardHeader>

                    {/* BODY */}
                    <IonCardContent>
                      <div className="table-responsive">
                        <table className="order-table">
                          <thead>
                            <tr>
                              <th>Image</th>
                              <th>Product</th>
                              <th>Qty</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.products?.map((item, i) => {
                              if (!item || !item.productId) return null;

                              return (
                                <tr key={i}>
                                  <td>
                                    {/* Image Rendering Section with safe checks */}
                                    <IonImg
                                      className="product-img"
                                      src={getProductImageSrc(item.productId?.images)}
                                      alt={item.productId?.productName || "product"}
                                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                    />
                                  </td>
                                  <td>
                                    {item.productId?.productName || "Unnamed Product"}
                                  </td>
                                  <td>{item.quantity}</td>
                                  <td>₹ {item.price}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* STATUS BAR */}
                      <div className="status-box">
                        <OrderStatusBar status={order.status} />
                      </div>

                      {/* TOTAL */}
                      <div className="total-box">
                        <IonText>
                          <h3>Status: {order.status}</h3>
                        </IonText>
                        <IonText color="success">
                          <h2>₹ {order.totalAmount}</h2>
                        </IonText>
                      </div>

                    </IonCardContent>
                  </IonCard>
                ))
              )}

            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default OrderStatus;
