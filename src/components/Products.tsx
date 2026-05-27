import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import axios from "axios";

import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonImg,
  IonIcon,
  IonText,
} from "@ionic/react";

import {
  gridOutline,
  personOutline,
  addCircleOutline,
  bagHandleOutline,
  folderOpenOutline,
  receiptOutline,
  trashOutline,
} from "ionicons/icons";

import { Link } from "react-router-dom";

import './Product.css';

// Interface
interface Product {
  id: number;
  productName: string;
  productCategory: string;
  productPrice: number;
  productDescription: string;
  productGender: string;
  images: string[];
}

const Products: React.FC = () => {

  // useState component ke andar
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch Products
  useEffect(() => {
    axios
      .get("https://simmering-shabby-overtake.ngrok-free.dev/api/ssproducts")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Delete Product
  const handleDelete = (id: number) => {
    axios
      .delete(`https://simmering-shabby-overtake.ngrok-free.dev/api/ssproducts/${id}`)
      .then((response) => {
        console.log(response.data);

        setProducts(
          products.filter((item) => item.id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <IonPage>
      <Header handleLogout={handleLogout} />

      <IonContent fullscreen className="products-page">

        <div className="top-section">
          <h1>Products</h1>
        </div>

        <IonGrid>

          {/* Buttons */}
          <IonRow className="btn-row">

            <IonCol size="12" sizeMd="3">
              <Link to="/Addproduct">
                <IonButton expand="block" className="gold-btn">
                  Add Product
                </IonButton>
              </Link>
            </IonCol>

            <IonCol size="12" sizeMd="3">
              <Link to="/UpdateProduct">
                <IonButton expand="block" className="gold-btn">
                  Update Product
                </IonButton>
              </Link>
            </IonCol>

          </IonRow>

          <IonRow>

            {/* Sidebar */}
            <IonCol size="12" sizeMd="3">

              <IonCard className="sidebar-card">
                <IonCardContent>

                  <IonList>

                    <IonItem routerLink="/Dashboard">
                      <IonIcon icon={gridOutline} slot="start" />
                      <IonLabel>Dashboard</IonLabel>
                    </IonItem>

                    <IonItem routerLink="/Account">
                      <IonIcon icon={personOutline} slot="start" />
                      <IonLabel>Account</IonLabel>
                    </IonItem>

                    <IonItem routerLink="/Addproduct">
                      <IonIcon icon={addCircleOutline} slot="start" />
                      <IonLabel>Add Product</IonLabel>
                    </IonItem>

                    <IonItem routerLink="/Products">
                      <IonIcon icon={bagHandleOutline} slot="start" />
                      <IonLabel>Products</IonLabel>
                    </IonItem>

                    <IonItem routerLink="/AddCategory">
                      <IonIcon icon={folderOpenOutline} slot="start" />
                      <IonLabel>Add Category</IonLabel>
                    </IonItem>

                    <IonItem routerLink="/OrdersDetail">
                      <IonIcon icon={receiptOutline} slot="start" />
                      <IonLabel>Orders</IonLabel>
                    </IonItem>

                  </IonList>

                </IonCardContent>
              </IonCard>

            </IonCol>

            {/* Product Table */}
            <IonCol size="12" sizeMd="9">

              <IonCard className="table-card">
                <IonCardContent>

                  <div className="table-responsive">

                    <table className="product-table">

                      <thead>
                        <tr>
                          <th>Sl</th>
                          <th>Name</th>
                          <th>Image</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Description</th>
                          <th>Gender</th>
                          <th>Delete</th>
                        </tr>
                      </thead>

                      <tbody>

                        {products.map((product, index) => (

                          <tr key={product.id}>

                            <td>{index + 1}</td>

                            <td>{product.productName}</td>

                            <td>
                              <IonImg
                                className="product-img"
                                src={`https://simmering-shabby-overtake.ngrok-free.dev/upload/${product.images[0]}`}
                                alt="product"
                              />
                            </td>

                            <td>{product.productCategory}</td>

                            <td>
                              <IonText color="success">
                                ₹{product.productPrice}
                              </IonText>
                            </td>

                            <td>{product.productDescription}</td>

                            <td>{product.productGender}</td>

                            <td>
                              <IonButton
                                color="danger"
                                onClick={() =>
                                  handleDelete(product.id)
                                }
                              >
                                <IonIcon icon={trashOutline} />
                              </IonButton>
                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                </IonCardContent>
              </IonCard>

            </IonCol>

          </IonRow>

        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Products;