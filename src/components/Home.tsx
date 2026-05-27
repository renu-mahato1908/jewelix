import Header from "../components/Header";

import React, { useEffect } from "react";

import {
    IonButtons,
    IonRow,
    IonCol,
    IonContent,
    IonGrid,

    IonPage,


} from '@ionic/react';

import './Home.css';


import { useDispatch, useSelector, } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../Slices/auth";
import { Link } from "react-router-dom";


const Home: React.FC = () => {

    const history = useHistory();

    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    useEffect(() => {
        if (currentUser) {
            console.log(currentUser);
        }
        if (currentUser && currentUser.roles[0] === "ROLE_ADMIN") {
            console.log(currentUser.roles[0]);

            history.replace("/Dashboard");
        }
    }, [currentUser, history]);








    const handleLogout = () => {
        localStorage.clear();
    };








    return (
        <IonPage>






            <Header handleLogout={handleLogout} />

            <IonContent fullscreen>

                <IonGrid>
                    <IonRow>
                        <IonCol className='collection'>



                            <h3> Jewelix  Collection</h3>
                            <h4>Explore our Newly launched collection</h4>



                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <div>
                                <img
                                    src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwc5b6b963/homepage/tanishq-collections/festive-edit-desktop.jpg"
                                    alt=""
                                />
                            </div>
                        </IonCol>



                        <IonCol>

                            <div className="collection-box small">
                                <img
                                    src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwfba22b76/homepage/tanishq-collections/stunning-every-ear.jpg"
                                    alt="img"
                                />
                            </div>

                            <div className="collection-box small">
                                <img
                                    src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw43869af4/homepage/tanishq-collections/floral-bloom.jpg"
                                    alt="img"
                                />
                            </div>
                        </IonCol>


                        <IonCol>
                            <div>
                                <img src='https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwc1e18ae2/homepage/tanishq-collections/sub-50k-desktop.jpg' alt='img'></img>
                            </div>

                        </IonCol>

                    </IonRow>

                </IonGrid>





                <IonGrid>

                    {/* Heading */}
                    <IonRow>
                        <IonCol className="ion-text-center categories">
                            <h3>Find Your Perfect Match</h3>
                            <h4>Shop by Categories</h4>
                        </IonCol>
                    </IonRow>

                    {/* First Row */}
                    <IonRow className="category1">

                        <IonCol size="6" size-md="3">
                            <Link to="/Category/Earrings">
                                <img src=" https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw32c0481a/homepage/shopByCategory/earrings-3-4-26.jpg" alt="earing" />
                                <h4>EARINGS</h4></Link>

                        </IonCol>

                        <IonCol size="6" size-md="3">
                            <Link to="/Category/Rings">
                                <img src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwdd52311e/homepage/shopByCategory/ring-3-4-26.jpg" alt="finger_ring" />
                                <h4>FINGER RINGS</h4>
                            </Link>
                        </IonCol>

                        <IonCol size="6" size-md="3">
                            <Link to="/Category/Pendant">
                                <img src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw49078ca4/homepage/shopByCategory/pendants-3-4-26.jpg" alt="pendants" />
                                <h4>PENDANTS</h4>
                            </Link>
                        </IonCol>

                        <IonCol size="6" size-md="3">
                            <Link to="/Category/Mangalsutra">
                                <img src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwc8444991/homepage/shopByCategory/mangalsutra-3-4-26.jpg" alt="mangalsutra" />
                                <h4>MANGALSUTRA</h4>
                            </Link>
                        </IonCol>

                    </IonRow>

                    {/* Second Row */}
                    <IonRow className="category2">

                        <IonCol size="6" size-md="3">
                            <Link to="/Category/Bracelets">
                                <img src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw495a937b/homepage/shopByCategory/bracelets-3-4-26.jpg" alt="bracelets" />
                                <h4>BRACELETS</h4>
                            </Link>
                        </IonCol>

                        <IonCol size="6" size-md="3">
                            <Link to="/Category/Bangles">
                                <img src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw55713d35/homepage/shopByCategory/bangles-3-4-26.jpg" alt="bangles" />
                                <h4>BANGLES</h4>
                            </Link>
                        </IonCol>

                        <IonCol size="6" size-md="3">
                            <Link to="/Category/Chain">
                                <img src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dweb159955/homepage/shopByCategory/chains-3-4-26.jpg" alt="chain" />
                                <h4>CHAIN</h4>
                            </Link>
                        </IonCol>

                        {/* View All */}
                        <IonCol size="6" size-md="3" className="view_all ion-text-center">
                            <Link to="AllProduct">
                                <h3>10+</h3>
                                <p>categories to choose all</p>
                                <h4>VIEW ALL</h4>
                            </Link>
                        </IonCol>

                    </IonRow>

                </IonGrid>



                <IonGrid>

                    {/* Heading */}
                    <IonRow>
                        <IonCol className="ion-text-center">
                            <h2>Trending Now</h2>
                            <h3>Jewellery pieces everyone’s eyeing right now</h3>
                        </IonCol>
                    </IonRow>

                    {/* Cards */}
                    <IonRow className="auspicious">

                        <IonCol size="12" size-md="4">
                            <div className="trend_box">
                                <img src="/auspicious.png" alt="auspicious" />
                                <h4>Auspicious Occasion</h4>
                            </div>
                        </IonCol>

                        <IonCol size="12" size-md="4">
                            <div className="trend_box">
                                <img src="./gifting.png" alt="gifting" />
                                <h4>Gifting Jewellery</h4>
                            </div>
                        </IonCol>

                        <IonCol size="12" size-md="4">
                            <div className="trend_box">
                                <img src="./ring.png" alt="ring" />
                                <h4>Drop of Radiance</h4>
                            </div>
                        </IonCol>

                    </IonRow>

                </IonGrid>



                <IonGrid>

                    {/* Heading */}
                    <IonRow>
                        <IonCol className="ion-text-center">
                            <h2>Tanishq World</h2>
                            <h3>A companion for every occasion</h3>
                        </IonCol>
                    </IonRow>

                    {/* Content */}
                    <IonRow>

                        {/* Left Side */}
                        <IonCol size="12" size-md="6">

                            <div className="world_box">
                                <Link to="/Category/Wedding">
                                    <img src="./wedding.png" alt="wedding" />
                                    <h4>WEDDING</h4>
                                </Link>
                            </div>

                            <div className="world_box">
                                <Link to="/Category/Gold">
                                    <img src="./gold.png" alt="gold" />
                                    <h4>GOLD</h4>
                                </Link>
                            </div>

                        </IonCol>

                        {/* Right Side */}
                        <IonCol size="12" size-md="6">

                            <div className="world_box">
                                <Link to="/Category/Diamond">
                                    <img src="./diamond.png" alt="diamond" />
                                    <h4>DIAMOND</h4>
                                </Link>
                            </div>

                            <div className="world_box">
                                <Link to ="DailyWear">
                                    <img src="./dailywear.png" alt="dailywear" />
                                    <h4>DAILY WEAR</h4>
                                </Link>

                            </div>

                        </IonCol>

                    </IonRow>

                </IonGrid>

                <IonGrid>
                    <IonRow>

                        <IonCol size="12" sizeMd="3">
                            <div className="img-box">
                                <img src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwd2ac5b8e/homepage/assurance/tanishq-exchange-logo.svg" alt="" />
                                <p>Tanishq Exchange</p>
                            </div>
                        </IonCol>

                        <IonCol size="12" sizeMd="3">
                            <div className="img-box">
                                <img src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw346e1c29/homepage/assurance/tanishq-purity-logo.svg" alt="" />
                                <p>The Purity Guarantee</p>
                            </div>
                        </IonCol>

                        <IonCol size="12" sizeMd="3">
                            <div className="img-box">
                                <img src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw8fc1a591/homepage/assurance/tanishq-trust-logo.svg" alt="" />
                                <p>Complete Transparency and Trust</p>
                            </div>
                        </IonCol>

                        <IonCol size="12" sizeMd="3">
                            <div className="img-box">
                                <img src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwbedd999e/homepage/assurance/tanishq-lifetime-logo.svg" alt="" />
                                <p>Lifetime Maintenance</p>
                            </div>
                        </IonCol>

                    </IonRow>
                </IonGrid>




                <section className="shop_by_gender">
                    <IonGrid>

                        {/* Heading */}
                        <IonRow>
                            <IonCol>
                                <h3 className="ion-text-center">Curated For You</h3>
                                <h5 className="ion-text-center">Shop By Gender</h5>
                            </IonCol>
                        </IonRow>

                        {/* Images */}
                        <IonRow>

                            <IonCol size="12" sizeMd="4">
                                <div className="gender-box">
                                    <img src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw811805ad/homepage/ShopByGender/sbg-women.jpg" alt="" />
                                    <h5>Women Jewellery</h5>
                                </div>
                            </IonCol>

                            <IonCol size="12" sizeMd="4">
                                <div className="gender-box">
                                    <img src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwe6fec18e/homepage/ShopByGender/sbg-men.jpg" alt="" />
                                    <h5>Men Jewellery</h5>
                                </div>
                            </IonCol>

                            <IonCol size="12" sizeMd="4">
                                <div className="gender-box">
                                    <img src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw1e976d94/homepage/ShopByGender/sbg-kids.jpg" alt="" />
                                    <h5>Kids Jewellery</h5>
                                </div>
                            </IonCol>

                        </IonRow>

                    </IonGrid>
                </section>



                <section className="experience">
                    <IonGrid>

                        {/* Heading */}
                        <IonRow>
                            <IonCol>
                                <h3>Tanishq Experience</h3>
                                <h4>Find a Boutique or Book a Consultation</h4>
                            </IonCol>
                        </IonRow>

                        {/* Row 1 */}
                        <IonRow>
                            <IonCol size="12" size-md="4">
                                <div>
                                    <img
                                        src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw93bac46c/homepage/tanishq-experience/store-locator.jpg"
                                        alt=""
                                        className="img-fluid"
                                    />
                                    <h6>VISIT OUR STORE</h6>
                                </div>
                            </IonCol>

                            <IonCol size="12" size-md="4">
                                <div>
                                    <img
                                        src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwa5fbf111/homepage/tanishq-experience/book-an-appointment.jpg"
                                        alt=""
                                        className="img-fluid"
                                    />
                                    <h6>BOOK AN APPOINTMENT</h6>
                                </div>
                            </IonCol>

                            <IonCol size="12" size-md="4">
                                <div>
                                    <img
                                        src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwe51566e5/homepage/tanishq-experience/talk-to-expert.png"
                                        alt=""
                                        className="img-fluid"
                                    />
                                    <h6>TALK TO AN EXPERT</h6>
                                </div>
                            </IonCol>
                        </IonRow>

                        {/* Row 2 */}
                        <IonRow>
                            <IonCol size="12" size-md="4">
                                <div>
                                    <img
                                        src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw52758e7c/homepage/tanishq-experience/Digigold.jpg"
                                        alt=""
                                        className="img-fluid"
                                    />
                                    <h6>DIGI GOLD</h6>
                                </div>
                            </IonCol>

                            <IonCol size="12" size-md="4">
                                <div>
                                    <img
                                        src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwbf8657ec/homepage/tanishq-experience/blogs.jpg"
                                        alt=""
                                        className="img-fluid"
                                    />
                                    <h6>BLOGS</h6>
                                </div>
                            </IonCol>

                            <IonCol size="12" size-md="4">
                                <div>
                                    <img
                                        src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw8c17e244/homepage/tanishq-experience/jewellery-care-guide.jpg"
                                        alt=""
                                        className="img-fluid"
                                    />
                                    <h6>JEWELLERY GUIDE</h6>
                                </div>
                            </IonCol>
                        </IonRow>

                    </IonGrid>
                </section>





                <section className="footer">
                    <IonGrid>
                        <IonRow>

                            {/* Column 1 */}
                            <IonCol size="12" size-md="3" className="ion-text-center">
                                <img
                                    src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwcfc0b576/images/footer/tanishq-footer-logo.svg"
                                    alt="img"
                                />
                                <h5>Download the Tanishq App Now</h5>
                                <img
                                    src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw0fa1b94a/images/footer/tanishq-app-QR-code.svg"
                                    alt="img"
                                />
                            </IonCol>

                            {/* Column 2 */}
                            <IonCol size="12" size-md="3" className="link">
                                <ul>
                                    <h4>Useful links</h4>
                                    <li>Delivery Information</li>
                                    <li>International Shipping</li>
                                    <li>Payment Options</li>
                                    <li>Track your Order</li>
                                    <li>Returns</li>
                                    <li>Find a Store</li>
                                </ul>
                            </IonCol>

                            {/* Column 3 */}
                            <IonCol size="12" size-md="3" className="link">
                                <ul>
                                    <h4>Information</h4>
                                    <li>Blog</li>
                                    <li>Offers & Contest Details</li>
                                    <li>Help & FAQs</li>
                                    <li>About Tanishq</li>
                                </ul>
                            </IonCol>

                            {/* Column 4 */}
                            <IonCol size="12" size-md="3" className="link">
                                <ul>
                                    <h4>Contact Us</h4>
                                    <li>1800-266-0123</li>

                                    <h4>Chat With Us</h4>
                                    <li><u>+91 8147349242</u></li>
                                </ul>

                                <ul className="social_media">
                                    <li>
                                        <a href="https://www.whatsapp.com/">
                                            <img
                                                src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwd94cc295/images/footer/footer-whatsapp.svg"
                                                alt="img"
                                            />
                                        </a>
                                    </li>

                                    <li>
                                        <a href="https://mail.google.com/">
                                            <img
                                                src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwca9d87e8/images/footer/footer-writetous.svg"
                                                alt="img"
                                            />
                                        </a>
                                    </li>

                                    <li>
                                        <img
                                            src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw69956d76/images/footer/footer-chatwithus.svg"
                                            alt="img"
                                        />
                                    </li>
                                </ul>
                            </IonCol>

                        </IonRow>
                    </IonGrid>
                </section>









            </IonContent>
        </IonPage >
    );
};

export default Home;