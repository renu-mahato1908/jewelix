





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

import { useDispatch } from "react-redux";
import { logout } from "../Slices/auth";
import { IonSearchbar } from '@ionic/react';
import axios from "axios";







const Header = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [currentUser, setCurrentUser] = useState<any>(null);

    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    const [showPopover, setShowPopover] = useState(false);

    const [searchText, setSearchText] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);

    useEffect(() => {

        loadUserData();

        window.addEventListener("storage", loadUserData);

        return () => {
            window.removeEventListener(
                "storage",
                loadUserData
            );
        };

    }, []);

    const loadUserData = () => {

        const user =
            localStorage.getItem("currentUserId");

        setCurrentUser(user);

        const wishlistData = JSON.parse(
            localStorage.getItem("wishlist") || "[]"
        );

        const cartData = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

        const wishCount =
            wishlistData.filter(
                (item: any) =>
                    item.userId == user
            ).length;

        const crtCount =
            cartData.filter(
                (item: any) =>
                    item.userId == user
            ).length;

        setWishlistCount(wishCount);
        setCartCount(crtCount);
    };

    const handleLogout = () => {

        dispatch(logout());

        localStorage.removeItem(
            "currentUserId"
        );

        setCurrentUser(null);

        setWishlistCount(0);
        setCartCount(0);

        setShowPopover(false);

        history.replace("/SignIn");
    };


    const handleSearch = async (value: string) => {

        setSearchText(value);

        if (!value.trim()) {
            setSuggestions([]);
            return;
        }

        try {

            const res = await axios.get(
                `https://renuka-saa9.vercel.app/api/cats?name=${value}`
            );

            setSuggestions(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    return (

        <IonHeader>

            <IonToolbar className="header-toolbar">

                {/* Menu */}
                <IonButtons slot="start">

                    <IonMenuButton />

                </IonButtons>





                <div className="header-center">

                    <img
                        src="/image.png"
                        className="logo"
                        alt="logo"
                    />

                    {/* Search */}
                    <div className="search-container">

                        <IonSearchbar
                            className="header-search"
                            placeholder="Search Category..."
                            value={searchText}
                            debounce={300}
                            onIonInput={(e) =>
                                handleSearch(
                                    e.detail.value || ""
                                )
                            }
                        />

                        {suggestions.length > 0 && (

                            <div className="search-suggestions">

                                {suggestions.map((cat: any) => (

                                    <div
                                        key={cat._id}
                                        className="suggestion-item"
                                        onClick={() => {

                                            setSearchText(
                                                cat.name
                                            );

                                            setSuggestions([]);

                                            history.push(
                                                `/Category/${cat.name}`
                                            );
                                        }}
                                    >

                                        {cat.name}

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </div>

                {/* Right Icons */}
                <IonButtons
                    slot="end"
                    className="header-icons"
                >

                    {/* Login */}
                    {!currentUser && (

                        <div className="icon-box">

                            <Link to="/SignIn">

                                <IonIcon
                                    icon={
                                        personOutline
                                    }
                                />

                            </Link>

                            <IonBadge
                                color="success"
                            >

                                Login

                            </IonBadge>

                        </div>

                    )}

                    {/* Account */}
                    {currentUser && (

                        <>

                             {/* <div className="icon-box">

                                <IonButton
                                    fill="clear"
                                    onClick={() =>
                                        setShowPopover(
                                            true
                                        )
                                    }
                                >

                                    <IonIcon
                                        icon={
                                            personCircleOutline
                                        }
                                    />

                                </IonButton>

                                <IonBadge
                                    color="primary"
                                >

                                    Account

                                </IonBadge>

                            </div> 

                             <IonPopover
                                isOpen={
                                    showPopover
                                }
                                onDidDismiss={() =>
                                    setShowPopover(
                                        false
                                    )
                                }
                            >

                                <IonList>

                                    <IonItem
                                        button
                                        routerLink="/Account"
                                    >

                                        <IonIcon
                                            icon={
                                                personOutline
                                            }
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
                                            icon={
                                                bagHandleOutline
                                            }
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
                                            icon={
                                                heartOutline
                                            }
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
                                            icon={
                                                locationOutline
                                            }
                                            slot="start"
                                        />

                                        <IonLabel>

                                            Saved Address

                                        </IonLabel>

                                    </IonItem>

                                </IonList>

                            </IonPopover>  */}

                        </>

                    )}



                    {/* Logout */}

                    {currentUser && (

                        <div
                            className="icon-box logout-icon"
                            onClick={
                                handleLogout
                            }
                        >

                            <IonIcon
                                icon={
                                    logOutOutline
                                }
                            />

                            <IonBadge
                                color="danger"
                            >

                                Logout

                            </IonBadge>

                        </div>

                    )}

                </IonButtons>

            </IonToolbar>

        </IonHeader>

    );

};

export default Header;















