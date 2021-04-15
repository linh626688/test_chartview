import * as Swal from 'sweetalert2';

export function showError(message) {
  Toast.fire({
    icon: 'error',
    title: message,
  });
}

export function showSuccess(message) {
  Toast.fire({
    icon: 'success',
    title: message,
  });
}

export function showCustomError(message){
  Swal.fire({
    icon: 'error',
    titleText: message,
    customClass: {
      content: 'content-class',
    },
  })
}

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});
