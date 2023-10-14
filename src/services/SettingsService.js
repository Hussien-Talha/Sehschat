import { firestore } from "../firebase/firestore";

const SettingsService = {
  getUserSettings: async (userId) => {
    try {
      const settingsRef = firestore.collection("settings").doc(userId);
      const settingsDoc = await settingsRef.get();

      if (settingsDoc.exists) {
        return settingsDoc.data();
      } else {
        throw new Error("User settings not found");
      }
    } catch (error) {
      throw new Error(`Failed to get user settings: ${error.message}`);
    }
  },

  updateUserSettings: async (userId, updatedSettings) => {
    try {
      const settingsRef = firestore.collection("settings").doc(userId);
      await settingsRef.set(updatedSettings, { merge: true });
    } catch (error) {
      throw new Error(`Failed to update user settings: ${error.message}`);
    }
  },

  deleteUserSettings: async (userId) => {
    try {
      const settingsRef = firestore.collection("settings").doc(userId);
      await settingsRef.delete();
    } catch (error) {
      throw new Error(`Failed to delete user settings: ${error.message}`);
    }
  },
};

export default SettingsService;
