// Định nghĩa hàm lấy phần tử theo ID
const getEle = (id) => document.getElementById(id);

// Định nghĩa hàm reset form theo ID
const resetForm = (formId) => getEle(formId).reset();

// Import các module và class từ các file khác
import {CustomModal, Helper} from './utils-topic.js';
import {Services} from './api-topic.js';
import {Validator} from './validator-topic.js';
import {Topic} from './topic.js';

// Khởi tạo các đối tượng cần sử dụng
const helper = new Helper();
const service = new Services();
const validator = new Validator();
// Hàm render danh sách
const renderTopicList = async () => {
  try {
    const dataList = await service.getTopicList();
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
        <td><strong>${ele.name}</strong></td>
        <td class = "" style="text-align: center"><button class="btn my-3 me-1" data-bs-toggle="modal"
        data-bs-target="#exampleModal" onclick ="btnEdit('${ele.id}')"  id="btnEdit">
        Sửa<i class="fa fa-pencil-square ms-2"></i>
        </button><button class="btn " onclick ="btnDelete('${ele.id}')" id="btnDelete">
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
    await renderTopicList();
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
    const dataList = await service.getTopicList();
    if (!validator.isValid(dataList)) return;
    const inputs = helper.getInputValues();
    const data = new Topic( "", ...inputs);
    await service.addTopic(data);
    await renderTopicList();
    CustomModal.alertSuccess('Thêm chủ đề thành công');
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
      await service.deleteTopic(id);
      await renderTopicList();
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

    const data = await service.getTopicById(id);
    helper.fillInputs(data);

    // Sự kiện khi nhấn nút "Update" trong modal
    getEle('btnUpdate').onclick = async () => {
      const dataList = await service.getTopicList();
      if (!validator.isValid(dataList, true)) return;
      const inputs = helper.getInputValues();
      const data = new Topic(id, ...inputs);
      await service.updateTopic(data);
      await renderTopicList();
      CustomModal.alertSuccess('Cập nhật câu hỏi thành công');
      $('#exampleModal').modal('hide');
    };
  } catch (error) {
    console.error(error);
  }
};


// Event listener for search button
//document.getElementById('btnSearchKey').addEventListener('click', performSearch);
//const services = new Services();
// services.getDapanList().then((data) => {
//   console.log(data);
//   data.forEach((doc) => {
//
//     console.log(`answer => ${doc.data().answer}`);
//   });
// });