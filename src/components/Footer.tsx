// import React, { useEffect, useState } from 'react';
// import { IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon, IonBadge, IonLabel } from '@ionic/react';
// import { heartOutline, cartOutline, personOutline, bagHandleOutline, locationOutline } from 'ionicons/icons';
// import { useHistory } from 'react-router-dom';

// const Footer = () => {
//   const history = useHistory();
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     loadCounts();
//     window.addEventListener('storage', loadCounts);
//     return () => {
//       window.removeEventListener('storage', loadCounts);
//     };
//   }, []);

//   const loadCounts = () => {
//     const user = localStorage.getItem('currentUserId');
//     if (!user) return;

//     const wishlistData = JSON.parse(localStorage.getItem('wishlist') || '[]');
//     const cartData = JSON.parse(localStorage.getItem('cart') || '[]');

//     const wishCount = wishlistData.filter((item: any) => item.userId == user).length;
//     const crtCount = cartData.filter((item: any) => item.userId == user).length;

//     setWishlistCount(wishCount);
//     setCartCount(crtCount);
//   };

//   return (
//     <IonFooter>
//       <IonToolbar>
//         <IonSegment selectOnFocus>
//           <IonSegmentButton value="home" onClick={() => history.push('/home')}>
//             <IonIcon icon={bagHandleOutline} />
//             <IonLabel>Shop</IonLabel>
//           </IonSegmentButton>

//           <IonSegmentButton value="wishlist" onClick={() => history.push('/wishlist')}>
//             <IonIcon icon={heartOutline} />
//             {wishlistCount > 0 && <IonBadge color="danger">{wishlistCount}</IonBadge>}
//             <IonLabel>Wishlist</IonLabel>
//           </IonSegmentButton>

//           <IonSegmentButton value="cart" onClick={() => history.push('/cart')}>
//             <IonIcon icon={cartOutline} />
//             {cartCount > 0 && <IonBadge color="danger">{cartCount}</IonBadge>}
//             <IonLabel>Cart</IonLabel>
//           </IonSegmentButton>

//           <IonSegmentButton value="location" onClick={() => history.push('/orders')}>
//             <IonIcon icon={locationOutline} />
//             <IonLabel>Track</IonLabel>
//           </IonSegmentButton>

//           <IonSegmentButton value="profile" onClick={() => history.push('/profile')}>
//             <IonIcon icon={personOutline} />
//             <IonLabel>Profile</IonLabel>
//           </IonSegmentButton>
//         </IonSegment>
//       </IonToolbar>
//     </IonFooter>
//   );
// };

// export default Footer;



import React, { useEffect, useState } from 'react';
import { IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon, IonBadge, IonLabel } from '@ionic/react';
import { heartOutline, cartOutline, personOutline, bagHandleOutline, locationOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const Footer = () => {
    const history = useHistory();
    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        loadCounts();
        window.addEventListener('storage', loadCounts);
        return () => {
            window.removeEventListener('storage', loadCounts);
        };
    }, []);

    const loadCounts = () => {
        const user = localStorage.getItem('currentUserId');
        if (!user) return;

        const wishlistData = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const cartData = JSON.parse(localStorage.getItem('cart') || '[]');

        const wishCount = wishlistData.filter((item: any) => item.userId == user).length;
        const crtCount = cartData.filter((item: any) => item.userId == user).length;

        setWishlistCount(wishCount);
        setCartCount(crtCount);
    };

    return (
        <IonFooter>
            <IonToolbar>
                {/* scrollable hatayein taaki sab screen me stretch ho sakein */}
                <IonSegment selectOnFocus style={{ '--background': 'transparent' }}>

                    {/* layout="icon-top" se icon upar aur text niche proper manage hoga */}
                    <IonSegmentButton value="home" layout="icon-top" style={styles.button} onClick={() => history.push('/home')}>
                        <IonIcon icon={bagHandleOutline} style={styles.icon} />
                        <IonLabel style={styles.label}>Shop</IonLabel>
                    </IonSegmentButton>

                    <IonSegmentButton value="wishlist" layout="icon-top" style={styles.button} onClick={() => history.push('/wishlist')}>
                        <div style={styles.badgeContainer}>
                            <IonIcon icon={heartOutline} style={styles.icon} />
                            {wishlistCount > 0 && <IonBadge color="danger" style={styles.badge}>{wishlistCount}</IonBadge>}
                        </div>
                        <IonLabel style={styles.label}>Wishlist</IonLabel>
                    </IonSegmentButton>

                    <IonSegmentButton value="cart" layout="icon-top" style={styles.button} onClick={() => history.push('/cart')}>
                        <div style={styles.badgeContainer}>
                            <IonIcon icon={cartOutline} style={styles.icon} />
                            {cartCount > 0 && <IonBadge color="danger" style={styles.badge}>{cartCount}</IonBadge>}
                        </div>
                        <IonLabel style={styles.label}>Cart</IonLabel>
                    </IonSegmentButton>

                    <IonSegmentButton value="location" layout="icon-top" style={styles.button} onClick={() => history.push('/orders')}>
                        <IonIcon icon={locationOutline} style={styles.icon} />
                        <IonLabel style={styles.label}>Track</IonLabel>
                    </IonSegmentButton>

                    <IonSegmentButton value="profile" layout="icon-top" style={styles.button} onClick={() => history.push('/Account')}>
                        <IonIcon icon={personOutline} style={styles.icon} />
                        <IonLabel style={styles.label}>Profile</IonLabel>
                    </IonSegmentButton>

                </IonSegment>
            </IonToolbar>
        </IonFooter>
    );
};

// Phone view ke liye customized responsive styles
const styles = {
    button: {
        minWidth: '0',
        paddingLeft: '2px',
        paddingRight: '2px',
        '--padding-start': '0px',
        '--padding-end': '0px',
    },
    icon: {
        fontSize: '20px',
        marginBottom: '2px',
    },
    label: {
        fontSize: '10px',
        textTransform: 'none' as const,
    },
    badgeContainer: {
        position: 'relative' as const,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    badge: {
        position: 'absolute' as const,
        top: '-6px',
        right: '-10px',
        fontSize: '9px',
        padding: '2px 4px',
        borderRadius: '10px',
        minWidth: '14px',
        height: '14px',
    }
};

export default Footer;
