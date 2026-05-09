

// import React, { useState, useEffect } from "react";
// import {
//   IonPage,
//   IonContent,
//   IonItem,
//   IonLabel,
//   IonInput,
//   IonButton,
//   IonText,
//   IonHeader,
//   IonButtons,
//   IonToolbar
// } from "@ionic/react";

// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { Formik } from "formik";
// import * as Yup from "yup";

// import type { AppDispatch } from "../store";
// import { login } from "../Slices/auth";
// import { clearMessage } from "../Slices/message";

// import "./SignIn.css";

// type LoginValues = {
//   username: string;
//   password: string;
// };

// const LoginSchema = Yup.object().shape({
//   username: Yup.string()
//     .matches(/^[6-9]\d{9}$/, "Enter valid mobile number")
//     .required("Required"),
//   password: Yup.string()
//     .min(8, "Minimum 8 characters")
//     .required("Required"),
// });

// const SignIn: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const history = useHistory();

//   const [loading, setLoading] = useState(false);

//   const { isLoggedIn } = useSelector((state: any) => state.auth);
//   const { message } = useSelector((state: any) => state.message);

//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => {
//         dispatch(clearMessage());
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message, dispatch]);

//   useEffect(() => {
//     dispatch(clearMessage());
//   }, [dispatch]);

//   useEffect(() => {
//     if (isLoggedIn) {
//       history.push("/Home");
//     }
//   }, [isLoggedIn, history]);

//   const handleLogin = (values: LoginValues) => {
//     setLoading(true);

//     dispatch(login(values))
//       .unwrap()
//       .then(() => {
//         setLoading(false);
//         history.push("/Home");
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   };



//   return (
//     <IonPage>

//       <IonHeader>
//         <IonToolbar className="header-toolbar">

//           <div className="logo">
//             <img src="https://zerocreativity0.wordpress.com/wp-content/uploads/2016/05/tanishq-logo.jpg?w=768&h=576" className="logo" />
//           </div>



//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="login-content ion-padding">

//         <div className="login-container">

//           {/* Logo */}
//           <div className="logo-box">
//           </div>

//           <h2 className="title">Welcome Back</h2>
//           <p className="subtitle">Shine with elegance ✨</p>

//           {message && (
//             <IonText color="danger">
//               <p className="msg">{message}</p>
//             </IonText>
//           )}

//           <Formik
//             initialValues={{ username: "", password: "" }}
//             validationSchema={LoginSchema}
//             onSubmit={handleLogin}
//           >
//             {({ values, errors, touched, setFieldValue, handleSubmit }) => (
//               <form onSubmit={handleSubmit}>

//                 <IonItem className="custom-input">
//                   <IonLabel position="stacked">Mobile</IonLabel>
//                   <IonInput
//                     value={values.username}
//                     onIonChange={(e) =>
//                       setFieldValue("username", e.detail.value!)
//                     }
//                   />
//                 </IonItem>

//                 {errors.username && touched.username && (
//                   <IonText color="danger">{errors.username}</IonText>
//                 )}

//                 <IonItem className="custom-input">
//                   <IonLabel position="stacked">Password</IonLabel>
//                   <IonInput
//                     type="password"
//                     value={values.password}
//                     onIonChange={(e) =>
//                       setFieldValue("password", e.detail.value!)
//                     }
//                   />
//                 </IonItem>

//                 {errors.password && touched.password && (
//                   <IonText color="danger">{errors.password}</IonText>
//                 )}

//                 <IonButton
//                   expand="block"
//                   type="submit"
//                   disabled={loading}
//                   className="signin-btn"
//                 >
//                   {loading ? "Logging in..." : "Login"}
//                 </IonButton>

//                 <IonText>
//                   <p className="register-text">
//                     Not registered?{" "}
//                     <span onClick={() => history.push("/SignUp")}>
//                       Register
//                     </span>

//                   </p>

//                   <p className="register-text">
//                     Forgot password
//                   </p>
//                 </IonText>

//               </form>
//             )}
//           </Formik>
//         </div>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default SignIn;






















import React, { useState, useEffect } from "react";
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

  // Clear message after 3 sec
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  // Clear old message on load
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  // Redirect after login
  useEffect(() => {
    if (isLoggedIn) {
      history.push("/Home");
    }
  }, [isLoggedIn, history]);

  // const handleLogin = (values: LoginValues) => {
  //   setLoading(true);

  //   dispatch(login(values))
  //     .unwrap()
  //     .then((res: any) => {
  //       console.log("Login Success :", res);

  //       setLoading(false);

  //       history.push("/Home");
  //     })
  //     .catch((err: any) => {
  //       console.log("Login Error :", err);

  //       setLoading(false);
  //     });
  // };

  const currentUser = useSelector((state: any) => state.auth.user);

  const handleLogin = async (values: any) => {

    try {

      await dispatch(login(values));

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    if (currentUser?.roles?.includes("ROLE_ADMIN")) {

      history.push("/Dashboard");

    } else if (currentUser) {

      history.push("/Home");

    }

  }, [currentUser]);
  return (
    <IonPage>
      {/* HEADER */}
      <IonHeader>
        <IonToolbar className="header-toolbar">
          <div className="logo">
            <img
              src="https://zerocreativity0.wordpress.com/wp-content/uploads/2016/05/tanishq-logo.jpg?w=768&h=576"
              className="logo"
              alt="logo"
            />
          </div>
        </IonToolbar>
      </IonHeader>

      {/* CONTENT */}
      <IonContent className="login-content ion-padding">
        <div className="login-container">
          <h2 className="title">Welcome Back</h2>

          <p className="subtitle">Shine with elegance ✨</p>

          {/* ERROR MESSAGE */}
          {message && (
            <IonText color="danger">
              <p className="msg">{message}</p>
            </IonText>
          )}

          {/* FORMIK */}
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              handleSubmit,
            }) => (
              <form>
                {/* MOBILE */}
                <IonItem className="custom-input">
                  <IonLabel position="stacked">
                    Mobile Number
                  </IonLabel>

                  <IonInput
                    type="tel"
                    value={values.username}
                    onIonChange={(e) =>
                      setFieldValue(
                        "username",
                        e.detail.value!
                      )
                    }
                  />
                </IonItem>

                {errors.username && touched.username && (
                  <IonText color="danger">
                    <p>{errors.username}</p>
                  </IonText>
                )}

                {/* PASSWORD */}
                <IonItem className="custom-input">
                  <IonLabel position="stacked">
                    Password
                  </IonLabel>

                  <IonInput
                    type="password"
                    value={values.password}
                    onIonChange={(e) =>
                      setFieldValue(
                        "password",
                        e.detail.value!
                      )
                    }
                  />
                </IonItem>

                {errors.password && touched.password && (
                  <IonText color="danger">
                    <p>{errors.password}</p>
                  </IonText>
                )}

                {/* BUTTON */}
                <IonButton
                  expand="block"
                  className="signin-btn"
                  disabled={loading}
                  onClick={() => handleSubmit()}
                >
                  {loading
                    ? "Logging in..."
                    : "Login"}
                </IonButton>

                {/* REGISTER */}
                <IonText>
                  <p className="register-text">
                    Not registered?{" "}
                    <span
                      onClick={() =>
                        history.push("/SignUp")
                      }
                    >
                      Register
                    </span>
                  </p>

                  <p
                    className="register-text"
                    onClick={() =>
                      history.push("/ForgotPassword")
                    }
                  >
                    Forgot Password
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