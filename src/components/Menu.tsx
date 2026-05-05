import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, image, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import { AiFillHome } from "react-icons/ai";
import { GiGoldBar, GiDiamondRing, GiNecklaceDisplay } from "react-icons/gi";
import { FaGem } from "react-icons/fa";
import { BsCircle } from "react-icons/bs";

// import {
//   diamondOutline,
//   diamondSharp,
//   ellipseOutline,
//   ellipseSharp,
//   sparklesOutline,
//   sparklesSharp,
//   radioButtonOnOutline,
//   radioButtonOnSharp
// } from 'ionicons/icons';


interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

// const appPages: AppPage[] = [



//   {
//     title: 'Home',
//     url: '/Home',
//     iosIcon: home,
//     mdIcon: home
//   }
//   ,
//   {
//     title: 'Gold',
//     url: '/Gold',
//     iosIcon: Gold,
//     mdIcon: Gold
//   },
//   {
//     title: 'Diamond',
//     url: '/Diamond',
//     iosIcon: heartOutline,
//     mdIcon: heartSharp
//   },
//   {
//     title: 'Pendant',
//     url: '/Pendant',
//     iosIcon: archiveOutline,
//     mdIcon: archiveSharp
//   },
//   {
//     title: 'Earrings',
//     url: '/Earrings',
//     iosIcon: trashOutline,
//     mdIcon: trashSharp
//   },
//   {
//     title: 'Bangles',
//     url: '/Bangles',
//     iosIcon: warningOutline,
//     mdIcon: warningSharp
//   }
// ];



const appPages = [
  {
    title: 'Home',
    url: '/Home',
    icon: AiFillHome
  },
  {
    title: 'Gold',
    url: '/Gold',
    icon: GiGoldBar
  },
  {
    title: 'Diamond',
    url: '/Diamond',
    icon: GiDiamondRing
  },
  {
    title: 'Pendant',
    url: '/Pendant',
    icon: GiNecklaceDisplay
  },
  {
    title: 'Earrings',
    url: '/Earrings',
    icon: FaGem
  },
  {
    title: 'Bangles',
    url: '/Bangles',
    icon: BsCircle
  }
];





const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>@jewellery.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              // <IonMenuToggle key={index} autoHide={false}>
              //   <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
              //     <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
              //     <IonLabel>{appPage.title}</IonLabel>
              //   </IonItem>
              // </IonMenuToggle>

              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={location.pathname === appPage.url ? 'selected' : ''}
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >

                  {/* React Icon */}
                  <appPage.icon size={22} style={{ marginRight: '10px' }} />

                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        {/* <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList> */}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
