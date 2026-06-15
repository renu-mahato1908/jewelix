// import Header from "../components/Header";

// import React, { useEffect } from "react";
// import {
//   IonPage,
//   IonContent,
//   IonGrid,
//   IonRow,
//   IonCol,
//   IonCard,
//   IonCardContent,
//   IonHeader,
//   IonToolbar,
//   IonButton,
//   IonButtons,
//   IonMenuButton
// } from "@ionic/react";

// import { Link, useHistory, } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

// // import "./Account.css";

// const Account: React.FC = () => {
//   const history = useHistory();

//   const { user: currentUser } = useSelector(
//     (state: any) => state.auth
//   );

//   useEffect(() => {
//     if (!currentUser) {
//       history.push("/Login");
//     }
//   }, [currentUser, history]);

//   const dispatch = useDispatch();

//   // const handleLogout = () => {
//   //   dispatch(logout());          // Redux state clear
//   //   localStorage.removeItem("user");
//   //   history.replace("/SignIn");   // redirect to login page
//   // };

//    const handleLogout = () => {
//         localStorage.clear();
//     };


//   return (
//     <IonPage>


//         <Header handleLogout={handleLogout} />


//       {/* <IonHeader>
//         <IonToolbar className="header-toolbar">
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>


//           <div className="logo">
//             <img src="http://zerocreativity0.wordpress.com/wp-content/uploads/2016/05/tanishq-logo.jpg?w=768&h=576" className="logo" />
//           </div>

//           <IonButtons slot="end">
//             <IonButton onClick={handleLogout} className="logout-btn">
//               Logout
//             </IonButton>
//           </IonButtons>

//         </IonToolbar>
//       </IonHeader> */}

//       <IonContent className="ion-padding account-page">
//         <IonGrid>
//           {/* HEADING */}
//           <IonRow>
//             <IonCol size="12">
//               <div className="account-heading">
//                 <h1>My Account</h1>
//                 <p>Manage your jewellery account ✨</p>
//               </div>
//             </IonCol>
//           </IonRow>

//           {/* MAIN CONTENT */}
//           <IonRow>
//             {/* LEFT MENU */}


//             {/* ACCOUNT DETAILS */}
//             <IonCol size="12" size-md="5">
//               <IonCard className="account-card">
//                 <IonCardContent>
//                   <h2>Account Details</h2>

//                   {currentUser && (
//                     <div className="account-info">
//                       <p>
//                         <strong>Mobile :</strong>{" "}
//                         {currentUser.username}
//                       </p>

//                       <p>
//                         <strong>Email :</strong>{" "}
//                         {currentUser.email}
//                       </p>
//                     </div>
//                   )}
//                 </IonCardContent>
//               </IonCard>
//             </IonCol>

//             {/* RIGHT SIDE */}
//             {/* <IonCol size="12" size-md="4">
//               <IonCard className="quick-card">
//                 <IonCardContent>
//                   <h2>Quick Links</h2>

//                   <div className="quick-links">
//                     <Link to="/Cart">Cart</Link>

//                     <Link to="/Wishlist">
//                       Wishlist
//                     </Link>

//                     <Link to="/Addnewaddress">
//                       Add New Address
//                     </Link>

//                     <Link to="/Orderstatus">
//                       Order Status
//                     </Link>
//                   </div>
//                 </IonCardContent>
//               </IonCard>
//             </IonCol> */}
//           </IonRow>
//         </IonGrid>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Account;
















import Header from "../components/Header";

import React, { useEffect } from "react";

import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon
} from "@ionic/react";

import {
  personOutline,
  cartOutline,
  heartOutline,
  locationOutline,
  bagHandleOutline,
  cubeOutline
} from "ionicons/icons";

import { Link, useHistory } from "react-router-dom";

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

  // logout
  const handleLogout = () => {

    localStorage.clear();

    history.push("/SignIn");

    window.location.reload();
  };

  return (

    <IonPage>

      <Header handleLogout={handleLogout} />

      <IonContent className="ion-padding account-page">

        <IonGrid>

          {/* HEADING */}
          <IonRow>

            <IonCol size="12">

              <div className="account-heading">

                <h1>My Account</h1>

                <p>
                  Manage your jewellery account ✨
                </p>

              </div>

            </IonCol>

          </IonRow>

          {/* MAIN */}
          <IonRow>

            {/* LEFT MENU */}
            <IonCol size="12" size-md="4">

              <IonCard>

                <IonCardContent>

                  <IonList className="account-list">

                    {/* Account */}
                    <IonItem routerLink="/Account">
                      <IonIcon
                        icon={personOutline}
                        slot="start"
                      />

                      <IonLabel>
                        Account
                      </IonLabel>
                    </IonItem>

                    {/* Cart */}
                    <IonItem routerLink="/Cart">
                      <IonIcon
                        icon={cartOutline}
                        slot="start"
                      />

                      <IonLabel>
                        Cart
                      </IonLabel>
                    </IonItem>

                    {/* Wishlist */}
                    <IonItem routerLink="/Wishlist">
                      <IonIcon
                        icon={heartOutline}
                        slot="start"
                      />

                      <IonLabel>
                        Wishlist
                      </IonLabel>
                    </IonItem>

                    {/* Address */}
                    <IonItem routerLink="/Address">
                      <IonIcon
                        icon={locationOutline}
                        slot="start"
                      />

                      <IonLabel>
                        Add New Address
                      </IonLabel>
                    </IonItem>

                    {/* Orders */}
                    <IonItem routerLink="/OrderStatus">
                      <IonIcon
                        icon={bagHandleOutline}
                        slot="start"
                      />

                      <IonLabel>
                        Orders
                      </IonLabel>
                    </IonItem>

                    {/* Order Status */}
                    <IonItem routerLink="/Orderstatus">
                      <IonIcon
                        icon={cubeOutline}
                        slot="start"
                      />

                      <IonLabel>
                        Order Status
                      </IonLabel>
                    </IonItem>

                  </IonList>

                </IonCardContent>

              </IonCard>

            </IonCol>

            {/* ACCOUNT DETAILS */}
            <IonCol size="12" size-md="8">

              <IonCard className="account-card">

                <IonCardContent>

                  <h2>
                    Account Details
                  </h2>

                  {
                    currentUser && (

                      <div className="account-info">

                        <p>
                          <strong>
                            Mobile :
                          </strong>{" "}

                          {currentUser.username}
                        </p>

                        <p>
                          <strong>
                            Email :
                          </strong>{" "}

                          {currentUser.email},
                        </p>

                        <p>
                          <strong>
                            User Name :
                          </strong>{" "}

                          {currentUser.firstName}{currentUser.lastName}
                        </p>

                      </div>
                    )
                  }

                </IonCardContent>

              </IonCard>

            </IonCol>

          </IonRow>

        </IonGrid>

      </IonContent>

    </IonPage>
  );
};

export default Account;