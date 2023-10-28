/*=============== REGISTER ===============*/
document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.querySelector('.register__form');
  const emailInput = document.getElementById('register-email');
  const passwordInput = document.getElementById('register-pass');

  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
   
    if (localStorage.getItem('userCredentials') !== null) {
      const confirmation = confirm('Ya existe un usuario registrado. Si presionas continuar, se eliminará el usuario anterior');

      if (!confirmation) {
        emailInput.value = '';
        passwordInput.value = '';
        return;
      }
    }

    const enteredCredentials = {
      email: document.getElementById('register-email').value,
      password: document.getElementById('register-pass').value,
    };    

    localStorage.setItem('userCredentials', JSON.stringify(enteredCredentials));
    window.location.href = 'login.html';
  });
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