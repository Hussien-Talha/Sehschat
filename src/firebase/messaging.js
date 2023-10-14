import firebase from './firebase';

const messaging = firebase.messaging();

const Messaging = {
  requestPermission: async () => {
    try {
      await messaging.requestPermission();
      const token = await messaging.getToken();
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  onMessage: (callback) => {
    messaging.onMessage(callback);
  },
};

export default Messaging;
