// Lấy phần tử theo ID
const getEle = (id) => document.getElementById(id);

// Lớp Validator chứa các phương thức kiểm tra dữ liệu nhập vào
export class Validator {
    // Biểu thức chính quy kiểm tra số nguyên dương
    numRegex = /^[0-9]+$/;

    // Hiển thị thông báo lỗi hoặc rỗng trên giao diện
    showMessage = (idTB, message = '', isVisible = true) => {
        const element = getEle(idTB);
        element.innerHTML = isVisible ? message : '&#8205;';
        element.style.display = isVisible ? 'block' : 'none';
    };

    // Kiểm tra trường nhập liệu có rỗng không
    isEmpty(id, idTB) {
        const text = getEle(id).value.trim();
        const isEmpty = text === '';
        this.showMessage(idTB, isEmpty ? `(*)Trường này không thể để trống` : '', isEmpty);
        return !isEmpty;
    }


    // Kiểm tra sự tồn tại của dữ liệu nhập vào trong danh sách
    isNotExist(dataList, isUpdate = false) {
        if (isUpdate) return true;
        const enteredName = getEle('name').value;
        let isUnique = false;
        dataList.forEach(data => {
            if (data.data().name === enteredName) {
                isUnique = true;
            }
        });
        if (isUnique) {
            this.showMessage('tbname', '(*)Chủ đề này đã tồn tại', true);
            return false;
        }
        return true;
    }

    // Kiểm tra tính hợp lệ của toàn bộ dữ liệu nhập vào
    isValid(dataList, isUpdate) {
        const validations = [
            this.isEmpty('name', 'tbname'),
            this.isNotExist(dataList, isUpdate)
        ];
        return validations.every(validation => validation);
    }
}
