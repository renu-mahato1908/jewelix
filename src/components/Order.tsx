import axios from "axios";
import { useEffect, useState } from "react";

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
    IonButton,
    IonToast,
    IonIcon,
    IonText,
} from "@ionic/react";

import { useHistory } from "react-router-dom";

import {
    checkmarkCircle,
    happyOutline,
} from "ionicons/icons";

const Order: React.FC = () => {

    const history = useHistory();

    const [showToast, setShowToast] = useState(true);

    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {

        axios
            .get("https://simmering-shabby-overtake.ngrok-free.dev/api/ssorders")
            .then((response) => {

                console.log("API Response:", response.data);

                setOrders(response.data);

            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    return (

        <IonPage>

            <IonHeader>
                <IonToolbar color="light">

                    <IonTitle>
                        Order Success
                    </IonTitle>

                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">

                <IonGrid>

                    <IonRow className="ion-justify-content-center">

                        <IonCol size="12" size-md="6">

                            <IonCard
                                style={{
                                    textAlign: "center",
                                    padding: "20px",
                                    borderRadius: "20px",
                                }}
                            >

                                <IonCardContent>

                                    {/* Success Icon */}
                                    <IonIcon
                                        icon={checkmarkCircle}
                                        style={{
                                            fontSize: "70px",
                                            color: "green",
                                        }}
                                    />

                                    <IonText color="success">

                                        <h2>
                                            Order Placed Successfully
                                        </h2>

                                    </IonText>

                                    <p>
                                        Your order has been confirmed.
                                    </p>

                                    {/* Party Icons */}
                                    <div
                                        style={{
                                            marginTop: "15px",
                                            marginBottom: "15px",
                                        }}
                                    >

                                        <IonIcon
                                            icon={happyOutline}
                                            style={{
                                                fontSize: "35px",
                                                color: "orange",
                                                margin: "5px",
                                            }}
                                        />

                                        <IonIcon
                                            icon={happyOutline}
                                            style={{
                                                fontSize: "35px",
                                                color: "purple",
                                                margin: "5px",
                                            }}
                                        />

                                        <IonIcon
                                            icon={happyOutline}
                                            style={{
                                                fontSize: "35px",
                                                color: "green",
                                                margin: "5px",
                                            }}
                                        />

                                    </div>

                                    {/* Button */}
                                    <IonButton
                                        expand="block"
                                        color="success"
                                        onClick={() => history.push("/Home")}
                                    >

                                        Continue Shopping

                                    </IonButton>

                                </IonCardContent>

                            </IonCard>

                        </IonCol>

                    </IonRow>

                </IonGrid>

                {/* Toast */}
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message="Order placed successfully 🎉"
                    duration={3000}
                    color="success"
                />

            </IonContent>

        </IonPage>
    );
};

export default Order;