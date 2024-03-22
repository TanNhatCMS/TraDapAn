import {db} from "./firebase-config.js";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";


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
            // Return the filtered data
            return await getDocs(query(collection(db, "dapan"), orderBy("index")));
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
        let index = 0;
        try {
            const num = data.question.match(/câu (\d+):/i);
            if(num){
                index =  parseInt(num[1]);
            }
            if(isNaN(index)){
                index = 0;
            }
        }catch (e) {

        }
        try {

            const docRef = await addDoc(collection(db, "dapan"), {
                index: index,
                question: data.question,
                answer: data.answer,
                topic: data.topic,
                search: data.search,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            console.log("New dapan added with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding dapan: ", error);
        }
    };

    async updateDapan(id, data) {
        try {
            const topicRef = doc(db, "dapan", id);
            const Data = {
                question: data.question,
                answer: data.answer,
                topic: data.topic,
                search: data.search,
                updatedAt: serverTimestamp() // Add updatedAt field with server timestamp
            };
            await updateDoc(topicRef, Data);
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
