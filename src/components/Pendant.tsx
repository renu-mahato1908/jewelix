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

const Pendant: React.FC = () => {
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw5703e4c2/images/hi-res/50DFB1PAQAAA32_2.jpg?sw=480&sh=480"
                  className="product-img"
                />

                <div className="details">
                  <p>Versatile Chic Diamond Pendant</p>
                  <h5>₹73325</h5>
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwed7e6be7/images/hi-res/512714PRIAAA00_1.jpg?sw=640&sh=640"
                  className="product-img"
                />

                <div className="details">
                  <p>Surreal Modern Abstract Floral Gold Pendant</p>
                  <h5>₹14985</h5>
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw553be4a7/images/hi-res/51D4MGPDHAAA00_1.jpg?sw=640&sh=640"
                  className="product-img"
                />

                <div className="details">
                  <p>Enchanting Leaf Gold Pendant</p>
                  <h5>₹29178</h5>
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw7bd1fb47/images/hi-res/50K4I1PJMAAA09_1.jpg?sw=640&sh=640"
                  className="product-img"
                />

                <div className="details">
                  <p>Flower Diamond Pendant</p>
                  <h5>₹17916</h5>
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw32f5d2f1/images/hi-res/50K4I1PJOAAA09_1.jpg?sw=640&sh=640"
                  className="product-img"
                />

                <div className="details">
                  <p>Lovely Diamond Pendant for Kids</p>
                  <h5>₹17985</h5>
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8cf46ef0/images/hi-res/512714PXBAAA00_2.jpg?sw=480&sh=480"
                  className="product-img"
                />

                <div className="details">
                  <p>Elegant Gold Leaf Pendant</p>
                  <h5>₹15047</h5>
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw07b8265e/images/hi-res/50D5L2PBCAAA09_1.jpg?sw=640&sh=640"
                  className="product-img"
                />

                <div className="details">
                  <p>Spiral Bloom Diamond Pendant</p>
                  <h5>₹22967</h5>
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8b528970/images/hi-res/50D6VDPAIAAA09_1.jpg?sw=640&sh=640"
                  className="product-img"
                />

                <div className="details">
                  <p>Happy Heart Diamond Pendant</p>
                  <h5>₹30581</h5>
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw47addd28/images/hi-res/50D6VDPAHAAA09_2.jpg?sw=640&sh=640"
                  className="product-img"
                />

                <div className="details">
                  <p>Sunny Love Diamond Pendant</p>
                  <h5>₹35568</h5>
                </div>

                <IonButton className="buy-btn">Buy Now</IonButton>

              </div>
            </IonCol>

          </IonRow>

          {/* ROW 4 */}
          <IonRow>

            <IonCol size="12" size-md="4">
              <div className="polaroid">

                <div className="icon-group">
                  <IonIcon icon={heartOutline} className="icon-btn" />
                  <IonIcon icon={cartOutline} className="icon-btn" />
                </div>

                <img
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwc214e02d/images/hi-res/50D5WMPAFAAA02_1.jpg?sw=640&sh=640"
                  className="product-img"
                />

                <div className="details">
                  <p>Sculpted Wing Diamond Pendant</p>
                  <h5>₹53454</h5>
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw17f4dcc7/images/hi-res/50D5WXPAJAAA02_1.jpg?sw=640&sh=640"
                  className="product-img"
                />

                <div className="details">
                  <p>Aureate Wing Diamond Pendant</p>
                  <h5>₹25387</h5>
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
                  src="http://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw97b7a1c2/images/hi-res/50D5L2PAYAAA09_1.jpg?sw=640&sh=640"
                  className="product-img"
                />

                <div className="details">
                  <p>Floating Flora Diamond Pendant</p>
                  <h5>₹22685</h5>
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

export default Pendant;