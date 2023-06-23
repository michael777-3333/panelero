import Swal from 'sweetalert2';

/**
 * Muestra las alertas.
 *
 * @param {string} msg - Texto de la alerta.
 * @param {string} icon - Tipo de alerta: 'error', 'success', 'warning', 'info', 'question'.
 */

function showAlert(msg, icon="warning", title="Oops...") {
    if (icon=='success') { title='Hecho!!' };

    // const { value: accept } = await Swal.fire({
    Swal.fire({
        // color: '#716add',
        // icon: 'error', //'error', 'success', 'warning', 'info', 'question'
        icon: icon,
        // title: 'Error!',
        title,
        text: msg,
        // showCloseButton: true,
        // showCancelButton: true,
        showConfirmButton: true,
        // focusConfirm: false,
        confirmButtonText: 'Ok',
        // confirmButtonText: '<i class="bi bi-arrow-return-left"></i>',
        // confirmButtonAriaLabel: "Regresar!",
        showClass: {
            // popup: 'animate__animated animate__fadeInDown'
            popup: "animated bounceIn",
        },
        hideClass: {
            // popup: 'animate__animated animate__fadeOutUp'
            popup: "animated bounceOut",
        },
        // timer: 5500
    })

    // if (accept) {
    //     const modal = document.getElementById("staticBackdrop");
    //     const modalObjeto = bootstrap.Modal.getInstance(modal);
    //     modalObjeto.hide();
    //     return true
    //   }
}

export { showAlert };