import {ref, child, get, push, update,remove} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import {db} from "./firebase-config.js";

const dbRef = ref(db);
const childRef = child(dbRef, `tradapan`);

export class Services {
    async getDataList() {
        try {
            // Sử dụng get() để lấy dữ liệu từ Firebase Realtime Database
            const snapshot = await get(childRef);
            if (snapshot.exists()) {
                // Nếu dữ liệu tồn tại, trả về nó dưới dạng một mảng
                return Object.values(snapshot.val());
            } else {
                // Nếu không có dữ liệu, trả về một mảng trống
                return [];
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
    async getDataById(id) {
        try {
            // Tạo đường dẫn đến nút dữ liệu dựa trên ID
            const nodePath = 'tradapan/' + id;

            // Sử dụng get() để lấy dữ liệu từ Firebase Realtime Database tại đường dẫn đã xác định
            const snapshot = await get(child(ref(db), nodePath));
            if (snapshot.exists()) {
                // Nếu dữ liệu tồn tại, trả về nó
                return snapshot.val();
            } else {
                // Nếu không có dữ liệu, trả về null hoặc một giá trị khác để xác định rằng không tìm thấy dữ liệu
                return null;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
}
