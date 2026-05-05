

import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
} from "@ionic/react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import type { AppDispatch } from "../store";
import { login } from "../Slices/auth";
import { clearMessage } from "../Slices/message";

import "./SignIn.css";

type LoginValues = {
  username: string;
  password: string;
};

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter valid mobile number")
    .required("Required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .required("Required"),
});

const SignIn: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const { message } = useSelector((state: any) => state.message);

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

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/home");
    }
  }, [isLoggedIn, history]);

  const handleLogin = (values: LoginValues) => {
    setLoading(true);

    dispatch(login(values))
      .unwrap()
      .then(() => {
        setLoading(false);
        history.push("/home");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <IonPage>
      <IonContent className="login-content ion-padding">

        <div className="login-container">

          {/* Logo */}
          <div className="logo-box">
          </div>

          <h2 className="title">Welcome Back</h2>
          <p className="subtitle">Shine with elegance ✨</p>

          {message && (
            <IonText color="danger">
              <p className="msg">{message}</p>
            </IonText>
          )}

          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ values, errors, touched, setFieldValue, handleSubmit }) => (
              <form onSubmit={handleSubmit}>

                <IonItem className="custom-input">
                  <IonLabel position="stacked">Mobile</IonLabel>
                  <IonInput
                    value={values.username}
                    onIonChange={(e) =>
                      setFieldValue("username", e.detail.value!)
                    }
                  />
                </IonItem>

                {errors.username && touched.username && (
                  <IonText color="danger">{errors.username}</IonText>
                )}

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

                {errors.password && touched.password && (
                  <IonText color="danger">{errors.password}</IonText>
                )}

                <IonButton
                  expand="block"
                  type="submit"
                  disabled={loading}
                  className="signin-btn"
                >
                  {loading ? "Logging in..." : "Login"}
                </IonButton>

                <IonText>
                  <p className="register-text">
                    Not registered?{" "}
                    <span onClick={() => history.push("/SignUp")}>
                      Register
                    </span>
                  </p>
                </IonText>

              </form>
            )}
          </Formik>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;