import {Services} from './api.js';
// Định danh các phần tử DOM
const searchInput = document.getElementById("search-input");
let allDataBase;
const service = new Services();
function renderList(DataBaseList) {
    const tbody = document.querySelector("#table-book tbody");
    tbody.innerHTML = '';
    DataBaseList.forEach((DataBase, index) => {
        const data = DataBase.data();
        const newRow = createTableRow(data.question, data.answer);
        tbody.appendChild(newRow);
    });
}
function createTableRow(question, answer) {
    const newRow = document.createElement('tr');
    newRow.classList.add('database-item');
    newRow.innerHTML = `
        <td>${question}</td>
        <td>${answer}</td>
    `;
    return newRow;
}

// Tìm kiếm
const SearchDataBase = (event) => {
    const filter = [];
    const searchValue = event.target.value.toLowerCase();
    if (searchValue) {
        allDataBase.forEach((database) => {
            if (database.data().search.toLowerCase().includes(searchValue)) {
                filter.push(database);
            }
        });
        renderList(filter);
    } else {
        renderList(allDataBase);
    }
};
async function initializePage() {
    allDataBase = await service.getDapanList();
    renderList(allDataBase);
}
// Sự kiện tìm kiếm
searchInput.addEventListener('keyup', SearchDataBase);

// Sự kiện khi trang web được tải
window.onload = async () => {
    try {
        await initializePage();
    } catch (error) {
        console.error(error);
    }
};
