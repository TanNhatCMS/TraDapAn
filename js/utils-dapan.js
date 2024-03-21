const getEle = (id) => document.getElementById(id);

export class Helper {
    constructor() {
        this.inpArr = [
            'question',
            'answer',
            'topic',
            'search'
        ];
        this.tbArr = [
            'tbquestion',
            'tbanswer',
            'tbsearch',
        ];
    }
    getInputValues() {
        const inputObject = {}; // Khởi tạo đối tượng để lưu trữ giá trị
        this.inpArr.forEach(id => {
            if (id === 'topic') { // Nếu là phần tử select
                const element = document.getElementById(id);
                inputObject[id] = element ? element.value : ''; // Gán giá trị đã chọn từ select cho thuộc tính tương ứng
            } else { // Nếu là phần tử nhập liệu khác
                const element = document.getElementById(id);
                inputObject[id] = element ? element.value : ''; // Gán giá trị của phần tử cho thuộc tính tương ứng nếu tồn tại, ngược lại gán chuỗi rỗng
            }
        });
        return inputObject; // Trả về đối tượng chứa giá trị của các phần tử nhập liệu
    }
    fillInputs(arr) {
        this.inpArr.forEach((id, index) => {
            getEle(id).value = arr[id];
        });
    }

    clearTextBoxes() {
        this.tbArr.forEach((id) => {
            getEle(id).innerHTML = '&#8205;';
        });
    }
}

export class CustomModal {
    static alertSuccess(message) {
        return Swal.fire({
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500,
        });
    }

    static alertDelete(message) {
        return Swal.fire({
            title: 'Bạc có chắc chắn',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Huỷ',
        });
    }
}
