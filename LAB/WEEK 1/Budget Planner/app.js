const alertController = document.querySelector('ion-alert-controller');
const toastController = document.querySelector('ion-toast-controller');
let 
    name,
    amount
;

function clearOutcomeForm() {
    const form = document.getElementById('outcome');
    form.reset();
}

function processOutcome(e) {
    e.preventDefault();

    if (name == null) {
        alertController.create({
            header: 'Terjadi Kesalahan',
            message: 'Mohon masukan <b>Nama Pengeluaran</b>',
            buttons: ['Tutup']
        }).then(alert => alert.present());
    }
    if (amount == null) {
        alertController.create({
            header: 'Terjadi Kesalahan',
            message: 'Mohon masukan <b>Jumlah Pengeluaran</b>',
            buttons: ['Tutup']
        }).then(alert => alert.present());
    }

    toastController.create({
        header: 'Info Pengeluaran',
        message: `${name}: ${amount}`,
        position: 'bottom',
        showCloseButton: true
    }).then(toast => toast.present());
}

function inputOutcomeName(e) {
    name = e.target.value;
    console.log(name);
}

function inputOutcomeAmount(e) {
    amount = e.target.value;
    console.log(amount);
}