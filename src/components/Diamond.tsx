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

const Diamond: React.FC = () => {
  return (
    <IonPage>

      <IonHeader>
        <IonToolbar className="header-toolbar">

          <div className="logo">
            <img
              src="http://zerocreativity0.wordpress.com/wp-content/uploads/2016/05/tanishq-logo.jpg?w=768&h=576"
              className="logo"
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw38719dc0/images/hi-res/55D5PBDUNABA02_2.jpg?sw=480&sh=480"
                  className="product-img"
                />

                <div className="details">
                  <p>Royal Filigree Diamond Earrings</p>
                  <h5>₹92653</h5>
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw7a7834a1/images/hi-res/55D5PBFVBAA02_2.jpg?sw=480&sh=480"
                  className="product-img"
                />

                <div className="details">
                  <p>Abstract Embrance Diamond Ring</p>
                  <h5>₹72111</h5>
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwf3768930/images/hi-res/55D5PBFZQAA02_2.jpg?sw=480&sh=480"
                  className="product-img"
                />

                <div className="details">
                  <p>Ripple Curve Diamond Ring</p>
                  <h5>₹87664</h5>
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw1fe63a62/images/hi-res/55D5PBFZGAA02_1.jpg?sw=480&sh=480"
                  className="product-img"
                />

                <div className="details">
                  <p>Overlapping Vanki Diamond Ring</p>
                  <h5>₹43810</h5>
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw3952317b/images/hi-res/50D5PLSJJABA10_2.jpg?sw=480&sh=480"
                  className="product-img"
                />

                <div className="details">
                  <p>Angular Radiance Diamond Earrings</p>
                  <h5>₹46897</h5>
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw73839c40/images/hi-res/501163PWJAAA09_2.jpg?sw=480&sh=480"
                  className="product-img"
                />

                <div className="details">
                  <p>Teardrop Shaped Gold and Diamond</p>
                  <h5>₹25708</h5>
                </div>

                <IonButton className="buy-btn">Buy Now</IonButton>

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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw3ff0830f/images/hi-res/50D2PTFYXAA09_2.jpg?sw=480&sh=480"
                  className="product-img"
                />

                <div className="details">
                  <p>Modlish Link Diamond Ring</p>
                  <h5>₹43412</h5>
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw315d4de9/images/hi-res/50E5B1FEUAA02_2.jpg?sw=480&sh=480"
                  className="product-img"
                />

                <div className="details">
                  <p>Infinite Vanki Diamond Ring</p>
                  <h5>₹44583</h5>
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw48540a55/images/hi-res/55D5PBFVFAA02_2.jpg?sw=480&sh=480"
                  className="product-img"
                />

                <div className="details">
                  <p>Bloom Trial Diamond Ring</p>
                  <h5>₹95006</h5>
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

export default Diamond;
