import firebase from './firebase';

const storage = firebase.storage();

const Storage = {
  uploadFile: async (file, path) => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(path);
      const snapshot = await fileRef.put(file);
      const downloadURL = await snapshot.ref.getDownloadURL();
      return downloadURL;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteFile: async (path) => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(path);
      await fileRef.delete();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default Storage;
