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
  id: number;
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

  // FETCH ORDERS
  useEffect(() => {

    if (currentUser?.id) {

      axios
        .get(
          `https://renuka-saa9.vercel.app/api/ssorders/user/${currentUser.id}`
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

  // STATUS BAR
  const OrderStatus = ({
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
                : (currentStep /
                  (steps.length - 1)) *
                100
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
                className={`step-circle ${index <= currentStep
                    ? "active"
                    : ""
                  }`}
              >
                {index < currentStep
                  ? "✓"
                  : index + 1}
              </div>

              <p
                className={`step-text ${index <= currentStep
                    ? "active-text"
                    : ""
                  }`}
              >
                {step}
              </p>

            </div>

          ))}

        </div>

      </div>
    );
  };

  return (
    <IonPage>

      <IonContent
        fullscreen
        className="orders-page"
      >

        <IonGrid>

          <IonRow className="ion-justify-content-center">

            <IonCol
              size="12"
              sizeMd="10"
              sizeLg="8"
            >

              <div className="heading">
                <h1>My Orders</h1>
              </div>

              {orders.map((order, index) => (

                <IonCard
                  key={index}
                  className="order-card"
                >

                  {/* HEADER */}
                  <IonCardHeader>

                    <IonCardTitle>
                      Order ID: {order.id}
                    </IonCardTitle>

                    <IonCardSubtitle>
                      Date:{" "}
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </IonCardSubtitle>

                    <Link
                      to={`/Invoice/${order.id}`}
                    >
                      <IonButton
                        size="small"
                        className="invoice-btn"
                      >
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

                          {order.products?.map(
                            (item, i) => {

                              if (
                                !item ||
                                !item.productId
                              )
                                return null;

                              return (

                                <tr key={i}>

                                  <td>

                                    {item.productId
                                      ?.images
                                      ?.length > 0 && (

                                        <IonImg
                                          className="product-img"
                                          src={`https://renuka-saa9.vercel.app/uploads/${item.productId.images[0]}`}
                                          alt="product"
                                        />

                                      )}

                                  </td>

                                  <td>
                                    {
                                      item.productId
                                        ?.productName
                                    }
                                  </td>

                                  <td>
                                    {
                                      item.quantity
                                    }
                                  </td>

                                  <td>
                                    ₹ {item.price}
                                  </td>

                                </tr>

                              );
                            }
                          )}

                        </tbody>

                      </table>

                    </div>

                    {/* STATUS */}
                    <div className="status-box">

                      <OrderStatus
                        status={order.status}
                      />

                    </div>

                    {/* TOTAL */}
                    <div className="total-box">

                      <IonText>
                        <h3>
                          Status:{" "}
                          {order.status}
                        </h3>
                      </IonText>

                      <IonText color="success">
                        <h2>
                          ₹{" "}
                          {order.totalAmount}
                        </h2>
                      </IonText>

                    </div>

                  </IonCardContent>

                </IonCard>

              ))}

            </IonCol>

          </IonRow>

        </IonGrid>

      </IonContent>

    </IonPage>
  );
};

export default OrderStatus;