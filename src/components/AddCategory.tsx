
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRow,
    IonCol,
    IonLabel,
    IonText,
    IonInput,
    IonItem,
    IonButton,
    IonCard,
    IonCardContent, IonGrid, IonIcon
} from '@ionic/react';

import { Formik } from "formik";
import * as Yup from "yup";
import { trashOutline } from "ionicons/icons";
import "./Addcategory.css";

//  Validation
const Schema = Yup.object().shape({
    name: Yup.string()
        .required("Required")
        .test(
            "checkDuplicateCategory",
            "Category already exists",
            async function (value) {
                if (!value) return false;
                const res = await fetch(`https://simmering-shabby-overtake.ngrok-free.dev/api/cats/check?name=${value}`);
                const data = await res.json();
                return !data.exists;
            }
        ),
});

const AddCategory: React.FC = () => {

    const history = useHistory();
    const { user: currentUser } = useSelector((state: any) => state.auth);


    const [categories, setCategories] = useState([]);
    useEffect(() => {
      
          if (currentUser && currentUser.roles[0] !== "ROLE_ADMIN") {
            history.push("/Home");
          }
      
        }, [history]);

    useEffect(() => {
        axios.get("https://simmering-shabby-overtake.ngrok-free.dev/api/cats").then((response) => {
            console.log(response.data);
            setCategories(response.data);
        });

    }, []);


    const handleDelete = (id) => {
        console.log(id);
        axios.delete(`https://simmering-shabby-overtake.ngrok-free.dev/api/cats/${id}`).then((response) => {
            console.log(response.data);
            console.log("successfully category delete");
            window.location.reload();



        });

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="light">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Add Category</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="category-bg">

                <section>
                    <div className="category-container">



                        <IonCard className="category-card">
                            <h2 className="title">Add New Category</h2>

                            <IonCardContent>

                                <p className="subtitle">Organize your jewellery collections ✨</p>

                                <Formik
                                    initialValues={{ name: "" }}
                                    validationSchema={Schema}
                                    onSubmit={async (values, { resetForm }) => {
                                        try {
                                            await axios.post("https://simmering-shabby-overtake.ngrok-free.dev/api/cats", values);
                                            alert("Category added successfully!");
                                            resetForm();
                                            history.push("/products");
                                        } catch (err) {
                                            console.error(err);
                                            alert("Upload failed");
                                        }
                                    }}
                                >
                                    {({ handleChange, values, touched, errors, handleSubmit }) => (

                                        <form onSubmit={handleSubmit}>

                                            <IonItem className="custom-input">
                                                <IonLabel position="stacked">Category Name</IonLabel>
                                                <IonInput
                                                    name="name"
                                                    value={values.name}
                                                    placeholder=""
                                                    onIonChange={handleChange}
                                                />
                                            </IonItem>

                                            {errors.name && touched.name && (
                                                <IonText color="danger">
                                                    <p className="error">{errors.name}</p>
                                                </IonText>
                                            )}

                                            <IonButton
                                                expand="block"
                                                type="submit"
                                                className="cat-btn center-btn"
                                            >
                                                Add Category
                                            </IonButton>

                                        </form>

                                    )}
                                </Formik>

                            </IonCardContent>
                        </IonCard>
                    </div>
                </section>








                <section className="table-wrapper">
                    <IonGrid className="custom-table">

                        {/* Header */}
                        <IonRow className="table-header">
                            <IonCol size="2">Sl</IonCol>
                            <IonCol size="6">Name</IonCol>
                            <IonCol size="4">Delete</IonCol>
                        </IonRow>

                        {/* Body */}
                        {categories.map((category: any, index: number) => (
                            <IonRow key={category.id} className="table-row">
                                <IonCol size="2">{index + 1}</IonCol>
                                <IonCol size="6">{category.name}</IonCol>
                                <IonCol size="4">
                                    <IonButton
                                        size="small"
                                        className="delete-btn"
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        <IonIcon icon={trashOutline} slot="icon-only" />

                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        ))}

                    </IonGrid>
                </section>


            </IonContent>
        </IonPage>
    );
};

export default AddCategory;
