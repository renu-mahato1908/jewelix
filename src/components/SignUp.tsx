
import React, { useState, useEffect } from "react";
import "./Signup.css";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";

import { Formik } from "formik";
import * as Yup from "yup";

import { register } from "../Slices/auth";
import { clearMessage } from "../Slices/message";
import { useDispatch, useSelector } from "react-redux";

import "./Signup.css";
import { Link } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().min(2).max(50).required("Required"),
  lastName: Yup.string().min(2).max(50).required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8).max(50).required("Required"),
  username: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter valid 10 digit mobile")
    .required("Mobile required"),
});

const SignUp: React.FC = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state: any) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return (
    <IonPage>

      {/* HEADER */}
      <IonHeader>
        <IonToolbar className="header-toolbar">

          <div className="logo">
            <img
              src="/image.png"
              className="logo"
              alt="logo"
            />
          </div>

        </IonToolbar>
      </IonHeader>

      {/* <IonHeader>

     
        <IonToolbar className="header-toolbar">
          <IonTitle className="header-title">

            <div className="logo">
              <img src="" className="logo"/>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader> */}



      <IonContent className="signup-content ion-padding">

        <div className="signup-container">
          <h2 className="title">Create Your Account</h2>
          <p className="subtitle">Elegance begins here ✨</p>

          {message && (
            <IonText color={successful ? "success" : "danger"}>
              <p className="msg">{message}</p>
            </IonText>
          )}

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              username: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { resetForm }) => {
              setSuccessful(false);

              const { firstName, lastName, username, email, password } = values;

              dispatch(
                register({
                  firstName,
                  lastName,
                  username,
                  email,
                  password,
                }) as any
              )
                .unwrap()
                .then(() => {
                  setSuccessful(true);
                  resetForm();
                })
                .catch(() => {
                  setSuccessful(false);
                });
            }}
          >
            {({
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>

                {/* First Name */}
                <IonItem className="custom-input">
                  <IonLabel position="stacked">First Name</IonLabel>
                  <IonInput
                    value={values.firstName}
                    onIonChange={(e) =>
                      setFieldValue("firstName", e.detail.value!)
                    }
                  />
                </IonItem>
                {touched.firstName && errors.firstName && (
                  <IonText color="danger">{errors.firstName}</IonText>
                )}

                {/* Last Name */}
                <IonItem className="custom-input">
                  <IonLabel position="stacked">Last Name</IonLabel>
                  <IonInput
                    value={values.lastName}
                    onIonChange={(e) =>
                      setFieldValue("lastName", e.detail.value!)
                    }
                  />
                </IonItem>
                {touched.lastName && errors.lastName && (
                  <IonText color="danger">{errors.lastName}</IonText>
                )}

                {/* Email */}
                <IonItem className="custom-input">
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput
                    type="email"
                    value={values.email}
                    onIonChange={(e) =>
                      setFieldValue("email", e.detail.value!)
                    }
                  />
                </IonItem>
                {touched.email && errors.email && (
                  <IonText color="danger">{errors.email}</IonText>
                )}

                {/* Password */}
                <IonItem className="custom-input">
                  <IonLabel position="stacked">Password</IonLabel>
                  <IonInput
                    type="password"
                    value={values.password}
                    onIonChange={(e) =>
                      setFieldValue("password", e.detail.value!)
                    }
                  />
                </IonItem>
                {touched.password && errors.password && (
                  <IonText color="danger">{errors.password}</IonText>
                )}

                {/* Mobile */}
                <IonItem className="custom-input">
                  <IonLabel position="stacked">Mobile</IonLabel>
                  <IonInput
                    type="tel"
                    value={values.username}
                    onIonChange={(e) =>
                      setFieldValue("username", e.detail.value!)
                    }
                  />
                </IonItem>
                {touched.username && errors.username && (
                  <IonText color="danger">{errors.username}</IonText>
                )}

                <IonButton
                  expand="block"
                  type="submit"
                  className="signin-btn"
                >
                  Register
                </IonButton>

                <p>If already register?
                  <Link to="/SignIn"> SignIn</Link>
                 
                </p>

              </form>
            )}
          </Formik>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;