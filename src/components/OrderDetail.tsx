import axios from "axios";
import { useEffect, useState } from "react";

import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonImg,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";

import "./OrderDetail.css";

// TYPES
interface ProductItem {
  productId: {
    productName: string;
    images: string[];
  };
  price: number;
  quantity: number;
}

interface User {
  email: string;
}

interface Order {
  id: number;
  userId: User;
  products: ProductItem[];
  status: string;
}

const OrderDetail: React.FC = () => {

  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrderId, setActiveOrderId] = useState<number | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [status, setStatus] = useState("");

  // Fetch Orders
  useEffect(() => {
    axios
      .get("https://simmering-shabby-overtake.ngrok-free.dev/api/ssorders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Open Modal
  const handleShow = (id: number) => {
    setActiveOrderId(id);
    setOrderId(id);
  };

  // Close Modal
  const handleClose = () => {
    setActiveOrderId(null);
    setOrderId(null);
    setStatus("");
  };

  // Update Status
  const updateStatus = () => {

    axios
      .put(
        `https://simmering-shabby-overtake.ngrok-free.dev/api/ssorders/${orderId}/status`,
        { status: status }
      )
      .then((res) => {

        console.log(res.data);

        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId
              ? { ...order, status: status }
              : order
          )
        );

        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <IonPage>

      <IonContent fullscreen className="orders-page">

        <IonGrid>

          <IonRow>
            <IonCol>

              <div className="order-heading">
                <h2>Orders</h2>
              </div>

              <IonAccordionGroup>

                {orders.map((order, orderIndex) => (

                  <IonAccordion
                    key={order.id}
                    value={orderIndex.toString()}
                  >

                    {/* HEADER */}
                    <IonItem slot="header" color="light">

                      <IonLabel>
                        <h2>
                          Order ID: {order.id}
                        </h2>

                        <p>
                          User: {order.userId?.email}
                        </p>
                      </IonLabel>

                    </IonItem>

                    {/* BODY */}
                    <div slot="content">

                      <IonCard className="order-card">
                        <IonCardContent>

                          <div className="table-responsive">

                            <table className="order-table">

                              <thead>
                                <tr>
                                  <th>Sl</th>
                                  <th>Product</th>
                                  <th>Image</th>
                                  <th>Price</th>
                                  <th>Qty</th>
                                  <th>Total</th>
                                </tr>
                              </thead>

                              <tbody>

                                {order.products?.map((product, index) => (

                                  <tr key={index}>

                                    <td>{index + 1}</td>

                                    <td>
                                      {product.productId?.productName}
                                    </td>

                                    <td>

                                      {product.productId?.images?.length > 0 && (

                                        <IonImg
                                          className="order-img"
                                          src={`https://simmering-shabby-overtake.ngrok-free.dev/upload/${product.productId.images[0]}`}
                                          alt="product"
                                        />

                                      )}

                                    </td>

                                    <td>
                                      ₹{product.price}
                                    </td>

                                    <td>
                                      {product.quantity}
                                    </td>

                                    <td>
                                      ₹{product.price * product.quantity}
                                    </td>

                                  </tr>

                                ))}

                              </tbody>

                            </table>

                          </div>

                          {/* STATUS */}
                          <div className="status-section">

                            <IonText>
                              <b>Status:</b>{" "}
                              {order.status || "Pending"}
                            </IonText>

                            <IonButton
                              size="small"
                              className="update-btn"
                              onClick={() =>
                                handleShow(order.id)
                              }
                            >
                              Update
                            </IonButton>

                          </div>

                        </IonCardContent>
                      </IonCard>

                      {/* MODAL */}
                      <IonModal
                        isOpen={activeOrderId === order.id}
                        onDidDismiss={handleClose}
                      >

                        <IonHeader>
                          <IonToolbar>

                            <IonTitle>
                              Update Status
                            </IonTitle>

                            <IonButtons slot="end">

                              <IonButton onClick={handleClose}>
                                Close
                              </IonButton>

                            </IonButtons>

                          </IonToolbar>
                        </IonHeader>

                        <IonContent className="ion-padding">

                          <h3>
                            Order ID: {order.id}
                          </h3>

                          <IonSelect
                            label="Select Status"
                            value={status}
                            placeholder="Choose Status"
                            onIonChange={(e) =>
                              setStatus(e.detail.value)
                            }
                          >

                            <IonSelectOption value="Ordered">
                              Ordered
                            </IonSelectOption>

                            <IonSelectOption value="Shipped">
                              Shipped
                            </IonSelectOption>

                            <IonSelectOption value="Out for Delivery">
                              Out for Delivery
                            </IonSelectOption>

                            <IonSelectOption value="Delivered">
                              Delivered
                            </IonSelectOption>

                          </IonSelect>

                          <IonButton
                            expand="block"
                            className="save-btn"
                            onClick={updateStatus}
                          >
                            Save Changes
                          </IonButton>

                        </IonContent>

                      </IonModal>

                    </div>

                  </IonAccordion>

                ))}

              </IonAccordionGroup>

            </IonCol>
          </IonRow>

        </IonGrid>

      </IonContent>

    </IonPage>
  );
};

export default OrderDetail;