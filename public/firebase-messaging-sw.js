// Firebase Messaging Service Worker
    importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
    importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');
    
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: 'AIzaSyBGGUqdPQs5kz_L7wJ4jEVokRYQ2K4csJg',
        authDomain: 'storehub-60012.firebaseapp.com',
        projectId: 'storehub-60012',
        storageBucket: 'storehub-60012.appspot.com',
        messagingSenderId: '484386056032',
        appId: '1:484386056032:web:3c6f4555574d25a59ca005',
        measurementId: 'G-X93HDT29LR',
    };

    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
        console.log('Received background message ', payload);
        const notificationTitle = payload.notification?.title || 'Default Title';
        const notificationOptions = {
            body: payload.notification?.body || 'Default Body',
            icon: payload.notification?.icon || '/shopping.png',
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
    });
    