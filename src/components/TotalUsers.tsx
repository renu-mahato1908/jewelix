import {
  IonBadge,
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
  __v: number;
  status: boolean;
}

const TotalUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const history = useHistory();
  const { user: currentUser } = useSelector((state: any) => state.auth);

  console.log(currentUser);

  useEffect(() => {
    if (currentUser?.roles?.[0] === "ROLE_ADMIN") {
      // history.push("/Products");
    }
  }, [currentUser, history]);
  useEffect(() => {
    if (!currentUser?.id) return;

    axios
      .get("https://renuka-saa9.vercel.app/api/auth/alluser", {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, [currentUser]);

  const filteredUsers = users.filter((user) => user._id !== currentUser?.id);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedUserId) return;

    axios
      .post(
        `https://renuka-saa9.vercel.app/api/auth/changeStatus/${selectedUserId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        },
      )
      .then((res) => {
        const updatedUser = res.data.data;

        setUsers((prev) =>
          prev.map((user) =>
            user._id === updatedUser._id
              ? { ...user, status: updatedUser.status }
              : user,
          ),
        );
      })
      .catch((err) => console.log(err))
      .finally(() => setSelectedUserId(null));
  }, [selectedUserId, currentUser]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Manage Users</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRow>
          <IonBreadcrumbs>
            <IonBreadcrumb href="/Dashboard">Dashboard</IonBreadcrumb>
            <IonBreadcrumb>Manage Users</IonBreadcrumb>
          </IonBreadcrumbs>
        </IonRow>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonCard>
                <IonCardContent>
                  <IonCardTitle>
                    Total Users: {filteredUsers.length}
                  </IonCardTitle>

                  <IonList>
                    {filteredUsers.map((user) => (
                      <IonItem key={user._id}>
                        <IonLabel>
                          <h2>
                            {user.firstName} {user.lastName}
                          </h2>
                          <p>{user.email}</p> <p>{user.username}</p>
                        </IonLabel>
                        <IonBadge color={user.status ? "success" : "danger"}>
                          {user.status ? "Active" : "Inactive"}
                        </IonBadge>
                        <IonButton
                          color={user.status ? "danger" : "success"}
                          onClick={() => setSelectedUserId(user._id)}
                        >
                          {user.status ? "Deactivate" : "Activate"}
                        </IonButton>
                      </IonItem>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default TotalUsers;