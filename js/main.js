import {Services} from './api.js';
import {Validator} from './validator-dapan.js';

// Khởi tạo các đối tượng cần sử dụng
const validator = new Validator();
// Định danh các phần tử DOM
const searchInput = document.getElementById("search-input");
let allDataBase;
const service = new Services();
function renderList(DataBaseList, filter = 'all') {
    const tbody = document.querySelector("#table-book tbody");
    tbody.innerHTML = '';
    let index = 0;
    DataBaseList.forEach((DataBase) => {
        index++;
        const data = DataBase.data();
        if (filter === 'all' || data.topic === filter) {
            const newRow = createTableRow(index, data.question, data.answer);
            tbody.appendChild(newRow);
        }
    });
}
function createTableRow(index, question, answer) {
    const newRow = document.createElement('tr');
    newRow.classList.add('database-item');
    newRow.innerHTML = `
        <td>${index}). ${validator.removeQuestionMark(question)}</td>
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
const getEle = (id) => document.getElementById(id);

getEle('topic').onchange = async () => {
    const data= await service.getDapanList();
    const selectValue = getEle('topic').value;
    renderList(data, selectValue);
};

async function initializePage() {
    await service.populateTopicSelect();
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
