import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonText
} from '@ionic/react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./Register.css";

// Validation
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log('Login Data:', values);
    }
  });

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">

        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="6">

              <IonCard className="register-card">
                <IonCardContent>

                  <h2 className="form-title">Welcome Back</h2>

                  <form onSubmit={formik.handleSubmit}>

                    {/* Email */}
                    <IonItem className="custom-input">
                      <IonInput
                        label="Email"
                        labelPlacement="floating"
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onIonChange={(e) =>
                          formik.setFieldValue('email', e.detail.value)
                        }
                        onIonBlur={formik.handleBlur}
                      />
                    </IonItem>
                    {formik.touched.email && formik.errors.email && (
                      <IonText color="danger">
                        <small>{formik.errors.email}</small>
                      </IonText>
                    )}

                    {/* Password */}
                    <IonItem className="custom-input">
                      <IonInput
                        label="Password"
                        labelPlacement="floating"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onIonChange={(e) =>
                          formik.setFieldValue('password', e.detail.value)
                        }
                        onIonBlur={formik.handleBlur}
                      />
                    </IonItem>
                    {formik.touched.password && formik.errors.password && (
                      <IonText color="danger">
                        <small>{formik.errors.password}</small>
                      </IonText>
                    )}

                    {/* Center Button */}
                    <IonRow className="ion-justify-content-center">
                      <IonButton
                        type="submit"
                        className="custom-btn"
                      >
                        Login
                      </IonButton>
                    </IonRow>

                  </form>

                </IonCardContent>
              </IonCard>

            </IonCol>
          </IonRow>
        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Login;



















