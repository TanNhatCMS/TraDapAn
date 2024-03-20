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
        return this.inpArr.map(id => {
            if (id === 'topic') { // Nếu là phần tử select
                const element = document.getElementById(id);
                return element ? element.value : ''; // Trả về giá trị đã chọn từ select
            } else { // Nếu là phần tử nhập liệu khác
                const element = document.getElementById(id);
                return element ? element.value : ''; // Trả về giá trị của phần tử nếu tồn tại, ngược lại trả về chuỗi rỗng
            }
        });
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
