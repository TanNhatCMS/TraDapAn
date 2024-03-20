import {db} from "./firebase-config.js";
import {
    collection,
    getDocs,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

export class Services {
    async getDapanList() {
        try {
            return await getDocs(collection(db, "dapan"));
        } catch (error) {
            console.error("Error fetching dapan:", error);
            throw error;
        }
    }
}
