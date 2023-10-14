import firebase from '../firebase/firebase';

const db = firebase.firestore();

const ContactService = {
  getContacts: async (userId) => {
    try {
      const contactsRef = db.collection('contacts').doc(userId);
      const contactsSnapshot = await contactsRef.get();
      if (contactsSnapshot.exists) {
        const contactsData = contactsSnapshot.data();
        return contactsData.contacts;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error getting contacts:', error);
      throw error;
    }
  },

  addContact: async (userId, contactId) => {
    try {
      const contactsRef = db.collection('contacts').doc(userId);
      await contactsRef.update({
        contacts: firebase.firestore.FieldValue.arrayUnion(contactId)
      });
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  },

  blockContact: async (userId, contactId) => {
    try {
      const contactsRef = db.collection('contacts').doc(userId);
      await contactsRef.update({
        blockedContacts: firebase.firestore.FieldValue.arrayUnion(contactId)
      });
    } catch (error) {
      console.error('Error blocking contact:', error);
      throw error;
    }
  },

  deleteContact: async (userId, contactId) => {
    try {
      const contactsRef = db.collection('contacts').doc(userId);
      await contactsRef.update({
        contacts: firebase.firestore.FieldValue.arrayRemove(contactId)
      });
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
};

export default ContactService;
