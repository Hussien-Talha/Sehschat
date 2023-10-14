import firebase from '../firebase/firebase';

const messaging = firebase.messaging();

export const requestNotificationPermission = async () => {
  try {
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('Notification permission granted. Token:', token);
    return token;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return null;
  }
};

export const receiveNotification = (callback) => {
  messaging.onMessage((payload) => {
    console.log('Received notification:', payload);
    callback(payload);
  });
};

export const sendNotification = async (token, title, body) => {
  try {
    await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${process.env.REACT_APP_FIREBASE_SERVER_KEY}`,
      },
      body: JSON.stringify({
        to: token,
        notification: {
          title,
          body,
        },
      }),
    });
    console.log('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
