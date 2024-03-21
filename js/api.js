import {db} from "./firebase-config.js";
import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

export class Services {
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
