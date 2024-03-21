import {db} from "./firebase-config.js";
import {
     query,
    collection,
    getDocs,
    getFirestore,  addDoc, updateDoc, doc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
const updateDocumentsWithIndex = async () => {
    const documentsRef = collection(db, "dapan"); // Change to your collection name

    try {
        const querySnapshot = await getDocs(documentsRef);

        querySnapshot.forEach((doc) => {
            const searchData = doc.data().search; // Assuming 'search' is the field containing "câu 53:" like data
            const index =  parseInt(searchData.match(/câu (\d+):/)[1]);  // Extracting the number part and converting to integer
            const docRef = doc.ref;
            // Update document with index
            updateDoc(docRef, { index: index });
        });

        console.log("Documents updated with index successfully!");
    } catch (error) {
        console.error("Error updating documents with index:", error);
    }
};


// Call the function to update documents with index
//updateDocumentsWithIndex().then(r => console.log("Done!"));
const addTimestampsToDocuments = async () => {
    const documentsRef = collection(db, "dapan"); // Change to your collection name

    try {
        const querySnapshot = await getDocs(documentsRef);

        querySnapshot.forEach((doc) => {
            const docRef = doc.ref;
            const data = doc.data();

            // Check if createdAt field exists, if not, add it with server timestamp
            if (!data.createdAt) {
                updateDoc(docRef, { createdAt: serverTimestamp() });
            }

            // Always update updatedAt with server timestamp
            updateDoc(docRef, { updatedAt: serverTimestamp() });
        });

        console.log("Timestamps added to documents successfully!");
    } catch (error) {
        console.error("Error adding timestamps to documents:", error);
    }
};

// Gọi hàm để thêm cột thời gian tạo và cập nhật vào tài liệu
//addTimestampsToDocuments().then(r => console.log("Done!"));

const removeIdFromDocuments = async () => {
    try {
        const documentsRef = collection(db, "dapan"); // Thay your_collection_name bằng tên của collection bạn muốn xóa cột

        const querySnapshot = await getDocs(documentsRef);

        for (const doc of querySnapshot) {
            const docRef = doc.ref;
            const data = doc.data();
            delete data.id; // Xóa cột id từ dữ liệu tài liệu
            await updateDoc(docRef, data); // Cập nhật tài liệu mà không có cột id
        }

        console.log("Column 'id' removed from documents successfully!");
    } catch (error) {
        console.error("Error removing column 'id' from documents:", error);
    }
}
removeIdFromDocuments().then(r => console.log("Done!"));