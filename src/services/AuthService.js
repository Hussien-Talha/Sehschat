import firebase from '../firebase/firebase';

const AuthService = {
  signUp: async (email, password) => {
    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      return response.user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  signIn: async (email, password) => {
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      return response.user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  signInWithGoogle: async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const response = await firebase.auth().signInWithPopup(provider);
      return response.user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  signOut: async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getCurrentUser: () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  },
};

export default AuthService;
