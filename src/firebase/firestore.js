import firebase from './firebase';

const firestore = firebase.firestore();

// Function to create a new user document in the "users" collection
export const createUserDocument = async (user) => {
  try {
    const userRef = firestore.collection('users').doc(user.uid);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      await userRef.set({
        uid: user.uid,
        email: user.email,
        name: '',
        photo: '',
        status: '',
        bio: '',
        contacts: [],
        groups: [],
      });
    }
  } catch (error) {
    console.error('Error creating user document:', error);
  }
};

// Function to get the user document from the "users" collection
export const getUserDocument = async (uid) => {
  try {
    const userRef = firestore.collection('users').doc(uid);
    const snapshot = await userRef.get();

    if (snapshot.exists) {
      return snapshot.data();
    } else {
      console.error('User document does not exist');
    }
  } catch (error) {
    console.error('Error getting user document:', error);
  }
};

// Function to update the user document in the "users" collection
export const updateUserDocument = async (uid, data) => {
  try {
    const userRef = firestore.collection('users').doc(uid);
    await userRef.update(data);
  } catch (error) {
    console.error('Error updating user document:', error);
  }
};

// Function to create a new group document in the "groups" collection
export const createGroupDocument = async (group) => {
  try {
    const groupRef = firestore.collection('groups').doc(group.id);
    const snapshot = await groupRef.get();

    if (!snapshot.exists) {
      await groupRef.set({
        id: group.id,
        name: group.name,
        icon: group.icon,
        members: group.members,
        messages: [],
      });
    }
  } catch (error) {
    console.error('Error creating group document:', error);
  }
};

// Function to get the group document from the "groups" collection
export const getGroupDocument = async (groupId) => {
  try {
    const groupRef = firestore.collection('groups').doc(groupId);
    const snapshot = await groupRef.get();

    if (snapshot.exists) {
      return snapshot.data();
    } else {
      console.error('Group document does not exist');
    }
  } catch (error) {
    console.error('Error getting group document:', error);
  }
};

// Function to update the group document in the "groups" collection
export const updateGroupDocument = async (groupId, data) => {
  try {
    const groupRef = firestore.collection('groups').doc(groupId);
    await groupRef.update(data);
  } catch (error) {
    console.error('Error updating group document:', error);
  }
};

export default firestore;
