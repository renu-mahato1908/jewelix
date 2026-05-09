import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon, IonHeader, IonToolbar
} from "@ionic/react";

import { heartOutline, cartOutline } from "ionicons/icons";
import "./AllCategory.css";

const Gold: React.FC = () => {
  return (
    <IonPage>

      <IonHeader>
        <IonToolbar className="header-toolbar">

          <div className="logo">
            <img src="https://zerocreativity0.wordpress.com/wp-content/uploads/2016/05/tanishq-logo.jpg?w=768&h=576" className="logo" />
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
                  src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwe4bf267c/images/hi-res/510122FAAAA00_1.jpg"
                  className="product-img"
                />

                <div className="details">
                  <p>Gold Leaf Patterned Finger Ring</p>
                  <h5>₹56668</h5>
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
                  src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw57f5c07f/images/hi-res/504025HMTAAA00_1.jpg"
                  className="product-img"
                />

                <div className="details">
                  <p>Enticing Petite Drop Earrings</p>
                  <h5>₹55283</h5>
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
                  src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw2b44b79c/images/hi-res/515090DBQAGA00_2.jpg"
                  className="product-img"
                />

                <div className="details">
                  <p>Leaf Motif Gold Drop Earrings</p>
                  <h5>₹53936</h5>
                </div>

                <IonButton className="buy-btn">Buy Now</IonButton>
              </div>
            </IonCol>

          </IonRow>


          {/* ✅ ROW 2 (Added Properly) */}
          <IonRow>

            <IonCol size="12" size-md="4">
              <div className="polaroid">
                <div className="icon-group">
                  <IonIcon icon={heartOutline} className="icon-btn" />
                  <IonIcon icon={cartOutline} className="icon-btn" />
                </div>

                <img
                  src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw4ec4effa/images/hi-res/51D3D1DMQABA00_2.jpg"
                  className="product-img"
                />

                <div className="details">
                  <p>Stunning Abstract Drop Earrings</p>
                  <h5>₹69379</h5>
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
                  src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwa73dc74e/images/hi-res/51D3D1HCOABA00_2.jpg"
                  className="product-img"
                />

                <div className="details">
                  <p>Netted Miracles Hoop Earrings</p>
                  <h5>₹47693</h5>
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
                  src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw3b97d2e8/images/hi-res/513218PQEAAA00_1.jpg"
                  className="product-img"
                />

                <div className="details">
                  <p>Minimalistic Leaf Motif Gold Pendant</p>
                  <h5>₹28962</h5>
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

export default Gold;