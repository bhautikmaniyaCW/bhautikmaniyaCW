import React, {useState, useEffect} from 'react'
import {requestForToken, onMessageListener} from './firebase';
import {ToastContainer, toast} from 'react-toastify';

const Notifications = () => {
    const [notification, setNotification] = useState({title: '', body: ''});
    const notify = () => toast(<ToastDisplay/>);

    function ToastDisplay() {
        return (
            <div>
                <p><b>{notification?.title}</b></p>
                <p>{notification?.body}</p>
            </div>
        );
    };
   

    useEffect(() => {
        if (notification?.title) {
            notify()
        }
    }, [notification])


    requestForToken();
    
    onMessageListener()
        .then((payload) => {
            console.log("payload", payload)
          new Notifications(payload?.notification?.title)
            setNotification({title: payload?.notification?.title, body: payload?.notification?.body});
        })
        .catch((err) => console.log('failed: ', err));
}

export default Notifications

// export const  randomNotification = () => {
//     const randomItem = Math.floor(Math.random() * games.length);
//     const notifTitle = games[randomItem].name;
//     const notifBody = `Created by ${games[randomItem].author}.`;
//     const notifImg = `data/img/${games[randomItem].slug}.jpg`;
//     const options = {
//       body: notifBody,
//       icon: notifImg,
//     };
//     new Notification(notifTitle, options);
//     setTimeout(randomNotification, 30000);
//   }
