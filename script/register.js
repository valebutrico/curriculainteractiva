/*=============== REGISTER ===============*/
document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.querySelector('.register__form');
  const emailInput = document.getElementById('register-email');
  const passwordInput = document.getElementById('register-pass');

  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const existingUser = localStorage.getItem('userCredentials');

    if (existingUser !== null) {
      Swal.fire({
        title: '¡Cuidado!',
        text: 'Ya existe un usuario en este navegador. Si presiona Aceptar, el usuario anterior será eliminado para crear uno nuevo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Rechazar',
      }).then((result) => {
        if (result.isConfirmed) {
          guardarYRedirigir();
        }
      });
    } else {
      guardarYRedirigir();
    }
  });

  function guardarYRedirigir() {
    localStorage.clear();
  
    const enteredCredentials = {
      email: emailInput.value,
      password: passwordInput.value,
    };
  
    localStorage.setItem('userCredentials', JSON.stringify(enteredCredentials));
    window.location.href = 'login.html';
  }
});
  

/*=============== MOSTRAR CONTRASEÑA ===============*/
const mostrarContrasenia = (registerPass, registerEye) => {
  const input = document.getElementById(registerPass);
  const iconEye = document.getElementById(registerEye);

  iconEye.addEventListener('click', () => {
    if (input.type === 'password') {
      input.type = 'text';
      iconEye.classList.add('ri-eye-line');
      iconEye.classList.remove('ri-eye-off-line');
    } else {
      input.type = 'password';
      iconEye.classList.remove('ri-eye-line');
      iconEye.classList.add('ri-eye-off-line');
    }
  });
}

mostrarContrasenia('register-pass', 'register-eye');