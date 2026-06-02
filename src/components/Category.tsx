
import Header from "../components/Header";


import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonImg,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel,
    IonRange,
    IonText,
    IonToast,
    IonSpinner,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton
} from '@ionic/react';

import { FiHeart } from "react-icons/fi";
import './Category.css'

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../Slices/auth";

interface Product {
    id: number;
    productId: string;
    productName: string;
    productPrice: number;
    productCategory: string;
    images: string[];

}

const Category = () => {

    // const [products, setProducts] = useState([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [category, setCategory] = useState("All");

    const [priceRange, setPriceRange] = useState({
        lower: 0,
        upper: 200000
    });

    const [sortorder, setSortorder] = useState("Asc");

    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    // const { categoryName } = useParams();
    const { categoryName } = useParams<{ categoryName: string }>();

    const { user: currentUser } = useSelector((state: any) => state.auth);

    // ================= FETCH PRODUCTS =================


    useEffect(() => {

        setLoading(true);

        axios
            // .get(`https://renuka-saa9.vercel.app/api/ssproducts/category/${categoryName}`)
            .get(`https://renuka-saa9.vercel.app/api/ssproduct/category/${categoryName}`, {
               
            })

            .then((response) => {

                console.log("API DATA =", response.data);

                // Agar direct array aa raha hai
                if (Array.isArray(response.data)) {

                    setProducts(response.data);

                }

                // Agar object ke andar products aa raha hai
                else if (response.data.products) {

                    setProducts(response.data.products);

                }

                else {

                    setProducts([]);

                }

            })

            .catch((error) => {

                console.log("API ERROR =", error);

            })

            .finally(() => {

                setLoading(false);

            });

    }, [categoryName]);

    // ================= ADD TO CART =================

    const history = useHistory();

    const handleCart = (product: Product) => {

        if (!currentUser) {

            setToastMessage("Please login first");
            setShowToast(true);

            setTimeout(() => {

                history.push("/SignIn");

            }, 1000);

            return;
        }

        const data = {

            userId: currentUser.id,

            items: [

                {

                    productId: product.id,
                    quantity: 1,
                    price: product.productPrice

                }

            ]

        };

        axios
            .post(
                "https://renuka-saa9.vercel.app/api/carts",
                data
            )

            .then(() => {

                setToastMessage(
                    "Product added to cart"
                );

                setShowToast(true);

            })

            .catch(() => {

                setToastMessage(
                    "Cart error"
                );

                setShowToast(true);

            });

    };


    const handleWishlist = (
        product: Product
    ) => {

        if (!currentUser) {

            setToastMessage(
                "Please login first"
            );

            setShowToast(true);

            setTimeout(() => {

                history.push("/SignIn");

            }, 1000);

            return;
        }

        const data = {

            userId: currentUser.id,

            productId: product.id

        };

        axios
            .post(
                "https://renuka-saa9.vercel.app/api/wishlist",
                data
            )

            .then(() => {

                setToastMessage(
                    "Added to wishlist"
                );

                setShowToast(true);

            })

            .catch((error) => {

                if (
                    error.response?.status === 409
                ) {

                    setToastMessage(
                        "Already in wishlist"
                    );

                }

                else {

                    setToastMessage(
                        "Something went wrong"
                    );

                }

                setShowToast(true);

            });

    };

    // const handleCart = (product) => {

    //     if (!currentUser) {

    //         setToastMessage("Please login first");
    //         setShowToast(true);

    //         return;
    //     }

    //     const data = {

    //         userId: currentUser.id,

    //         items: [
    //             {
    //                 productId: product?.id,
    //                 quantity: 1,
    //                 price: product?.productPrice
    //             }
    //         ]
    //     };

    //     axios.post(`https://renuka-saa9.vercel.app/api/carts`, data)

    //         .then((response) => {

    //             console.log(response.data);

    //             setToastMessage("Product added to cart");
    //             setShowToast(true);

    //         })

    //         .catch((error) => {

    //             console.log(error);

    //             setToastMessage("Cart error");
    //             setShowToast(true);

    //         });
    // };

    // ================= WISHLIST =================

    // const handleWishlist = (product) => {



    //     const data = {

    //         userId: currentUser.id,
    //         productId: product?.id,

    //     };

    //     axios.post(`https://renuka-saa9.vercel.app/api/wishlist`, data)

    //         .then((response) => {

    //             console.log(response.data);

    //             setToastMessage("Added to wishlist");
    //             setShowToast(true);

    //         })

    //         .catch((error) => {

    //             console.log(error);

    //             if (error.response?.status === 409) {

    //                 setToastMessage("Product already in wishlist");

    //             }

    //             else {

    //                 setToastMessage("Something went wrong");

    //             }

    //             setShowToast(true);

    //         });
    // };

    // ================= UNIQUE CATEGORY =================

    const uniqueCategory = [

        ...new Set(

            products.map(product => product?.productCategory)

        )

    ];


    const dispatch = useDispatch();


    const handleLogout = () => {
        dispatch(logout());          // Redux state clear
        localStorage.removeItem("user");
        history.replace("/SignIn");   // redirect to login page
    };

    //     const handleLogout = () => {
    //     localStorage.clear();
    //   };


    return (

        <IonPage>



            <Header handleLogout={handleLogout} />


            <IonContent className="ion-padding">

                <IonGrid>

                    {/* ================= HEADING ================= */}

                    <IonRow>

                        <IonCol>

                            <h1>{categoryName}</h1>

                        </IonCol>

                    </IonRow>

                    {/* ================= FILTERS ================= */}

                    <IonRow>

                        {/* CATEGORY */}

                        <IonCol size="12" sizeMd="4">

                            <IonItem>

                                <IonLabel>Category</IonLabel>

                                <IonSelect
                                    value={category}
                                    onIonChange={(e) => setCategory(e.detail.value)}
                                >

                                    <IonSelectOption value="All">

                                        All

                                    </IonSelectOption>

                                    {

                                        uniqueCategory.map((cat, index) => (

                                            <IonSelectOption
                                                key={index}
                                                value={cat}
                                            >

                                                {cat}

                                            </IonSelectOption>

                                        ))

                                    }

                                </IonSelect>

                            </IonItem>

                        </IonCol>

                        {/* SORT */}

                        <IonCol size="12" sizeMd="4">

                            <IonButton
                                expand="block"
                                onClick={() =>
                                    sortorder === "Asc"
                                        ? setSortorder("desc")
                                        : setSortorder("Asc")
                                }
                            >

                                {sortorder === "Asc"
                                    ? "Price High To Low"
                                    : "Price Low To High"}

                            </IonButton>

                        </IonCol>


                        <IonCol>

                            <IonText>

                                <h5>

                                    Price :
                                    ₹{priceRange.lower}
                                    -
                                    ₹{priceRange.upper}

                                </h5>

                            </IonText>

                            <IonRange
                                dualKnobs={true}
                                min={0}
                                max={200000}
                                step={1000}
                                value={priceRange}
                                onIonChange={(e) =>
                                    setPriceRange(e.detail.value)
                                }
                            />

                        </IonCol>

                    </IonRow>

                    {/* ================= PRICE RANGE ================= */}

                    <IonRow>



                    </IonRow>

                    {/* ================= LOADING ================= */}

                    {
                        loading && (

                            <IonRow>

                                <IonCol className="ion-text-center">

                                    <IonSpinner name="crescent" />

                                </IonCol>

                            </IonRow>

                        )
                    }

                    {/* ================= PRODUCTS ================= */}

                    <IonRow>

                        {

                            products

                                .filter(product =>

                                    product?.productCategory === category ||

                                    category === "All"

                                )

                                .filter(product =>

                                    product?.productPrice >= priceRange.lower &&

                                    product?.productPrice <= priceRange.upper

                                )

                                .sort((a, b) => {

                                    if (sortorder === "Asc") {

                                        return a?.productPrice - b?.productPrice;

                                    }

                                    else {

                                        return b?.productPrice - a?.productPrice;

                                    }

                                })

                                .map((product, index) => (

                                    <IonCol
                                        size="12"
                                        sizeSm="6"
                                        sizeMd="4"
                                        sizeLg="3"
                                        key={index}
                                    >

                                        <IonCard className="category-card">

                                            <div className="image-container">

                                                <Link to={`/ViewProduct/${product?.id}`}>
                                                    <IonImg
                                                        className="category-image"
                                                        src={`renuka-saa9-git-main-renu-mahato1908s-projects.vercel.appupload/${product?.images?.[0]}`}
                                                    />
                                                </Link>

                                                <IonButton
                                                    className="wishlist-btn"
                                                    fill="solid"
                                                    onClick={() => handleWishlist(product)}
                                                >
                                                    <FiHeart size={20} />
                                                </IonButton>

                                            </div>

                                            <IonCardContent>

                                                <h2>{product?.productName}</h2>

                                                <p>ID : {product?.productId}</p>

                                                <h3>₹ {product?.productPrice}</h3>

                                                <IonButton
                                                    expand="block"
                                                    onClick={() => handleCart(product)}
                                                >
                                                    Add To Cart
                                                </IonButton>



                                            </IonCardContent>

                                        </IonCard>

                                    </IonCol>

                                ))

                        }

                    </IonRow>

                </IonGrid>

                {/* ================= TOAST ================= */}

                <IonToast
                    isOpen={showToast}
                    message={toastMessage}
                    duration={2000}
                    onDidDismiss={() => setShowToast(false)}
                />

            </IonContent>

        </IonPage>
    );
};

export default Category;








