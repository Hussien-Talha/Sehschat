import { firestore } from "../firebase/firebase";

const GroupService = {
  createGroup: async (groupName, groupIcon, members) => {
    try {
      const groupRef = await firestore.collection("groups").add({
        name: groupName,
        icon: groupIcon,
        members: members,
      });
      return groupRef.id;
    } catch (error) {
      console.error("Error creating group:", error);
      throw new Error("Failed to create group");
    }
  },

  getGroup: async (groupId) => {
    try {
      const groupDoc = await firestore.collection("groups").doc(groupId).get();
      if (groupDoc.exists) {
        return { id: groupDoc.id, ...groupDoc.data() };
      } else {
        throw new Error("Group not found");
      }
    } catch (error) {
      console.error("Error getting group:", error);
      throw new Error("Failed to get group");
    }
  },

  updateGroup: async (groupId, groupName, groupIcon, members) => {
    try {
      await firestore.collection("groups").doc(groupId).update({
        name: groupName,
        icon: groupIcon,
        members: members,
      });
    } catch (error) {
      console.error("Error updating group:", error);
      throw new Error("Failed to update group");
    }
  },

  deleteGroup: async (groupId) => {
    try {
      await firestore.collection("groups").doc(groupId).delete();
    } catch (error) {
      console.error("Error deleting group:", error);
      throw new Error("Failed to delete group");
    }
  },

  addMemberToGroup: async (groupId, memberId) => {
    try {
      await firestore.collection("groups").doc(groupId).update({
        members: firestore.FieldValue.arrayUnion(memberId),
      });
    } catch (error) {
      console.error("Error adding member to group:", error);
      throw new Error("Failed to add member to group");
    }
  },

  removeMemberFromGroup: async (groupId, memberId) => {
    try {
      await firestore.collection("groups").doc(groupId).update({
        members: firestore.FieldValue.arrayRemove(memberId),
      });
    } catch (error) {
      console.error("Error removing member from group:", error);
      throw new Error("Failed to remove member from group");
    }
  },
};

export default GroupService;
