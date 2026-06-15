import {
    IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, RefresherCustomEvent, IonRefresher,
    IonRefresherContent, IonItem, IonLabel, IonSpinner, IonToast
} from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';


interface Jsr {
    products: Product[],
    total: number,
    skip: number,
    limit: number;
}

interface Review {
    rating: number,
    comment: string,
    date: string,
    reviewerName: string,
    reviewerEmail: string,
}

interface Product {
    title: string,
    id: number,
    rating: number,
    category: string,
    price: number,
    stock: number,
    description: string,
    discountPercentage: number,
    tags: string[],

    brand?: string,
    sku: string,
    weight: number,
    dimensions: { width: number, height: number, depth: number },
    warrantyInformation: string,
    shippingInformation: string,
    availabilityStatus: string,
    returnPolicy: string,
    minimumOrderQuantity: number,
    images: string[],
    thumbnail: string,
    meta: { createdAt: string, updatedAt: string, barcode: string, qrCode: string, },
    reviews: Review[]
}
const Test: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        axios.get<Jsr>("http://dummyjson.com/products")
            .then((res) => {
                console.log(res.data);
                setProducts(res.data.products);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);






    function handleRefresh(event: RefresherCustomEvent) {
        setTimeout(() => {
            // Any calls to load data go here





            axios.get<Jsr>("http://dummyjson.com/products")
                .then((res) => {
                    console.log(res.data);
                    setProducts(res.data.products);
                    setIsOpen(true);
                })
                .catch((err) => {
                    console.log(err);
                });
            event.detail.complete();
        }, 2000);




    }








    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Test</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Test</IonTitle>
                    </IonToolbar>




                </IonHeader>

                {/* <IonContent className="ion-padding"> */}
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                {/* </IonContent> */}







                <h1>Test</h1>



                <div>

                    <ul>

                        {
                            products ?
                                products.map((product, index) => {
                                    return (
                                        <li key={index}>{product.price},&nbsp;&nbsp;&nbsp;&nbsp;
                                            {product.brand},
                                            <img src={'product.images'} alt='img' width={"200px"}></img>


                                        </li>

                                    )

                                })
                                : "product not available"
                        }


                    </ul>



                </div>


                <IonToast
                    isOpen={isOpen}
                    message="This toast will close in 5 seconds"
                    onDidDismiss={() => setIsOpen(false)}
                    duration={5000}
                ></IonToast>













            </IonContent>


        </IonPage>
    );
};

export default Test;
