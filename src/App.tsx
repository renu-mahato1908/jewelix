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
// import Dashboard from './components/Dashboard';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/folder/Inbox" />
            </Route>
            <Route path="/folder/:name" exact={true}>
              <Page />
            </Route>

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


            <Route path="/Gold" exact={true}>
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

             {/* <Route path="/Dashboard" exact={true}>
              <Dashboard />
            </Route> */}

          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
