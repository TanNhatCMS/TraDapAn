// Định nghĩa hàm lấy phần tử theo ID
const getEle = (id) => document.getElementById(id);

// Định nghĩa hàm reset form theo ID
const resetForm = (formId) => getEle(formId).reset();

// Import các module và class từ các file khác
import { CustomModal, Helper } from './utils.js';
import { Services } from './api.js';
import { Validator } from './validator.js';
import { Data } from './data.js';

// Khởi tạo các đối tượng cần sử dụng
const helper = new Helper();
const service = new Services();
const validator = new Validator();

// Định danh các phần tử DOM
const searchInput = document.getElementById("search-input");
//const dataSourceSelect = document.getElementById("data-source-select");
const body = document.body;
let currentDataSource = "tradapan";
let allDataBase;

async function getDataBaseStore(dataSource) {
  const storedDatabase = localStorage.getItem(dataSource);
  if (storedDatabase) {
    return JSON.parse(storedDatabase);
  } else {
    try {
      const resBook = await fetch(`https://658bef26859b3491d3f51938.mockapi.io/${dataSource}`);
      let database = await resBook.json();
      localStorage.setItem(dataSource, JSON.stringify(database));
      return database;
    } catch (error) {
      console.error(`Error parsing ${dataSource} list from local storage:`, error);
      return [];
    }
  }
}


function displayDataBase(DataBaseList) {
  const tbody = document.querySelector("#table-book tbody");
  tbody.innerHTML = '';
  DataBaseList.forEach((DataBase, index) => {
    const newRow = createTableRow(DataBase.question, DataBase.answer);
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
  allDataBase.forEach((database) => {
    if (database.search.toLowerCase().includes(searchValue)) {
      filter.push(database);
    }
  });
  if (searchValue) {
    displayDataBase(filter);
  } else {
    displayDataBase(allDataBase);
  }
};

// Sự kiện tìm kiếm
searchInput.addEventListener('keyup', SearchDataBase);


async function initializePage() {
  allDataBase = await getDataBaseStore(currentDataSource);
  displayDataBase(allDataBase);
}

document.addEventListener("DOMContentLoaded", initializePage);

// Hàm render danh sách
const renderList = async () => {
  try {
    const dataList = await service.getDatas();
    let content = '';
    dataList.forEach((ele) => {

      content += ` <tr>
        <td>${ele.id}</td>
        <td><strong>${ele.question}</strong></td>
        <td>${ele.answer}</td>
        <td>${ele.search}</td>
        <td class = ''style="text-align: center"><button class="btn my-3 me-1" data-bs-toggle="modal"
        data-bs-target="#exampleModal" onclick ="btnEdit('${ele.id}')"  id='btnEdit'>
        Sửa<i class="fa fa-pencil-square ms-2"></i>
        </button><button class="btn " onclick ="btnDelete('${ele.id}')" id='btnDelete'>
        Xoá <i class="fa fa-trash ms-2"></i>
        </button></td>
        </tr>`;
    });
    // Hiển thị danh sách lên giao diện
    getEle('tableData').innerHTML = content;
  } catch (error) {
    console.error(error);
  }
};

// Sự kiện khi trang web được tải
window.onload = async () => {
  try {
    await renderList();
  } catch (error) {
    console.error(error);
  }
};

// Sự kiện khi nhấn nút "Add Phone"
getEle('addDataForm').onclick = () => {
  resetForm('formData');
  helper.clearTextBoxes();
  getEle('btnUpdate').style.display = 'none';
  getEle('btnAddData').style.display = 'inline-block';
};

// Sự kiện khi nhấn nút "Add Phone" trong modal
getEle('btnAddData').onclick = async () => {
  try {
    const dataList = await service.getDatas();
    if (!validator.isValid(dataList)) return;

    const inputs = helper.getInputValues();
    const data = new Data('', ...inputs);
    await service.addData(data);
    await renderList();
    CustomModal.alertSuccess('Thêm câu hỏi thành công');
  } catch (error) {
    console.error(error);
  }
};

// Sự kiện khi nhấn nút "Delete" trong modal
window.btnDelete = async (id) => {
  try {
    const res = await CustomModal.alertDelete(`Câu hỏi này sẽ bị xóa, bạn không thể hoàn tác hành động này`);
    if (res.isConfirmed) {
      await service.deleteData(id);
      await renderList();
      CustomModal.alertSuccess('Xóa câu hỏi thành công');
    }
  } catch (error) {
    console.error(error);
  }
};

// Sự kiện khi nhấn nút "Edit" trong modal
window.btnEdit = async (id) => {
  helper.clearTextBoxes();
  try {
    getEle('btnUpdate').style.display = 'inline-block';
    getEle('btnAddData').style.display = 'none';

    const data = await service.getDataById(id);
    delete data.id;
    const arrObjValue = Object.values(data);
    helper.fillInputs(arrObjValue);

    // Sự kiện khi nhấn nút "Update" trong modal
    getEle('btnUpdate').onclick = async () => {
      const phoneList = await service.getDatas();
      if (!validator.isValid(phoneList, true)) return;

      const inputs = helper.getInputValues();
      const data = new Data(id, ...inputs);
      await service.updateData(data);
      await renderList();
      CustomModal.alertSuccess('Cập nhật câu hỏi thành công');
      $('#exampleModal').modal('hide');
    };
  } catch (error) {
    console.error(error);
  }
};
