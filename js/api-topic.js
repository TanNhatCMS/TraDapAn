import {
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    addDoc

} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import {db} from "./firebase-config.js";
import {Topic} from "./topic.js";


export class Services {
    async getTopicList() {
        try {
            return await getDocs(collection(db, "topic"));
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
    async getTopicById(topicId) {
        try {
            const docRef = doc(db, "topic", topicId);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                return docSnapshot.data();
            } else {
                return null;
            }

        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
    addTopic = async (topicData) => {
        try {
            const docRef = await addDoc(collection(db, "topic"), {
                id: "",
                name: topicData.name
            });
            await this.updateTopic(new Topic(docRef.id, topicData.name));
            console.log("New topic added with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding topic: ", error);
        }
    };

    async updateTopic(data) {
        try {
            const topicRef = doc(db, "topic", data.id);
            const newData = {
                id: data.id,
                name: data.name
            };
            await updateDoc(topicRef, newData);
            console.log("Data updated successfully");
        } catch (error) {
            console.error("Error updating data:", error);
        }
    }
    async deleteTopic(id) {
        try {
            const topicRef = doc(db, "topic", id);
            await deleteDoc(topicRef);
            console.log("Topic deleted successfully!");
        } catch (error) {
            console.error("Error deleting topic:", error);
        }
    }
}
