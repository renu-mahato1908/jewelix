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
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonInput,
  IonText,
  IonIcon
} from "@ionic/react";

import {
  cardOutline,
  cashOutline,
  walletOutline
} from "ionicons/icons";

import React, { useState } from "react";

import { useHistory } from "react-router-dom";

const Payment: React.FC = () => {

  const history = useHistory();

  const [paymentMethod, setPaymentMethod] =
    useState("");

  const [cardNumber, setCardNumber] =
    useState("");

  const [cardName, setCardName] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [cvv, setCvv] =
    useState("");

  // ================= PLACE ORDER =================

  const handlePayment = () => {

    if (!paymentMethod) {

      alert("Select Payment Method");

      return;

    }

    if (
      paymentMethod === "Card" &&
      (
        !cardNumber ||
        !cardName ||
        !expiry ||
        !cvv
      )
    ) {

      alert("Fill Card Details");

      return;

    }

    alert("Payment Successful");

    history.push("/Order");

  };

  return (

    <IonPage>

      {/* ================= HEADER ================= */}

      <IonHeader>

        <IonToolbar color="light">

          <IonTitle>

            Payment

          </IonTitle>

        </IonToolbar>

      </IonHeader>

      {/* ================= CONTENT ================= */}

      <IonContent className="ion-padding">

        <IonGrid>

          <IonRow>

            <IonCol
              size="12"
              sizeMd="8"
              offsetMd="2"
            >

              <IonCard>

                <IonCardContent>

                  <h2 className="ion-text-center">

                    Select Payment Method

                  </h2>

                  {/* ================= PAYMENT OPTIONS ================= */}

                  <IonRadioGroup
                    value={paymentMethod}
                    onIonChange={(e) =>
                      setPaymentMethod(
                        e.detail.value
                      )
                    }
                  >

                    {/* CARD */}

                    <IonItem>

                      <IonIcon
                        icon={cardOutline}
                        slot="start"
                      />

                      <IonLabel>

                        Debit / Credit Card

                      </IonLabel>

                      <IonRadio
                        slot="end"
                        value="Card"
                      />

                    </IonItem>

                    {/* COD */}

                    <IonItem>

                      <IonIcon
                        icon={cashOutline}
                        slot="start"
                      />

                      <IonLabel>

                        Cash on Delivery

                      </IonLabel>

                      <IonRadio
                        slot="end"
                        value="COD"
                      />

                    </IonItem>

                    {/* UPI */}

                    <IonItem>

                      <IonIcon
                        icon={walletOutline}
                        slot="start"
                      />

                      <IonLabel>

                        UPI Payment

                      </IonLabel>

                      <IonRadio
                        slot="end"
                        value="UPI"
                      />

                    </IonItem>

                  </IonRadioGroup>

                  {/* ================= CARD FORM ================= */}

                  {

                    paymentMethod === "Card" && (

                      <div className="ion-margin-top">

                        <IonItem>

                          <IonInput
                            label="Card Number"
                            labelPlacement="stacked"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onIonChange={(e) =>
                              setCardNumber(
                                e.detail.value!
                              )
                            }
                          />

                        </IonItem>

                        <IonItem>

                          <IonInput
                            label="Card Holder Name"
                            labelPlacement="stacked"
                            placeholder="Enter Name"
                            value={cardName}
                            onIonChange={(e) =>
                              setCardName(
                                e.detail.value!
                              )
                            }
                          />

                        </IonItem>

                        <IonRow>

                          <IonCol size="6">

                            <IonItem>

                              <IonInput
                                label="Expiry"
                                labelPlacement="stacked"
                                placeholder="MM/YY"
                                value={expiry}
                                onIonChange={(e) =>
                                  setExpiry(
                                    e.detail.value!
                                  )
                                }
                              />

                            </IonItem>

                          </IonCol>

                          <IonCol size="6">

                            <IonItem>

                              <IonInput
                                label="CVV"
                                labelPlacement="stacked"
                                type="password"
                                placeholder="123"
                                value={cvv}
                                onIonChange={(e) =>
                                  setCvv(
                                    e.detail.value!
                                  )
                                }
                              />

                            </IonItem>

                          </IonCol>

                        </IonRow>

                      </div>

                    )

                  }

                  {/* ================= UPI ================= */}

                  {

                    paymentMethod === "UPI" && (

                      <div className="ion-margin-top">

                        <IonItem>

                          <IonInput
                            label="UPI ID"
                            labelPlacement="stacked"
                            placeholder="example@upi"
                          />

                        </IonItem>

                      </div>

                    )

                  }

                  {/* ================= COD ================= */}

                  {

                    paymentMethod === "COD" && (

                      <IonText color="success">

                        <p className="ion-padding-top">

                          Pay cash when your order is delivered.

                        </p>

                      </IonText>

                    )

                  }

                  {/* ================= BUTTON ================= */}

                  <IonButton
                    expand="block"
                    color="success"
                    className="ion-margin-top"
                    onClick={handlePayment}
                  >

                    Place Order

                  </IonButton>

                </IonCardContent>

              </IonCard>

            </IonCol>

          </IonRow>

        </IonGrid>

      </IonContent>

    </IonPage>
  );
};

export default Payment;