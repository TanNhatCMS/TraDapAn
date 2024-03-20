const getEle = (id) => document.getElementById(id);

export class Helper {
    constructor() {
        this.inpArr = [
            'name',
        ];
        this.tbArr = [
            'tbname',
        ];
    }

    getInputValues() {
        return this.inpArr.map((id) => getEle(id).value);
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
