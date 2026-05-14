

// // import {
// //     IonHeader,
// //     IonToolbar,
// //     IonButtons,
// //     IonMenuButton,
// //     IonIcon,
// //     IonBadge
// // } from "@ionic/react";

// // import {
// //     heartOutline,
// //     cartOutline,
// //     personOutline,
// //     logOutOutline
// // } from "ionicons/icons";

// // import { useHistory, Link } from "react-router-dom";
// // import { UseSelector, useDispatch } from "react-redux";

// // import { useEffect, useState } from "react";
// // const history = useHistory();

// // const dispatch = useDispatch();
// // const { user: currentUser } = useSelector((state) => state.auth);



// // import "./Home.css";

// // const Header = () => {

// //     const history = useHistory();

// //     const currentUserId = localStorage.getItem("currentUserId");

// //     const [wishlistCount, setWishlistCount] = useState(0);
// //     const [cartCount, setCartCount] = useState(0);

// //     useEffect(() => {

// //         const wishlistData = JSON.parse(
// //             localStorage.getItem("wishlist") || "[]"
// //         );

// //         const cartData = JSON.parse(
// //             localStorage.getItem("cart") || "[]"
// //         );

// //         const wishCount = wishlistData.filter(
// //             (item) => item.userId == currentUserId
// //         ).length;

// //         const crtCount = cartData.filter(
// //             (item) => item.userId == currentUserId
// //         ).length;

// //         setWishlistCount(wishCount);
// //         setCartCount(crtCount);

// //     }, []);

// //     /* Logout */
// //     const handleLogout = () => {
// //         localStorage.clear();
// //         history.push("/SignIn");
// //     };

// //     return (
// //         <IonHeader>
// //             <IonToolbar className="header-toolbar">

// //                 <IonButtons slot="start">
// //                     <IonMenuButton />
// //                 </IonButtons>

// //                 {/* Logo */}
// //                 <div className="header-center">
// //                     <img
// //                         src="https://zerocreativity0.wordpress.com/wp-content/uploads/2016/05/tanishq-logo.jpg?w=768&h=576"
// //                         className="logo"
// //                         alt="logo"
// //                     />
// //                 </div>

// //                 {/* Icons */}
// //                 <IonButtons slot="end" className="header-icons">


// //                     {/* <div className="icon-box">
// //                         <Link to="/SignIn">
// //                             <IonIcon icon={personOutline} />
// //                         </Link>

// //                         <IonBadge color="success">Login</IonBadge>
// //                     </div> */}

// //                     {
// //                         currentUser
// //                             ? null
// //                             : (
// //                                 <div className="icon-box">
// //                                     <Link to="/SignIn">
// //                                         <IonIcon icon={personOutline} />
// //                                     </Link>

// //                                     <IonBadge color="success">
// //                                         Login
// //                                     </IonBadge>
// //                                 </div>
// //                             )
// //                     }

// //                     {/* Wishlist */}
// //                     <div className="icon-box">
// //                         <Link to="./Wishlist">
// //                             <IonIcon icon={heartOutline} />
// //                         </Link>

// //                         <IonBadge color="danger">
// //                             {wishlistCount}
// //                         </IonBadge>
// //                     </div>

// //                     {/* Cart */}
// //                     <div className="icon-box">
// //                         <Link to="./Cart">
// //                             <IonIcon icon={cartOutline} />
// //                         </Link>

// //                         <IonBadge color="danger">
// //                             {cartCount}
// //                         </IonBadge>
// //                     </div>

// //                     {/* Account */}
// //                     <div className="icon-box">
// //                         <Link to="./Account">
// //                             <IonIcon icon={personOutline} />
// //                         </Link>

// //                         <IonBadge color="danger">1</IonBadge>
// //                     </div>

// //                     {/* Logout */}
// //                     {/* <div
// //                         className="icon-box logout-icon"
// //                         onClick={handleLogout}
// //                     >
// //                         <IonIcon icon={logOutOutline} />
// //                         <IonBadge color="dark">!</IonBadge>
// //                     </div> */}




// //                     {
// //                         currentUser ? (
// //                             <div
// //                                 className="icon-box logout-icon"
// //                                 onClick={handleLogout}
// //                             >
// //                                 <IonIcon icon={logOutOutline} />

// //                                 <IonBadge color="dark">
// //                                     Logout
// //                                 </IonBadge>
// //                             </div>
// //                         ) : null
// //                     }





// //                     {/* Logout */}



// //                 </IonButtons>

// //             </IonToolbar>
// //         </IonHeader>
// //     );
// // };

// // export default Header;







// import {
//     IonHeader,
//     IonToolbar,
//     IonButtons,
//     IonMenuButton,
//     IonIcon,
//     IonBadge
// } from "@ionic/react";

// import {
//     heartOutline,
//     cartOutline,
//     personOutline,
//     logOutOutline
// } from "ionicons/icons";

// import { Link, useHistory } from "react-router-dom";

// import { useEffect, useState } from "react";

// import "./Home.css";

// const Header = () => {

//     const history = useHistory();

//     // login state
//     const [currentUser, setCurrentUser] = useState(null);

//     const [wishlistCount, setWishlistCount] = useState(0);
//     const [cartCount, setCartCount] = useState(0);

//     useEffect(() => {

//         // user check
//         const user = localStorage.getItem("currentUserId");

//         setCurrentUser(user);

//         const wishlistData = JSON.parse(
//             localStorage.getItem("wishlist") || "[]"
//         );

//         const cartData = JSON.parse(
//             localStorage.getItem("cart") || "[]"
//         );

//         const wishCount = wishlistData.filter(
//             (item) => item.userId == user
//         ).length;

//         const crtCount = cartData.filter(
//             (item) => item.userId == user
//         ).length;

//         setWishlistCount(wishCount);
//         setCartCount(crtCount);

//     }, []);

//     // logout
//     const handleLogout = () => {

//         localStorage.removeItem("currentUserId");

//         setCurrentUser(null);

//         history.push("/SignIn");
//     };

//     return (
//         <IonHeader>
//             <IonToolbar className="header-toolbar">

//                 {/* Menu */}
//                 <IonButtons slot="start">
//                     <IonMenuButton />
//                 </IonButtons>

//                 {/* Logo */}
//                 <div className="header-center">
//                     <img
//                         src="https://zerocreativity0.wordpress.com/wp-content/uploads/2016/05/tanishq-logo.jpg?w=768&h=576"
//                         className="logo"
//                         alt="logo"
//                     />
//                 </div>

//                 {/* Icons */}
//                 <IonButtons slot="end" className="header-icons">

//                     {/* Login */}
//                     {
//                         !currentUser && (
//                             <div className="icon-box">
//                                 <Link to="/SignIn">
//                                     <IonIcon icon={personOutline} />
//                                 </Link>

//                                 <IonBadge color="success">
//                                     Login
//                                 </IonBadge>
//                             </div>
//                         )
//                     }


//                     <div className="icon-box">
//                                 <Link to="/Account">
//                                     <IonIcon icon={personOutline} />
//                                 </Link>

//                                 <IonBadge color="primary">
//                                     Account
//                                 </IonBadge>
//                             </div>

//                     {/* Wishlist */}
//                     <div className="icon-box">
//                         <Link to="/Wishlist">
//                             <IonIcon icon={heartOutline} />
//                         </Link>

//                         <IonBadge color="primary">
//                             {/* {wishlistCount} */}
//                             wishlist
//                         </IonBadge>
//                     </div>

//                     {/* Cart */}
//                     <div className="icon-box">
//                         <Link to="/Cart">
//                             <IonIcon icon={cartOutline} />
//                         </Link>

//                         <IonBadge color="primary">
//                             {/* {cartCount}1 */}
//                             cart
//                         </IonBadge>
//                     </div>

//                     {/* Account */}


//                     {/* Logout */}
//                     {
//                         currentUser && (
//                             <div
//                                 className="icon-box logout-icon"
//                                 onClick={handleLogout}
//                             >
//                                 <IonIcon icon={logOutOutline} />

//                                 <IonBadge color="dark">
//                                     Logout
//                                 </IonBadge>
//                             </div>
//                         )
//                     }

//                 </IonButtons>

//             </IonToolbar>
//         </IonHeader>
//     );
// };

// export default Header;



















import {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonIcon,
    IonBadge,
    IonButton,
    IonPopover,
    IonList,
    IonItem,
    IonLabel
} from "@ionic/react";

import {
    heartOutline,
    cartOutline,
    personOutline,
    logOutOutline,
    personCircleOutline,
    bagHandleOutline,
    locationOutline
} from "ionicons/icons";

import { Link, useHistory } from "react-router-dom";

import { useEffect, useState } from "react";

import "./Home.css";

const Header = () => {

    const history = useHistory();

    // login state
    const [currentUser, setCurrentUser] = useState<any>(null);

    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    // popover
    const [showPopover, setShowPopover] = useState(false);

    useEffect(() => {

        // user check
        const user = localStorage.getItem("currentUserId");

        setCurrentUser(user);

        const wishlistData = JSON.parse(
            localStorage.getItem("wishlist") || "[]"
        );

        const cartData = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

        const wishCount = wishlistData.filter(
            (item: any) => item.userId == user
        ).length;

        const crtCount = cartData.filter(
            (item: any) => item.userId == user
        ).length;

        setWishlistCount(wishCount);
        setCartCount(crtCount);

    }, []);

    // logout
    const handleLogout = () => {

        localStorage.removeItem("currentUserId");

        setCurrentUser(null);

        history.push("/SignIn");
    };

    return (

        <IonHeader>

            <IonToolbar className="header-toolbar">

                {/* Menu */}
                <IonButtons slot="start">

                    <IonMenuButton />

                </IonButtons>

                {/* Logo */}
                <div className="header-center">

                    {/* <img
                        src="https://zerocreativity0.wordpress.com/wp-content/uploads/2016/05/tanishq-logo.jpg?w=768&h=576"
                        className="logo"
                        alt="logo"
                    /> */}

                    <img
                        src="jlogo1.png"
                        className="logo"
                        alt="logo"
                    />



                </div>

                {/* Icons */}
                <IonButtons
                    slot="end"
                    className="header-icons"
                >

                    {/* Login */}
                    {
                        !currentUser && (

                            <div className="icon-box">

                                <Link to="/SignIn">

                                    <IonIcon
                                        icon={personOutline}
                                    />

                                </Link>

                                <IonBadge color="success">
                                    Login
                                </IonBadge>

                            </div>
                        )
                    }

                    {/* ACCOUNT DROPDOWN */}
                    {
                        currentUser && (

                            <>
                                <div className="icon-box">

                                    <IonButton
                                        fill="clear"
                                        onClick={() =>
                                            setShowPopover(true)
                                        }
                                    >

                                        <IonIcon
                                            icon={personCircleOutline}
                                        />

                                    </IonButton>

                                    <IonBadge color="primary">
                                        Account
                                    </IonBadge>

                                </div>

                                {/* POPOVER */}
                                <IonPopover
                                    isOpen={showPopover}
                                    onDidDismiss={() =>
                                        setShowPopover(false)
                                    }
                                >

                                    <IonList>

                                        <IonItem
                                            button
                                            routerLink="/Account"
                                        >

                                            <IonIcon
                                                icon={personOutline}
                                                slot="start"
                                            />

                                            <IonLabel>
                                                My Account
                                            </IonLabel>

                                        </IonItem>

                                        <IonItem
                                            button
                                            routerLink="/Orderstatus"
                                        >

                                            <IonIcon
                                                icon={bagHandleOutline}
                                                slot="start"
                                            />

                                            <IonLabel>
                                                My Orders
                                            </IonLabel>

                                        </IonItem>

                                        <IonItem
                                            button
                                            routerLink="/Wishlist"
                                        >

                                            <IonIcon
                                                icon={heartOutline}
                                                slot="start"
                                            />

                                            <IonLabel>
                                                Wishlist
                                            </IonLabel>

                                        </IonItem>

                                        <IonItem
                                            button
                                            routerLink="/Address"
                                        >

                                            <IonIcon
                                                icon={locationOutline}
                                                slot="start"
                                            />

                                            <IonLabel>
                                                Saved Address
                                            </IonLabel>

                                        </IonItem>

                                    </IonList>

                                </IonPopover>
                            </>
                        )
                    }

                    {/* Wishlist */}
                    <div className="icon-box">

                        <Link to="/Wishlist">

                            <IonIcon icon={heartOutline} />

                        </Link>

                        <IonBadge color="primary">

                            {wishlistCount}

                        </IonBadge>

                    </div>

                    {/* Cart */}
                    <div className="icon-box">

                        <Link to="/Cart">

                            <IonIcon icon={cartOutline} />

                        </Link>

                        <IonBadge color="primary">

                            {cartCount}

                        </IonBadge>

                    </div>

                    {/* Logout */}
                    {
                        currentUser && (

                            <div
                                className="icon-box logout-icon"
                                onClick={handleLogout}
                            >

                                <IonIcon
                                    icon={logOutOutline}
                                />

                                <IonBadge color="dark">
                                    Logout
                                </IonBadge>

                            </div>
                        )
                    }

                </IonButtons>

            </IonToolbar>

        </IonHeader>
    );
};

export default Header;