
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
    IonSpinner,
} from "@ionic/react";
import "./AddProduct.css";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const EditProduct: React.FC = () => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    const [categories, setCategories] = useState<any[]>([]);
    const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const { user: currentUser } = useSelector(
        (state: any) => state.auth
    );

    useEffect(() => {
        axios
            .get("https://renuka-saa9.vercel.app/api/cats")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        axios
            .get(`https://renuka-saa9.vercel.app/api/ssproduct/${id}`)
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (
            currentUser &&
            currentUser.roles[0] !== "ROLE_ADMIN"
        ) {
            history.push("/Dashboard");
        }
    }, [currentUser, history]);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
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

    if (loading) {
        return (
            <IonPage>
                <IonContent className="ion-padding">
                    <IonSpinner />
                </IonContent>
            </IonPage>
        );
    }

    return (
        <IonPage>
            <IonContent className="addproduct-content ion-padding">
                <div className="form-container">
                    <h2 className="title">Edit Jewellery</h2>
                    <p className="subtitle">
                        Update product details ✨
                    </p>

                    <Formik
                        enableReinitialize
                        initialValues={{
                            productName:
                                product?.productName || "",
                            productPrice:
                                product?.productPrice || "",
                            productCategory:
                                product?.productCategory || "",
                            productDescription:
                                product?.productDescription || "",
                            productGender:
                                product?.productGender || "",
                        }}
                        validationSchema={Schema}
                        onSubmit={async (
                            values,
                            { resetForm }
                        ) => {
                            const formData = new FormData();

                            formData.append(
                                "userId",
                                currentUser.id
                            );

                            Object.keys(values).forEach(
                                (key) => {
                                    formData.append(
                                        key,
                                        (values as any)[key]
                                    );
                                }
                            );

                            if (selectedImages) {
                                for (
                                    let i = 0;
                                    i < selectedImages.length;
                                    i++
                                ) {
                                    formData.append(
                                        "images",
                                        selectedImages[i]
                                    );
                                }
                            }

                            try {
                                await axios.put(
                                    `https://renuka-saa9.vercel.app/api/ssproduct/${id}`,
                                    formData,
                                    {
                                        headers: {
                                            "Content-Type":
                                                "multipart/form-data",
                                        },
                                    }
                                );

                                alert(
                                    "Product updated successfully!"
                                );

                                resetForm();
                                history.push("/products");
                            } catch (err) {
                                console.error(err);
                                alert("Update failed");
                            }
                        }}
                    >
                        {({
                            handleSubmit,
                            values,
                            errors,
                            touched,
                            setFieldValue,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <IonGrid>

                                    <IonRow>
                                        <IonCol>
                                            <IonItem className="custom-input">
                                                <IonLabel position="stacked">
                                                    Product Name
                                                </IonLabel>
                                                <IonInput
                                                    value={values.productName}
                                                    onIonChange={(e) =>
                                                        setFieldValue(
                                                            "productName",
                                                            e.detail.value ?? ""
                                                        )
                                                    }
                                                />
                                            </IonItem>

                                            {touched.productName &&
                                                errors.productName && (
                                                    <p className="error">
                                                        {errors.productName}
                                                    </p>
                                                )}
                                        </IonCol>
                                    </IonRow>

                                    <IonRow>
                                        <IonCol>
                                            <IonItem className="custom-input">
                                                <IonLabel position="stacked">
                                                    Price (₹)
                                                </IonLabel>
                                                <IonInput
                                                    type="number"
                                                    value={values.productPrice}
                                                    onIonChange={(e) =>
                                                        setFieldValue(
                                                            "productPrice",
                                                            e.detail.value ?? ""
                                                        )
                                                    }
                                                />
                                            </IonItem>

                                            {touched.productPrice &&
                                                errors.productPrice && (
                                                    <p className="error">
                                                        {errors.productPrice}
                                                    </p>
                                                )}
                                        </IonCol>
                                    </IonRow>

                                    {/* Category */}
                                    <IonRow>
                                        <IonCol>
                                            <IonItem className="custom-input">
                                                <IonLabel>
                                                    Category
                                                </IonLabel>

                                                <IonSelect
                                                    value={
                                                        values.productCategory
                                                    }
                                                    onIonChange={(e) =>
                                                        setFieldValue(
                                                            "productCategory",
                                                            e.detail.value
                                                        )
                                                    }
                                                >
                                                    {categories.map(
                                                        (cat: any, i) => (
                                                            <IonSelectOption
                                                                key={i}
                                                                value={cat.name}
                                                            >
                                                                {cat.name}
                                                            </IonSelectOption>
                                                        )
                                                    )}
                                                </IonSelect>
                                            </IonItem>

                                            {touched.productCategory &&
                                                errors.productCategory && (
                                                    <p className="error">
                                                        {
                                                            errors.productCategory
                                                        }
                                                    </p>
                                                )}
                                        </IonCol>
                                    </IonRow>

                                    <IonRow>
                                        <IonCol>
                                            <IonItem className="custom-input">
                                                <IonLabel position="stacked">
                                                    Description
                                                </IonLabel>

                                                <IonTextarea
                                                    autoGrow
                                                    value={
                                                        values.productDescription
                                                    }
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
                                                        {
                                                            errors.productDescription
                                                        }
                                                    </p>
                                                )}
                                        </IonCol>
                                    </IonRow>

                                    <IonRow>
                                        <IonCol>
                                            <IonLabel className="section-label">
                                                For
                                            </IonLabel>

                                            <IonRadioGroup
                                                value={
                                                    values.productGender
                                                }
                                                onIonChange={(e) =>
                                                    setFieldValue(
                                                        "productGender",
                                                        e.detail.value
                                                    )
                                                }
                                            >
                                                <IonItem>
                                                    <IonLabel>
                                                        Male
                                                    </IonLabel>
                                                    <IonRadio value="Male" />
                                                </IonItem>

                                                <IonItem>
                                                    <IonLabel>
                                                        Female
                                                    </IonLabel>
                                                    <IonRadio value="Female" />
                                                </IonItem>
                                            </IonRadioGroup>

                                            {touched.productGender &&
                                                errors.productGender && (
                                                    <p className="error">
                                                        {errors.productGender}
                                                    </p>
                                                )}
                                        </IonCol>
                                    </IonRow>

                                    {product?.images?.length >
                                        0 && (
                                            <IonRow>
                                                <IonCol>
                                                    <h4>
                                                        Current Images
                                                    </h4>

                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexWrap: "wrap",
                                                            gap: "10px",
                                                        }}
                                                    >
                                                        {product.images.map(
                                                            (
                                                                img: string,
                                                                index: number
                                                            ) => (
                                                                <img
                                                                    key={index}
                                                                    src={img}
                                                                    alt=""
                                                                    style={{
                                                                        width: "100px",
                                                                        height:
                                                                            "100px",
                                                                        objectFit:
                                                                            "cover",
                                                                        borderRadius:
                                                                            "8px",
                                                                    }}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </IonCol>
                                            </IonRow>
                                        )}

                                    <IonRow>
                                        <IonCol>
                                            <div className="upload-box">
                                                <input
                                                    type="file"
                                                    multiple
                                                    onChange={
                                                        handleFileChange
                                                    }
                                                />

                                                <p>
                                                    Upload New Images
                                                </p>

                                                {selectedImages && (
                                                    <span>
                                                        {
                                                            selectedImages.length
                                                        }{" "}
                                                        image(s)
                                                        selected
                                                    </span>
                                                )}
                                            </div>
                                        </IonCol>
                                    </IonRow>

                                    {/* Submit */}
                                    <IonRow>
                                        <IonCol>
                                            <IonButton
                                                expand="block"
                                                type="submit"
                                                className="gold-btn"
                                            >
                                                Update Product
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

export default EditProduct;