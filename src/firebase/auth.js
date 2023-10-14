import firebase from './firebase';

const auth = firebase.auth();

const Auth = {
  signUp: async (email, password) => {
    try {
      const response = await auth.createUserWithEmailAndPassword(email, password);
      return response.user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  signIn: async (email, password) => {
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      return response.user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  signInWithGoogle: async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const response = await auth.signInWithPopup(provider);
      return response.user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  signOut: async () => {
    try {
      await auth.signOut();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getCurrentUser: () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  },
};

export default Auth;
