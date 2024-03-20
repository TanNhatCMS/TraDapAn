import {db} from "./firebase-config.js";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    addDoc

} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import {Dapan} from "./dapan.js";


export class Services {
     populateTopicSelect = async () => {
        try {
            const topicSelect = document.getElementById("topic");
            const querySnapshot = await getDocs(collection(db, "topic"));
            querySnapshot.forEach((doc) => {
                const option = document.createElement("option");
                option.value = doc.data().name;
                option.textContent = doc.data().name;
                topicSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Error getting topics: ", error);
        }
    };
    async getDapanList() {
        try {
            return await getDocs(collection(db, "dapan"));
        } catch (error) {
            console.error("Error fetching dapan:", error);
            throw error;
        }
    }
    async getDapanById(topicId) {
        try {
            const docRef = doc(db, "dapan", topicId);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                return docSnapshot.data();
            } else {
                return null;
            }

        } catch (error) {
            console.error("Error fetching dapan:", error);
            throw error;
        }
    }
    async addDapan(data){
        try {
            const docRef = await addDoc(collection(db, "dapan"), {
                id: "",
                question: data.question,
                answer: data.answer,
                topic: data.topic,
                search: data.search
            });
            await this.updateDapan(new Dapan(docRef.id, data.question, data.answer, data.topic, data.search));
            console.log("New dapan added with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding dapan: ", error);
        }
    };

    async updateDapan(data) {
        try {
            const topicRef = doc(db, "dapan", data.id);
            const newData = {
                id: data. id,
                question: data.question,
                answer: data.answer,
                topic: data.topic,
                search: data.search,
            };
            await updateDoc(topicRef, newData);
            console.log("dapan updated successfully");
        } catch (error) {
            console.error("Error updating dapan:", error);
        }
    }
    async deleteDapan(id) {
        try {
            const topicRef = doc(db, "dapan", id);
            await deleteDoc(topicRef);
            console.log("dapan deleted successfully!");
        } catch (error) {
            console.error("Error deleting dapan:", error);
        }
    }
}
