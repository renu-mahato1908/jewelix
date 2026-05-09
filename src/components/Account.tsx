import React, { useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonButtons,
  IonMenuButton
} from "@ionic/react";

import { Link, useHistory, } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import "./Account.css";

const Account: React.FC = () => {
  const history = useHistory();

  const { user: currentUser } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (!currentUser) {
      history.push("/Login");
    }
  }, [currentUser, history]);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());          // Redux state clear
    localStorage.removeItem("user");
    history.replace("/SignIn");   // redirect to login page
  };


  return (
    <IonPage>

      <IonHeader>
        <IonToolbar className="header-toolbar">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>


          <div className="logo">
            <img src="https://zerocreativity0.wordpress.com/wp-content/uploads/2016/05/tanishq-logo.jpg?w=768&h=576" className="logo" />
          </div>

          <IonButtons slot="end">
            <IonButton onClick={handleLogout} className="logout-btn">
              Logout
            </IonButton>
          </IonButtons>

        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding account-page">
        <IonGrid>
          {/* HEADING */}
          <IonRow>
            <IonCol size="12">
              <div className="account-heading">
                <h1>My Account</h1>
                <p>Manage your jewellery account ✨</p>
              </div>
            </IonCol>
          </IonRow>

          {/* MAIN CONTENT */}
          <IonRow>
            {/* LEFT MENU */}


            {/* ACCOUNT DETAILS */}
            <IonCol size="12" size-md="5">
              <IonCard className="account-card">
                <IonCardContent>
                  <h2>Account Details</h2>

                  {currentUser && (
                    <div className="account-info">
                      <p>
                        <strong>Mobile :</strong>{" "}
                        {currentUser.username}
                      </p>

                      <p>
                        <strong>Email :</strong>{" "}
                        {currentUser.email}
                      </p>
                    </div>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* RIGHT SIDE */}
            {/* <IonCol size="12" size-md="4">
              <IonCard className="quick-card">
                <IonCardContent>
                  <h2>Quick Links</h2>

                  <div className="quick-links">
                    <Link to="/Cart">Cart</Link>

                    <Link to="/Wishlist">
                      Wishlist
                    </Link>

                    <Link to="/Addnewaddress">
                      Add New Address
                    </Link>

                    <Link to="/Orderstatus">
                      Order Status
                    </Link>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol> */}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Account;