
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonRadioGroup,
  IonRadio,
} from "@ionic/react";
import "./AddProduct.css";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./AddProduct.css";

const AddProduct: React.FC = () => {
  const history = useHistory();

  // const [categories, setCategories] = useState<any[]>([]);

    const [categories, setCategories] = useState([]);

  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);

  const { user: currentUser } = useSelector((state: any) => state.auth);

  useEffect(() => {
    axios.get("https://renuka-saa9.vercel.app/api/cats").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(e.target.files);
    }
  };

  const Schema = Yup.object().shape({
    productName: Yup.string().required("Required"),
    productPrice: Yup.string().required("Required"),
    productCategory: Yup.string().required("Required"),
    productDescription: Yup.string().required("Required"),
    productGender: Yup.string().required("Required"),
  });



   useEffect(() => {

      if (currentUser && currentUser.roles[0] !== "ROLE_ADMIN") {
        history.push("/Dashboard");
      }

    }, [history]);

  return (
    <IonPage>
      <IonContent className="addproduct-content ion-padding">

        <div className="form-container">
          <h2 className="title">Add New Jewellery</h2>
          <p className="subtitle">Craft elegance with every piece ✨</p>

          <Formik
            initialValues={{
              productName: "",
              productPrice: "",
              productCategory: "",
              productDescription: "",
              productGender: "",

            }}
            validationSchema={Schema}
            onSubmit={async (values, { resetForm }) => {

              const formData = new FormData();
              formData.append("userId", currentUser.id);

              Object.keys(values).forEach((key) => {
                formData.append(key, (values as any)[key]);
              });

              if (selectedImages) {
                for (let i = 0; i < selectedImages.length; i++) {
                  formData.append("images", selectedImages[i]);
                }
              }

              try {
                await axios.post(
                  "https://renuka-saa9.vercel.app/api/ssproduct",
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );

                alert("Product added successfully!");
                resetForm();
                setSelectedImages(null);
                history.push("/products");

              } catch (err) {
                console.error(err);
                alert("Upload failed");
              }
            }}
          >
            {({ handleSubmit, values, errors, touched, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <IonGrid>

                  {/* Product Name */}
                  <IonRow>
                    <IonCol>
                      <IonItem className="custom-input">
                        <IonLabel position="stacked">Product Name</IonLabel>
                        <IonInput
                          value={values.productName}
                          onIonChange={(e) =>
                            setFieldValue("productName", e.detail.value ?? "")
                          }
                        />
                      </IonItem>
                      {touched.productName && errors.productName && (
                        <p className="error">{errors.productName}</p>
                      )}
                    </IonCol>
                  </IonRow>

                  {/* Price */}
                  <IonRow>
                    <IonCol>
                      <IonItem className="custom-input">
                        <IonLabel position="stacked">Price (₹)</IonLabel>
                        <IonInput
                          type="number"
                          value={values.productPrice}
                          onIonChange={(e) =>
                            setFieldValue("productPrice", e.detail.value ?? "")
                          }
                        />
                      </IonItem>
                      {touched.productPrice && errors.productPrice && (
                        <p className="error">{errors.productPrice}</p>
                      )}
                    </IonCol>
                  </IonRow>

                  {/* Category */}
                  <IonRow>
                    <IonCol>
                      <IonItem className="custom-input">
                        <IonLabel>Category</IonLabel>
                        <IonSelect
                          value={values.productCategory}
                          onIonChange={(e: any) =>
                            setFieldValue("productCategory", e.detail.value)
                          }
                        >
                          <IonSelectOption value="">
                            Select Category
                          </IonSelectOption>
                          {categories.map((cat, i) => (
                            <IonSelectOption key={i} value={cat.name}>
                              {cat.name}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>
                      {touched.productCategory && errors.productCategory && (
                        <p className="error">{errors.productCategory}</p>
                      )}
                    </IonCol>
                  </IonRow>

                  {/* Description */}
                  <IonRow>
                    <IonCol>
                      <IonItem className="custom-input">
                        <IonLabel position="stacked">Description</IonLabel>
                        <IonTextarea
                          autoGrow
                          value={values.productDescription}
                          onIonChange={(e) =>
                            setFieldValue(
                              "productDescription",
                              e.detail.value ?? ""
                            )
                          }
                        />
                      </IonItem>
                      {touched.productDescription &&
                        errors.productDescription && (
                          <p className="error">
                            {errors.productDescription}
                          </p>
                        )}
                    </IonCol>
                  </IonRow>

                  {/* Gender */}
                  <IonRow>
                    <IonCol>
                      <IonLabel className="section-label">For</IonLabel>
                      <IonRadioGroup
                        value={values.productGender}
                        onIonChange={(e: any) =>
                          setFieldValue("productGender", e.detail.value)
                        }
                      >
                        <div className="radio-group">
                          <IonItem className="radio-item">
                            <IonLabel>Male</IonLabel>
                            <IonRadio value="Male" />
                          </IonItem>

                          <IonItem className="radio-item">
                            <IonLabel>Female</IonLabel>
                            <IonRadio value="Female" />
                          </IonItem>
                        </div>
                      </IonRadioGroup>

                      {touched.productGender && errors.productGender && (
                        <p className="error">{errors.productGender}</p>
                      )}
                    </IonCol>
                  </IonRow>

                  {/* Upload */}
                  <IonRow>
                    <IonCol>
                      <div className="upload-box">
                        <input type="file" multiple onChange={handleFileChange} />
                        <p>Upload Product Images</p>
                        {selectedImages && (
                          <span>{selectedImages.length} image(s) selected</span>
                        )}
                      </div>
                    </IonCol>
                  </IonRow>

                  {/* Button */}
                  <IonRow>
                    <IonCol>
                      <IonButton expand="block" type="submit" className="gold-btn">
                        Add Product
                      </IonButton>
                    </IonCol>
                  </IonRow>

                </IonGrid>
              </form>
            )}
          </Formik>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default AddProduct;

















