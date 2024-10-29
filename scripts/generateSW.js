// Import necessary modules
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure dotenv to load the environment variables
dotenv.config();

// Simulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createServiceWorker = () => {
    // Generate Firebase Messaging Service Worker content
    const content = `// Firebase Messaging Service Worker
    importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
    importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');
    
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: '${process.env.VITE_API_KEY}',
        authDomain: '${process.env.VITE_AUTH_DOMAIN}',
        projectId: '${process.env.VITE_PROJECT_ID}',
        storageBucket: '${process.env.VITE_STORAGE_BUCKET}',
        messagingSenderId: '${process.env.VITE_MESSAGING_SENDER_ID}',
        appId: '${process.env.VITE_APP_ID}',
        measurementId: '${process.env.VITE_MEASUREMENT_ID}',
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
    `;

    // Path for the generated firebase-messaging-sw.js
    const filePath = path.join(__dirname, '../public/firebase-messaging-sw.js');

    // Write the generated content to the service worker file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Service Worker created successfully at:', filePath);
};

createServiceWorker();
