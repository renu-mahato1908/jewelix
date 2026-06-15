


import Header from "../components/Header";

import axios from "axios";
import { useEffect, useState } from "react";

import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,

  IonSpinner,

} from "@ionic/react";

import {
  gridOutline,
  personOutline,
  addCircleOutline,
  cubeOutline,
  listOutline,
  cartOutline,
  createOutline
} from "ionicons/icons";

import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Dashboard.css";


import {
  Chart as ChartJS,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

// import "./Dashboard.css";

interface Reportsummary {
  totalRevenue: number;
}

interface DailyReport {
  date: string;
  totalOrders: number;
}

interface topProduct {
  productDetails: {
    productName: string;
  };
  totalSold: number;
}

interface ChartData {
  labels: string[];
  datasets: any[];
}

interface user {
  totalUsers: number;
}

ChartJS.register(
  CategoryScale,
  ArcElement,
  PointElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const
    },
    title: {
      display: true,
      text: "Top Selling Products"
    }
  },
  scales: {
    x: {
      display: true,
      ticks: {
        autoSkip: false
      }
    },
    y: {
      display: true
    }
  }
};

export const categoryOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const
    },
    title: {
      display: true,
      text: "Category Wise Sales"
    }
  }
};

const Dashboard: React.FC = () => {

  const history = useHistory();

  const { user: currentUser } = useSelector(
    (state: any) => state.auth
  );

  const [totalOrders, setTotalOrders] =
    useState<number>(0);

  const [reportSummary, setReportSummary] =
    useState<Reportsummary>();

  const [chartData, setChartData] =
    useState<ChartData>({
      labels: [],
      datasets: []
    });

  const [categoryChartData, setCategoryChartData] =
    useState<ChartData>({
      labels: [],
      datasets: []
    });

  const [topProducts, setTopProducts] =
    useState<topProduct[]>([]);

  const [dailyReports, setDailyReports] =
    useState<DailyReport>();

  const [users, setUsers] =
    useState<user>({
      totalUsers: 0
    });

  // ADMIN CHECK

  useEffect(() => {

    if (
      currentUser &&
      currentUser.roles[0] !== "ROLE_ADMIN"
    ) {

      history.push("/Home");

    }

  }, [currentUser, history]);

  // TOTAL ORDERS

  useEffect(() => {

    axios
      .get("https://renuka-saa9.vercel.app/api/ssorders")
      .then((response) => {

        setTotalOrders(response.data.length);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  // TOTAL USERS

  useEffect(() => {

    axios
      .get("https://renuka-saa9.vercel.app/api/usercount")
      .then((response) => {

        setUsers(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  // SUMMARY REPORT

  useEffect(() => {

    axios
      .get(
        "https://renuka-saa9.vercel.app/api/ssorders/reports/summary"
      )
      .then((response) => {

        setReportSummary(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  // BAR CHART DATA

  useEffect(() => {

    axios
      .get(
        "https://renuka-saa9.vercel.app/api/ssorders/chartdata"
      )
      .then((response) => {

        setChartData(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  // CATEGORY PIE CHART DATA

  useEffect(() => {

    axios
      .get("https://renuka-saa9.vercel.app/api/ssorders/chartcategorydata")
      .then((response) => {

        // report data
        const report = response.data.report;

        // first month data
        const monthData = Object.values(report)[0] as any[];

        // labels
        const labels = monthData.map(
          (item) => item.category
        );

        // totals
        const data = monthData.map(
          (item) => item.total
        );

        // set chart data
        setCategoryChartData({

          labels: labels,

          datasets: [
            {
              label: "Category Sales",

              data: data,

              backgroundColor: [
                "#f4b400",
                "#db4437",
                "#4285f4",
                "#0f9d58",
                "#ff6d01"
              ]
            }
          ]
        });

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);






  // TOP SELLING PRODUCTS

  useEffect(() => {

    axios
      .get(
        "https://renuka-saa9.vercel.app/api/ssorders/top-selling-products"
      )
      .then((response) => {

        setTopProducts(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  // DAILY REPORT

  useEffect(() => {

    axios
      .get(
        "https://renuka-saa9.vercel.app/api/ssorders/reports/daily"
      )
      .then((response) => {

        setDailyReports(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  const handleLogout = () => {

    localStorage.clear();

  };

  return (

    <IonPage>

      <Header handleLogout={handleLogout} />



      <IonContent className="dashboard-container">

        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-center">
              <h2 className="dashboard-title">
                Admin Dashboard
              </h2>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid>

          <IonRow>

            {/* LEFT MENU */}

            <IonCol size="12" size-md="3">

              <IonList>

                <IonItem routerLink="/Dashboard">
                  <IonIcon
                    icon={gridOutline}
                    slot="start"
                  />
                  <IonLabel>
                    Dashboard
                  </IonLabel>
                </IonItem>

                <IonItem routerLink="/Account">
                  <IonIcon
                    icon={personOutline}
                    slot="start"
                  />
                  <IonLabel>
                    Account
                  </IonLabel>
                </IonItem>

                <IonItem routerLink="/Addproduct">
                  <IonIcon
                    icon={addCircleOutline}
                    slot="start"
                  />
                  <IonLabel>
                    Add Product
                  </IonLabel>
                </IonItem>

                <IonItem routerLink="/Products">
                  <IonIcon
                    icon={cubeOutline}
                    slot="start"
                  />
                  <IonLabel>
                    Products
                  </IonLabel>
                </IonItem>

                <IonItem routerLink="/AddCategory">
                  <IonIcon
                    icon={listOutline}
                    slot="start"
                  />
                  <IonLabel>
                    Add Category
                  </IonLabel>
                </IonItem>

                <IonItem  routerLink="/OrderDetail">
                  <IonIcon
                    icon={cartOutline}
                    slot="start"
                  />

                  <IonLabel>
                    Orders
                  </IonLabel>
                </IonItem>

                <IonItem routerLink="/EditProduct/:id">
                  <IonIcon
                    icon={createOutline}
                    slot="start"
                  />
                  <IonLabel>
                    Update Product
                  </IonLabel>
                </IonItem>

              </IonList>

            </IonCol>

            <IonCol size="12" size-md="9">
              <IonGrid>
                <IonRow>

                  <IonCol size="12" size-md="3">

                    <IonCard className="dashboard-card">

                      <IonCardContent>

                        <h6>Total Orders</h6>

                        <h2>
                          {totalOrders}
                        </h2>

                      </IonCardContent>

                    </IonCard>

                  </IonCol>

                  <IonCol size="12" size-md="3">

                    <IonCard className="dashboard-card">

                      <IonCardContent>

                        <h6>Total Users</h6>

                        <h2>
                          {users.totalUsers}
                        </h2>

                      </IonCardContent>

                    </IonCard>

                  </IonCol>

                  <IonCol size="12" size-md="3">

                    <IonCard className="dashboard-card">

                      <IonCardContent>

                        {reportSummary ? (
                          <>

                            <h6>Total Sales</h6>

                            <h2>
                              ₹ {reportSummary.totalRevenue}
                            </h2>

                          </>
                        ) : (
                          <IonSpinner />
                        )}

                      </IonCardContent>

                    </IonCard>

                  </IonCol>

                  <IonCol size="12" size-md="3">

                    <IonCard className="dashboard-card">

                      <IonCardContent>

                        <h6>Daily Report</h6>

                        {dailyReports ? (
                          <>

                            <p>
                              Date:
                              {" "}
                              {dailyReports.date}
                            </p>

                            <p>
                              Orders:
                              {" "}
                              {dailyReports.totalOrders}
                            </p>

                          </>
                        ) : (
                          <IonSpinner />
                        )}

                      </IonCardContent>

                    </IonCard>

                  </IonCol>

                </IonRow>
              </IonGrid>

              <IonRow>
                <IonCol size="12" size-md="8">

                  <IonCard>

                    <IonCardContent>

                      {chartData?.labels?.length > 0 ? (

                        <Bar
                          data={chartData}
                          options={options}
                        />

                      ) : (

                        <IonSpinner />

                      )}

                    </IonCardContent>

                  </IonCard>

                </IonCol>



                <IonCol size="12" size-md="4">

                  <IonCard>

                    <IonCardContent>

                      {categoryChartData?.labels?.length > 0 ? (

                        <Pie
                          data={categoryChartData}
                          options={categoryOptions}
                        />

                      ) : (

                        <IonSpinner />

                      )}

                    </IonCardContent>

                  </IonCard>

                </IonCol>
              </IonRow>
            </IonCol> {/* Right Side Main Content IonCol Closed */}


            {/* RIGHT CONTENT */}

            <IonCol size="12" size-md="9">





              {/* CHARTS */}

              <IonRow>

                {/* BAR CHART  */}






              </IonRow>



              // {/* TOP PRODUCTS TABLE */}

              <IonRow>

                <IonCol size="12">

                  <IonCard>

                    <IonCardContent>

                      <h4 className="top-product-title">
                        Top Selling Products
                      </h4>

                      <div className="table-responsive">

                        <table className="custom-table">

                          <thead>

                            <tr>

                              <th>Sl No.</th>

                              <th>Product Name</th>

                              <th>Total Sold</th>

                            </tr>

                          </thead>

                          <tbody>

                            {topProducts.map(
                              (item, index) => (

                                <tr key={index}>

                                  <td>
                                    {index + 1}
                                  </td>

                                  <td>
                                    {
                                      item.productDetails
                                        ?.productName
                                    }
                                  </td>

                                  <td>
                                    {item.totalSold}
                                  </td>

                                </tr>

                              )
                            )}

                          </tbody>

                        </table>

                      </div>

                    </IonCardContent>

                  </IonCard>

                </IonCol>

              </IonRow>

            </IonCol>

          </IonRow>

        </IonGrid>

      </IonContent>

    </IonPage>
  );
};

export default Dashboard;




