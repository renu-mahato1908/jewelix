import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Home from './components/Home';
import Test from './components/Test';
import Example from './components/Example';
// import Register from './components/Register';
// import Login from './components/Login';
import AddProduct from './components/AddProduct';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AddCategory from './components/AddCategory';
import Gold from './components/Gold';
import Diamond from './components/Diamond';
import Mangalsutra from './components/Mangalsutra';
import Bangles from './components/Bangles';
import Pendant from './components/Pendant';
import Earrings from './components/Earrings';
import Category from './components/Category';
import ViewProduct from './components/ViewProduct';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Address from './components/Address';
import Dashboard from './components/Dashboard';
import Account from './components/Account';
import Order from './components/Order';
import Products from './components/Products';
import OrdersDetail from './components/OrderDetail';
import OrderStatus from './components/OrderStatus';
import Rings from './components/Rings';
import Invoice from './components/Invoice';
import Payment from './components/Payment';
import Wedding from './components/Wedding';


setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/Home" />
            </Route>
            {/* <Route path="/Home" exact={true}>
              <Page />
            </Route> */}

            <Route path="/Home" exact={true}>
              <Home />
            </Route>

            <Route path="/Test" exact={true}>
              <Test />
            </Route>

            <Route path="/Example" exact={true}>
              <Example />
            </Route>


            <Route path="/AddProduct" exact={true}>
              <AddProduct />
            </Route>


            <Route path="/SignIn" exact={true}>
              <SignIn />
            </Route>

            <Route path="/SignUp" exact={true}>
              <SignUp />
            </Route>

            <Route path="/AddCategory" exact={true}>
              <AddCategory />
            </Route>


            <Route path="Category/Gold" exact={true}>
              <Gold />
            </Route>

            <Route path="/Diamond" exact={true}>
              <Diamond />
            </Route>

            <Route path="/Bangles" exact={true}>
              <Bangles />
            </Route>

            <Route path="/Mangalsutra" exact={true}>
              <Mangalsutra />
            </Route>


            <Route path="/Pendant" exact={true}>
              <Pendant />
            </Route>

            <Route path="/Earrings" exact={true}>
              <Earrings />
            </Route>

            <Route path="/Rings" exact={true}>
              <Rings />
            </Route>

             <Route path="/Wedding" exact={true}>
              <Wedding />
            </Route>

            <Route path="/Mangalsutra" exact={true}>
              <Mangalsutra />
            </Route>

            <Route path="/Dashboard" exact={true}>
              <Dashboard />
            </Route>

            <Route path="/Category/:categoryName" exact={true}>
              <Category />
            </Route>


            <Route path="/ViewProduct/:productId" exact={true}>
              <ViewProduct />
            </Route>

            <Route path="/Cart" exact={true}>
              <Cart />
            </Route>


            <Route path="/Wishlist" exact={true}>
              <Wishlist />
            </Route>

            <Route path="/Address" exact={true}>
              <Address />
            </Route>


            <Route path="/Account" exact={true}>
              <Account />
            </Route>

            <Route path="/Order" exact={true}>
              <Order />
            </Route>

            <Route path="/OrdersDetail" exact={true}>
              <OrdersDetail />
            </Route>


            <Route path="/OrderStatus" exact={true}>
              <OrderStatus />
            </Route>


            <Route path="/Products" exact={true}>
              <Products />
            </Route>


             <Route path="/Payment" exact={true}>
              <Payment/>
            </Route>

            <Route
              path="/Invoice/:id"
              component={Invoice}
              exact
            />

          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;









// import {
//   IonApp,
//   IonRouterOutlet,
//   setupIonicReact
// } from '@ionic/react';

// import { IonReactRouter } from '@ionic/react-router';

// import { Redirect, Route } from 'react-router-dom';

// import Menu from './components/Menu';

// /* Ionic CSS */
// import '@ionic/react/css/core.css';
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

// import './theme/variables.css';

// /* Pages */
// import Home from './components/Home';
// import Test from './components/Test';
// import Example from './components/Example';
// import AddProduct from './components/AddProduct';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import AddCategory from './components/AddCategory';
// import Gold from './components/Gold';
// import Diamond from './components/Diamond';
// import Mangalsutra from './components/Mangalsutra';
// import Bangles from './components/Bangles';
// import Pendant from './components/Pendant';
// import Earrings from './components/Earrings';
// import Category from './components/Category';
// import ViewProduct from './components/ViewProduct';
// import Cart from './components/Cart';
// import Wishlist from './components/Wishlist';
// import Address from './components/Address';
// import Dashboard from './components/Dashboard';
// import Account from './components/Account';
// import Order from './components/Order';

// setupIonicReact();

// const App: React.FC = () => {

//   return (

//     <IonApp>

//       <IonReactRouter>

//         {/* MENU */}
//         <Menu />

//         {/* IMPORTANT */}
//         <IonRouterOutlet id="main">

//           <Route exact path="/">
//             <Redirect to="/Home" />
//           </Route>

//           <Route exact path="/Home">
//             <Home />
//           </Route>

//           <Route exact path="/Test">
//             <Test />
//           </Route>

//           <Route exact path="/Example">
//             <Example />
//           </Route>

//           <Route exact path="/AddProduct">
//             <AddProduct />
//           </Route>

//           <Route exact path="/SignIn">
//             <SignIn />
//           </Route>

//           <Route exact path="/SignUp">
//             <SignUp />
//           </Route>

//           <Route exact path="/AddCategory">
//             <AddCategory />
//           </Route>

//           <Route exact path="/Category/Gold">
//             <Gold />
//           </Route>

//           <Route exact path="/Diamond">
//             <Diamond />
//           </Route>

//           <Route exact path="/Bangles">
//             <Bangles />
//           </Route>

//           <Route exact path="/Mangalsutra">
//             <Mangalsutra />
//           </Route>

//           <Route exact path="/Pendant">
//             <Pendant />
//           </Route>

//           <Route exact path="/Earrings">
//             <Earrings />
//           </Route>

//           <Route exact path="/Dashboard">
//             <Dashboard />
//           </Route>

//           <Route exact path="/Category/:categoryName">
//             <Category />
//           </Route>

//           <Route exact path="/ViewProduct/:productId">
//             <ViewProduct />
//           </Route>

//           <Route exact path="/Cart">
//             <Cart />
//           </Route>

//           <Route exact path="/Wishlist">
//             <Wishlist />
//           </Route>

//           <Route exact path="/Address">
//             <Address />
//           </Route>

//           <Route exact path="/Account">
//             <Account />
//           </Route>

//           <Route exact path="/Order">
//             <Order />
//           </Route>

//         </IonRouterOutlet>

//       </IonReactRouter>

//     </IonApp>

//   );
// };

// export default App;
