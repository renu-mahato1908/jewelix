// import axios from "axios";
// import { useEffect, useState } from "react";
// import {
//   IonPage,
//   IonContent,
//   IonGrid,
//   IonRow,
//   IonCol,
//   IonCard,
//   IonCardContent,
//   IonList,
//   IonItem,
//   IonLabel,
//   IonIcon,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonSpinner
// } from "@ionic/react";

// import {
//   gridOutline,
//   personOutline,
//   addCircleOutline,
//   cubeOutline,
//   listOutline,
//   cartOutline,
//   createOutline
// } from "ionicons/icons";

// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// import {
//   Chart as ChartJS,
//   ArcElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   RadialLinearScale
// } from "chart.js";

// import { Bar } from "react-chartjs-2";

// // import "./Dashboard.css";

// ChartJS.register(
//   CategoryScale,
//   ArcElement,
//   PointElement,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   RadialLinearScale
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top" as const
//     },
//     title: {
//       display: true,
//       text: "Top Selling Products"
//     }
//   },
//   scales: {
//     x: {
//       display: true,
//       ticks: {
//         autoSkip: false
//       }
//     },
//     y: {
//       display: true
//     }
//   }
// };

// const Dashboard: React.FC = () => {

//   const navigate = useNavigate();

//   const { user: currentUser } = useSelector((state: any) => state.auth);

//   const [totalOrders, setTotalOrders] = useState(0);
//   const [reportSummary, setReportSummary] = useState<any>(null);
//   const [chartData, setChartData] = useState<any>(null);
//   const [topProducts, setTopProducts] = useState<any[]>([]);
//   const [dailyReports, setDailyReports] = useState<any>(null);

//   useEffect(() => {

//     if (currentUser && currentUser.roles[0] !== "ROLE_ADMIN") {
//       navigate("/Home");
//     }

//   }, []);

//   // Total Orders
//   useEffect(() => {

//     axios
//       .get("http://localhost:8090/api/ssorders")
//       .then((response) => {

//         setTotalOrders(response.data.length);

//       });

//   }, []);

//   // Summary Report
//   useEffect(() => {

//     axios
//       .get("http://localhost:8090/api/ssorders/reports/summary")
//       .then((response) => {

//         setReportSummary(response.data);

//       });

//   }, []);

//   // Chart Data
//   useEffect(() => {

//     axios
//       .get("http://localhost:8090/api/ssorders/chartdata")
//       .then((response) => {

//         setChartData(response.data);

//       })
//       .catch((error) => {

//         console.log(error);

//       });

//   }, []);

//   // Top Selling Products
//   useEffect(() => {

//     axios
//       .get("http://localhost:8090/api/ssorders/top-selling-products")
//       .then((response) => {

//         setTopProducts(response.data);

//       });

//   }, []);

//   // Daily Report
//   useEffect(() => {

//     axios
//       .get("http://localhost:8090/api/ssorders/reports/daily")
//       .then((response) => {

//         setDailyReports(response.data);

//       });

//   }, []);

//   return (

//     <IonPage>

//       <IonHeader>
//         <IonToolbar color="warning">
//           <IonTitle>Admin Dashboard</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent>

//         <IonGrid>

//           <IonRow>

//             {/* LEFT MENU */}

//             <IonCol size="12" size-md="3">

//               <IonList>

//                 <IonItem routerLink="/Dashboard">
//                   <IonIcon icon={gridOutline} slot="start" />
//                   <IonLabel>Dashboard</IonLabel>
//                 </IonItem>

//                 <IonItem routerLink="/Account">
//                   <IonIcon icon={personOutline} slot="start" />
//                   <IonLabel>Account</IonLabel>
//                 </IonItem>

//                 <IonItem routerLink="/Addproduct">
//                   <IonIcon icon={addCircleOutline} slot="start" />
//                   <IonLabel>Add Product</IonLabel>
//                 </IonItem>

//                 <IonItem routerLink="/Products">
//                   <IonIcon icon={cubeOutline} slot="start" />
//                   <IonLabel>Products</IonLabel>
//                 </IonItem>

//                 <IonItem routerLink="/AddCategory">
//                   <IonIcon icon={listOutline} slot="start" />
//                   <IonLabel>Add Category</IonLabel>
//                 </IonItem>

//                 <IonItem routerLink="/OrdersDetail">
//                   <IonIcon icon={cartOutline} slot="start" />
//                   <IonLabel>Orders</IonLabel>
//                 </IonItem>

//                 <IonItem routerLink="/UpdateProduct">
//                   <IonIcon icon={createOutline} slot="start" />
//                   <IonLabel>Update Product</IonLabel>
//                 </IonItem>

//               </IonList>

//             </IonCol>

//             {/* RIGHT CONTENT */}

//             <IonCol size="12" size-md="9">

//               {/* BOXES */}

//               <IonRow>

//                 <IonCol size="12" size-md="4">

//                   <IonCard className="dashboard-card">
//                     <IonCardContent>

//                       <h6>Total Orders</h6>
//                       <h2>{totalOrders}</h2>

//                     </IonCardContent>
//                   </IonCard>

//                 </IonCol>

//                 <IonCol size="12" size-md="4">

//                   <IonCard className="dashboard-card">
//                     <IonCardContent>

//                       {reportSummary ? (
//                         <>
//                           <h6>Total Sales</h6>
//                           <h2>₹ {reportSummary.totalRevenue}</h2>
//                         </>
//                       ) : (
//                         <IonSpinner />
//                       )}

//                     </IonCardContent>
//                   </IonCard>

//                 </IonCol>

//                 <IonCol size="12" size-md="4">

//                   <IonCard className="dashboard-card">
//                     <IonCardContent>

//                       <h6>Daily Report</h6>

//                       {dailyReports ? (
//                         <>
//                           <p>Date: {dailyReports.date}</p>
//                           <p>Total Orders: {dailyReports.totalOrders}</p>
//                         </>
//                       ) : (
//                         <IonSpinner />
//                       )}

//                     </IonCardContent>
//                   </IonCard>

//                 </IonCol>

//               </IonRow>

//               {/* CHART */}

//               <IonRow>

//                 <IonCol size="12">

//                   <IonCard>

//                     <IonCardContent>

//                       {chartData ? (
//                         <Bar data={chartData} options={options} />
//                       ) : (
//                         <IonSpinner />
//                       )}

//                     </IonCardContent>

//                   </IonCard>

//                 </IonCol>

//               </IonRow>

//               {/* TABLE */}

//               <IonRow>

//                 <IonCol size="12">

//                   <IonCard>

//                     <IonCardContent>

//                       <h4>Top Selling Products</h4>

//                       <div className="table-responsive">

//                         <table className="custom-table">

//                           <thead>
//                             <tr>
//                               <th>Sl No.</th>
//                               <th>Product Name</th>
//                               <th>Total Sold</th>
//                             </tr>
//                           </thead>

//                           <tbody>

//                             {topProducts.map((item, index) => (

//                               <tr key={index}>

//                                 <td>{index + 1}</td>

//                                 <td>
//                                   {item.productDetails?.productName}
//                                 </td>

//                                 <td>{item.totalSold}</td>

//                               </tr>

//                             ))}

//                           </tbody>

//                         </table>

//                       </div>

//                     </IonCardContent>

//                   </IonCard>

//                 </IonCol>

//               </IonRow>

//             </IonCol>

//           </IonRow>

//         </IonGrid>

//       </IonContent>

//     </IonPage>
//   );
// };

// export default Dashboard;


import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';


const Dashboard: React.FC = () => {


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>name</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">name</IonTitle>
          </IonToolbar>
        </IonHeader>

        <h1>DASHBOARD</h1>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
