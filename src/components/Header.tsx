

import {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonIcon,
    IonBadge
} from "@ionic/react";

import {
    heartOutline,
    cartOutline,
    personOutline,
    logOutOutline
} from "ionicons/icons";

import { useHistory, Link } from "react-router-dom";

import { useEffect, useState } from "react";

import "./Home.css";

const Header = () => {

    const history = useHistory();

    const currentUserId = localStorage.getItem("currentUserId");

    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {

        const wishlistData = JSON.parse(
            localStorage.getItem("wishlist") || "[]"
        );

        const cartData = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

        const wishCount = wishlistData.filter(
            (item) => item.userId == currentUserId
        ).length;

        const crtCount = cartData.filter(
            (item) => item.userId == currentUserId
        ).length;

        setWishlistCount(wishCount);
        setCartCount(crtCount);

    }, []);

    /* Logout */
    const handleLogout = () => {
        localStorage.clear();
        history.push("/SignIn");
    };

    return (
        <IonHeader>
            <IonToolbar className="header-toolbar">

                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>

                {/* Logo */}
                <div className="header-center">
                    <img
                        src="https://zerocreativity0.wordpress.com/wp-content/uploads/2016/05/tanishq-logo.jpg?w=768&h=576"
                        className="logo"
                        alt="logo"
                    />
                </div>

                {/* Icons */}
                <IonButtons slot="end" className="header-icons">


                    <div className="icon-box">
                        <Link to="/SignIn">
                            <IonIcon icon={personOutline} />
                        </Link>

                        <IonBadge color="success">Login</IonBadge>
                    </div>

                    {/* Wishlist */}
                    <div className="icon-box">
                        <Link to="./Wishlist">
                            <IonIcon icon={heartOutline} />
                        </Link>

                        <IonBadge color="danger">
                            {wishlistCount}
                        </IonBadge>
                    </div>

                    {/* Cart */}
                    <div className="icon-box">
                        <Link to="./Cart">
                            <IonIcon icon={cartOutline} />
                        </Link>

                        <IonBadge color="danger">
                            {cartCount}
                        </IonBadge>
                    </div>

                    {/* Account */}
                    <div className="icon-box">
                        <Link to="./Account">
                            <IonIcon icon={personOutline} />
                        </Link>

                        <IonBadge color="danger">1</IonBadge>
                    </div>

                    {/* Logout */}
                    <div
                        className="icon-box logout-icon"
                        onClick={handleLogout}
                    >
                        <IonIcon icon={logOutOutline} />
                        <IonBadge color="dark">!</IonBadge>
                    </div>





                    {/* Logout */}

                   

                </IonButtons>

            </IonToolbar>
        </IonHeader>
    );
};

export default Header;