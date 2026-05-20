
import axios from 'axios';
import { useState, useEffect } from 'react';

import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonRadioGroup,
    IonRadio,
    IonText,
    IonCard,
    IonCardContent,
    IonToast,
    IonSpinner,
    IonBadge
} from '@ionic/react';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import './Address.css';


interface Address {
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    district: string;
    state: string;
    pin: number;
    mobile: number;
    email: string;
    addressType: string;
    addressId:string;

};

// ================= VALIDATION =================

const SignupSchema = Yup.object().shape({

    name: Yup.string()
        .min(2, 'Too Short!')
        .required('Required'),

    addressLine1: Yup.string()
        .required('Required'),

    addressLine2: Yup.string()
        .required('Required'),

    city: Yup.string()
        .required('Required'),

    district: Yup.string()
        .required('Required'),

    state: Yup.string()
        .required('Required'),

    pin: Yup.string()
        .required('Required'),

    mobile: Yup.string()
        .required('Required'),

    email: Yup.string()
        .email("Invalid email")
        .required("Required"),

    addressType: Yup.string()
        .required('Required'),
});

const AddressSchema = Yup.object().shape({

    addressId: Yup.string()
        .required("Please select address"),

});

const Address = () => {

    const history = useHistory();

    const { user: currentUser } = useSelector((state: any) => state.auth);

    const [addresses, setAddresses] = useState<any[]>([]);

    const [cartItems, setCartItems] = useState<any>(null);

    const [subTotal, setSubTotal] = useState(0);

    const [loading, setLoading] = useState(false);

    const [toastMessage, setToastMessage] = useState("");

    const [showToast, setShowToast] = useState(false);

    // ================= SAVE ADDRESS =================

    const handleAddress = (formData: any) => {

        formData.userId = currentUser.id;

        setLoading(true);

        axios
            .post(`http://localhost:8090/api/addresses`, formData)

            .then((response) => {

                console.log(response.data);

                setToastMessage("Address Added Successfully");

                setShowToast(true);

                setAddresses([...addresses, response.data]);

            })

            .catch((error) => {

                console.log(error);

                setToastMessage("Address Error");

                setShowToast(true);

            })

            .finally(() => {

                setLoading(false);

            });
    };

    // ================= GET ADDRESS =================

    useEffect(() => {

        if (!currentUser) return;

        axios
            .get(`http://localhost:8090/api/addresses/user/${currentUser.id}`)

            .then((response) => {

                console.log(response.data);

                setAddresses(response.data);

            })

            .catch((err) => {
                console.log(err);
            });

    }, [currentUser]);

    // ================= GET CART =================

    useEffect(() => {

        if (!currentUser) return;

        axios
            .get(`http://localhost:8090/api/carts/user/${currentUser.id}`)

            .then((response) => {

                console.log(response.data);

                setCartItems(response.data);

                const subTotalAmount = response.data.items.reduce(

                    (total: number, product: any) => {

                        return (
                            total +
                            (
                                (product.productDetails?.productPrice || 0)
                                * product.quantity
                            )
                        );

                    },

                    0
                );

                setSubTotal(subTotalAmount);

            })

            .catch((err) => {
                console.log(err);
            });

    }, [currentUser]);

    // ================= ORDER =================

    const handleAddress2 = (values: any) => {

        if (!cartItems?.items) return;

        const products = cartItems.items.map((item: any) => ({

            productId: item.productId,

            price: item.productDetails?.productPrice || 0,

            quantity: item.quantity

        }));

        const data = {

            addressId: values.addressId,

            userId: currentUser.id,

            products: products,

            totalAmount: subTotal,

            Status: "processing"

        };

        axios
            .post("http://localhost:8090/api/ssorders", data)

            .then((response) => {

                console.log(response.data);

                axios
                    .delete(`http://localhost:8090/api/carts/user/${currentUser.id}`)

                    .then(() => {

                        setToastMessage("Order Placed Successfully");

                        setShowToast(true);

                        history.push("/Order");

                    });

            })

            .catch((err) => {

                console.log(err);

            });
    };

    return (

        <IonPage>

            {/* ================= HEADER ================= */}

            <IonHeader>

                <IonToolbar color="light">

                    <IonTitle>
                        Address
                    </IonTitle>

                </IonToolbar>

            </IonHeader>

            {/* ================= CONTENT ================= */}

            <IonContent className="ion-padding">

                <IonGrid>

                    {/* ================= ADD ADDRESS ================= */}

                    <IonRow>

                        <IonCol size="12" sizeMd="8" offsetMd="2">

                            <IonCard>

                                <IonCardContent>

                                    <h2 className="ion-text-center">
                                        Add Address
                                    </h2>

                                    <Formik

                                        initialValues={{
                                            name: '',
                                            addressLine1: '',
                                            addressLine2: '',
                                            city: '',
                                            district: '',
                                            state: '',
                                            pin: '',
                                            mobile: '',
                                            email: '',
                                            addressType: ''
                                        }}

                                        validationSchema={SignupSchema}

                                        onSubmit={handleAddress}

                                    >

                                        {({ errors, touched, setFieldValue, values }) => (

                                            <Form>

                                                <IonItem>
                                                    <IonLabel position="stacked">
                                                        Name
                                                    </IonLabel>

                                                    <Field
                                                        as={IonInput}
                                                        name="name"
                                                    />
                                                </IonItem>

                                                <IonText color="danger">
                                                    {
                                                        errors.name &&
                                                        touched.name &&
                                                        errors.name
                                                    }
                                                </IonText>

                                                <IonItem>
                                                    <IonLabel position="stacked">
                                                        Address Line 1
                                                    </IonLabel>

                                                    <Field
                                                        as={IonInput}
                                                        name="addressLine1"
                                                    />
                                                </IonItem>

                                                <IonItem>
                                                    <IonLabel position="stacked">
                                                        Address Line 2
                                                    </IonLabel>

                                                    <Field
                                                        as={IonInput}
                                                        name="addressLine2"
                                                    />
                                                </IonItem>

                                                <IonItem>
                                                    <IonLabel position="stacked">
                                                        City
                                                    </IonLabel>

                                                    <Field
                                                        as={IonInput}
                                                        name="city"
                                                    />
                                                </IonItem>

                                                <IonItem>
                                                    <IonLabel position="stacked">
                                                        District
                                                    </IonLabel>

                                                    <Field
                                                        as={IonInput}
                                                        name="district"
                                                    />
                                                </IonItem>

                                                <IonItem>
                                                    <IonLabel position="stacked">
                                                        State
                                                    </IonLabel>

                                                    <Field
                                                        as={IonInput}
                                                        name="state"
                                                    />
                                                </IonItem>

                                                <IonItem>
                                                    <IonLabel position="stacked">
                                                        Pin Code
                                                    </IonLabel>

                                                    <Field
                                                        as={IonInput}
                                                        name="pin"
                                                        type="number"
                                                    />
                                                </IonItem>

                                                <IonItem>
                                                    <IonLabel position="stacked">
                                                        Mobile
                                                    </IonLabel>

                                                    <Field
                                                        as={IonInput}
                                                        name="mobile"
                                                        type="number"
                                                    />
                                                </IonItem>

                                                <IonItem>
                                                    <IonLabel position="stacked">
                                                        Email
                                                    </IonLabel>

                                                    <Field
                                                        as={IonInput}
                                                        name="email"
                                                        type="email"
                                                    />
                                                </IonItem>

                                                {/* ADDRESS TYPE */}

                                                <div className="radio-section">

                                                    <IonLabel>
                                                        Address Type
                                                    </IonLabel>

                                                    <IonRadioGroup
                                                        value={values.addressType}
                                                        onIonChange={(e) =>
                                                            setFieldValue(
                                                                "addressType",
                                                                e.detail.value
                                                            )
                                                        }
                                                    >

                                                        <IonItem lines="none">

                                                            <IonLabel>
                                                                Home
                                                            </IonLabel>

                                                            <IonRadio
                                                                slot="start"
                                                                value="Home"
                                                            />

                                                        </IonItem>

                                                        <IonItem lines="none">

                                                            <IonLabel>
                                                                Office
                                                            </IonLabel>

                                                            <IonRadio
                                                                slot="start"
                                                                value="Office"
                                                            />

                                                        </IonItem>

                                                    </IonRadioGroup>

                                                </div>

                                                <IonButton
                                                    expand="block"
                                                    type="submit"
                                                    className="ion-margin-top"
                                                >

                                                    {
                                                        loading
                                                            ? <IonSpinner name="crescent" />
                                                            : "Save Address"
                                                    }

                                                </IonButton>

                                            </Form>

                                        )}

                                    </Formik>

                                </IonCardContent>

                            </IonCard>

                        </IonCol>

                    </IonRow>

                    {/* ================= CHOOSE ADDRESS ================= */}

                    <IonRow>

                        <IonCol size="12" sizeMd="8" offsetMd="2">

                            <IonCard>

                                <IonCardContent>

                                    <h2>
                                        Choose Address
                                    </h2>

                                    <Formik

                                        initialValues={{
                                            addressId: ''
                                        }}

                                        validationSchema={AddressSchema}

                                        onSubmit={handleAddress2}

                                    >

                                        {({
                                            values,
                                            setFieldValue
                                        }) => (

                                            <Form>

                                                <IonRadioGroup
                                                    value={values.addressId}
                                                    onIonChange={(e) =>
                                                        setFieldValue(
                                                            "addressId",
                                                            e.detail.value
                                                        )
                                                    }
                                                >

                                                    {

                                                        addresses.map((address, index) => (

                                                            <IonItem
                                                                key={index}
                                                                className="ion-margin-bottom"
                                                            >

                                                                <IonRadio
                                                                    slot="start"
                                                                    value={String(address.id)}
                                                                />

                                                                <IonLabel>

                                                                    <h3>

                                                                        <IonBadge color="primary">

                                                                            {
                                                                                address.addressType
                                                                            }

                                                                        </IonBadge>

                                                                    </h3>

                                                                    <p>

                                                                        {
                                                                            address.addressLine1
                                                                        },

                                                                        {
                                                                            address.addressLine2
                                                                        },

                                                                        {
                                                                            address.district
                                                                        },

                                                                        {
                                                                            address.pin
                                                                        }

                                                                    </p>

                                                                </IonLabel>

                                                            </IonItem>

                                                        ))

                                                    }

                                                </IonRadioGroup>

                                                <IonButton
                                                    expand="block"
                                                    type="submit"
                                                    color="success"
                                                    className="ion-margin-top"
                                                >

                                                    Place Order

                                                </IonButton>

                                            </Form>

                                        )}

                                    </Formik>

                                </IonCardContent>

                            </IonCard>

                        </IonCol>

                    </IonRow>

                </IonGrid>

                {/* ================= TOAST ================= */}

                <IonToast
                    isOpen={showToast}
                    message={toastMessage}
                    duration={2000}
                    onDidDismiss={() => setShowToast(false)}
                />

            </IonContent>

        </IonPage>
    );
};

export default Address;












