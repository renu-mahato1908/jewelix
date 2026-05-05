import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonHeader,
  IonToolbar
} from "@ionic/react";

import { heartOutline, cartOutline } from "ionicons/icons";
import "./AllCategory.css";

const Bangles: React.FC = () => {
  return (
    <IonPage>

      <IonHeader>
        <IonToolbar className="header-toolbar">

          <div className="logo">
            <img
              src="https://zerocreativity0.wordpress.com/wp-content/uploads/2016/05/tanishq-logo.jpg?w=768&h=576"
              className="logo"
              alt="logo"
            />
          </div>

        </IonToolbar>
      </IonHeader>

      <IonContent>

        <IonGrid>

          {/* ROW 1 */}
          <IonRow>

            <IonCol size="12" size-md="4">
              <div className="polaroid">

                <div className="icon-group">
                  <IonIcon icon={heartOutline} className="icon-btn" />
                  <IonIcon icon={cartOutline} className="icon-btn" />
                </div>

                <img
                  src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800&auto=format&fit=crop"
                  className="product-img"
                  alt="Gold Bangle"
                />

                <div className="details">
                  <p>Elegant Floral Gold Bangle</p>
                  <h5>₹125620</h5>
                </div>

                <IonButton className="buy-btn">Buy Now</IonButton>

              </div>
            </IonCol>

            <IonCol size="12" size-md="4">
              <div className="polaroid">

                <div className="icon-group">
                  <IonIcon icon={heartOutline} className="icon-btn" />
                  <IonIcon icon={cartOutline} className="icon-btn" />
                </div>

                <img
                  src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop"
                  className="product-img"
                  alt="Diamond Bangle"
                />

                <div className="details">
                  <p>Royal Diamond Studded Bangle</p>
                  <h5>₹148550</h5>
                </div>

                <IonButton className="buy-btn">Buy Now</IonButton>

              </div>
            </IonCol>

            <IonCol size="12" size-md="4">
              <div className="polaroid">

                <div className="icon-group">
                  <IonIcon icon={heartOutline} className="icon-btn" />
                  <IonIcon icon={cartOutline} className="icon-btn" />
                </div>

                <img
                  src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=800&auto=format&fit=crop"
                  className="product-img"
                  alt="Modern Bangle"
                />

                <div className="details">
                  <p>Minimal Gold Designer Bangle</p>
                  <h5>₹98600</h5>
                </div>

                <IonButton className="buy-btn">Buy Now</IonButton>

              </div>
            </IonCol>

          </IonRow>

          {/* ROW 2 */}
          <IonRow>

            <IonCol size="12" size-md="4">
              <div className="polaroid">

                <div className="icon-group">
                  <IonIcon icon={heartOutline} className="icon-btn" />
                  <IonIcon icon={cartOutline} className="icon-btn" />
                </div>

                <img
                  src="https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop"
                  className="product-img"
                  alt="Traditional Bangle"
                />

                <div className="details">
                  <p>Traditional Wedding Gold Bangle</p>
                  <h5>₹176890</h5>
                </div>

                <IonButton className="buy-btn">Buy Now</IonButton>

              </div>
            </IonCol>

            <IonCol size="12" size-md="8">
              <div className="banner-img">
                <img
                  src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
                  className="offer-img"
                  alt="Jewellery Banner"
                />
              </div>
            </IonCol>

          </IonRow>

          {/* ROW 3 */}
          <IonRow>

            <IonCol size="12" size-md="4">
              <div className="polaroid">

                <div className="icon-group">
                  <IonIcon icon={heartOutline} className="icon-btn" />
                  <IonIcon icon={cartOutline} className="icon-btn" />
                </div>

                <img
                  src="https://images.unsplash.com/photo-1627293509201-cd0c780043e6?q=80&w=800&auto=format&fit=crop"
                  className="product-img"
                  alt="Luxury Bangle"
                />

                <div className="details">
                  <p>Luxury Diamond Gold Bangle</p>
                  <h5>₹210450</h5>
                </div>

                <IonButton className="buy-btn">Buy Now</IonButton>

              </div>
            </IonCol>

            <IonCol size="12" size-md="4">
              <div className="polaroid">

                <div className="icon-group">
                  <IonIcon icon={heartOutline} className="icon-btn" />
                  <IonIcon icon={cartOutline} className="icon-btn" />
                </div>

                <img
                  src="https://images.unsplash.com/photo-1619119069152-a2b331eb392a?q=80&w=800&auto=format&fit=crop"
                  className="product-img"
                  alt="Classic Bangle"
                />

                <div className="details">
                  <p>Classic Rose Gold Bangle</p>
                  <h5>₹118900</h5>
                </div>

                <IonButton className="buy-btn">Buy Now</IonButton>

              </div>
            </IonCol>

            <IonCol size="12" size-md="4">
              <div className="polaroid">

                <div className="icon-group">
                  <IonIcon icon={heartOutline} className="icon-btn" />
                  <IonIcon icon={cartOutline} className="icon-btn" />
                </div>

                <img
                  src="https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=800&auto=format&fit=crop"
                  className="product-img"
                  alt="Premium Bangle"
                />

                <div className="details">
                  <p>Premium Sparkle Diamond Bangle</p>
                  <h5>₹245999</h5>
                </div>

                <IonButton className="buy-btn">Buy Now</IonButton>

              </div>
            </IonCol>

          </IonRow>

        </IonGrid>

      </IonContent>

    </IonPage>
  );
};

export default Bangles;