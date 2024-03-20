// Định nghĩa hàm lấy phần tử theo ID
const getEle = (id) => document.getElementById(id);

// Định nghĩa hàm reset form theo ID
const resetForm = (formId) => getEle(formId).reset();

// Import các module và class từ các file khác
import {CustomModal, Helper} from './utils-dapan.js';
import {Services} from './api-dapan.js';
import {Validator} from './validator-dapan.js';
import {Dapan} from './dapan.js';

// Khởi tạo các đối tượng cần sử dụng
const helper = new Helper();
const service = new Services();
const validator = new Validator();
// Hàm render danh sách
const renderDapanList = async () => {
  try {
    const dataList = await service.getDapanList();
    if (!dataList) {
      console.error("Data list is empty or undefined");
      return;
    }
    let content = '';
    let item = 0;
    dataList.forEach((doc) => {
        const ele = doc.data();
        item++;
        content += ` <tr>
        <td>${item}</td>
        <td>${ele.topic}</td>
        <td><strong>${ele.question}</strong></td>
        <td>${ele.answer}</td>
        <td>${ele.search}</td>
        <td class="" style="text-align: center"><button class="btn my-3 me-1" data-bs-toggle="modal"
        data-bs-target="#exampleModal" onclick ="btnEdit('${ele.id}')"  id="btnEdit">
        Sửa<i class="fa fa-pencil-square ms-2"></i>
        </button><button class="btn " onclick ="btnDelete('${ele.id}')" id="btnDelete">
        Xoá <i class="fa fa-trash ms-2"></i>
        </button></td>
        </tr>`;
      });
      getEle('tableData').innerHTML = content;
  } catch (error) {
    console.error(error);
  }
};

// Sự kiện khi trang web được tải
window.onload = async () => {
  try {
    await service.populateTopicSelect();
    await renderDapanList();
  } catch (error) {
    console.error(error);
  }
};

getEle('addDataForm').onclick = () => {
  resetForm('formData');
  helper.clearTextBoxes();
  getEle('btnUpdate').style.display = 'none';
  getEle('btnAddData').style.display = 'inline-block';
};

getEle('btnAddData').onclick = async () => {
  try {
    const dataList = await service.getDapanList();
    if (!validator.isValid(dataList)) return;

    const inputs = helper.getInputValues();
    const data = new Dapan( "", ...inputs);
    await service.addDapan(data);
    await renderDapanList();
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
      await service.deleteDapan(id);
      await renderDapanList();
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

    const data = await service.getDapanById(id);
    helper.fillInputs(data);

    // Sự kiện khi nhấn nút "Update" trong modal
    getEle('btnUpdate').onclick = async () => {
      const dataList = await service.getDapanList();
      if (!validator.isValid(dataList, true)) return;

      const inputs = helper.getInputValues();
      const data = new Dapan(id, ...inputs);
      await service.updateDapan(data);
      await renderDapanList();
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
  document.getElementById('search').value = questionText + ' ' + answerText + ' ' + validator.removeVietnameseTones(questionText) + ' ' + validator.removeVietnameseTones(answerText);
}

// Event listener for search button
document.getElementById('btnSearchKey').addEventListener('click', performSearch);
const services = new Services();
// services.getDapanList().then((data) => {
//   console.log(data);
//   data.forEach((doc) => {
//
//     console.log(`answer => ${doc.data().answer}`);
//   });
// });