import {db} from "./firebase-config.js";
import {
    collection,
    getDocs,
    query,
    orderBy
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
}
