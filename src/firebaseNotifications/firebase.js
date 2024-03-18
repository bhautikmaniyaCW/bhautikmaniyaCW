// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyDUzu_3VOWhjiwFWV4tf1i-Q_lIfk6Y6Q8",
    authDomain: "pwa-pushnotification-b6683.firebaseapp.com",
    projectId: "pwa-pushnotification-b6683",
    storageBucket: "pwa-pushnotification-b6683.appspot.com",
    messagingSenderId: "906398513177",
    appId: "1:906398513177:web:c281d093e6dcd06c601288",
    measurementId: "G-XG87XJ2D7G"
  };


initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
    // The method getToken(): Promise<string> allows FCM to use the VAPID key credential
    // when sending message requests to different push services
    return getToken(messaging, { vapidKey: `BNYBSns4rOrN1rDem8RpyczlMDs7zcwrh6r0-DjQORQScbepH4zqMiYYphI--N7DUgXcJtYmYZLLusEsLBRZ4Hk` }) //to authorize send requests to supported web push services
        .then((currentToken) => {
            if (currentToken) {
                // console.log('current token for client: ', currentToken);

                if(localStorage.getItem('fcmToken') && currentToken !==localStorage.getItem('fcmToken')){
                    localStorage.setItem('fcmToken', currentToken);

                }

                else if(!localStorage.getItem('fcmToken')){
                    localStorage.setItem('fcmToken', currentToken);

                }


            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });


