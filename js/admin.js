// Định nghĩa hàm lấy phần tử theo ID
const getEle = (id) => document.getElementById(id);

// Định nghĩa hàm reset form theo ID
const resetForm = (formId) => getEle(formId).reset();

// Import các module và class từ các file khác
import {CustomModal, Helper} from './utils.js';
import {Services} from './api-admin.js';
import {Validator} from './validator.js';
import {Data} from './data.js';

// Khởi tạo các đối tượng cần sử dụng
const helper = new Helper();
const service = new Services();
const validator = new Validator();
function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
  str = str.replace(/đ/g,"d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g," ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
  return str;
}
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
    $('#exampleModal').modal('hide');
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
function performSearch() {
  const questionText = document.getElementById('question').value.toLowerCase();
  const answerText = document.getElementById('answer').value.toLowerCase();
  document.getElementById('search').value = questionText + ' ' + answerText + ' ' + removeVietnameseTones(questionText) + ' ' + removeVietnameseTones(answerText);
}

// Event listener for search button
document.getElementById('btnSearchKey').addEventListener('click', performSearch);