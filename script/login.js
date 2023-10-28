/*=============== LOGIN ===============*/
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('.login__form');
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-pass');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const enteredCredentials = {
      email: document.getElementById('login-email').value,
      password: document.getElementById('login-pass').value,
    };

    const userCredentials = JSON.parse(localStorage.getItem('userCredentials'));

    if (userCredentials && userCredentials.email === enteredCredentials.email && userCredentials.password === enteredCredentials.password) {
      window.location.href = 'index.html';
    } else {
      alert('Email o contraseña incorrecta! Inténtalo de nuevo o regístrate');
      emailInput.value = '';
      passwordInput.value = '';
    }
  });
});

/*=============== MOSTRAR CONTRASEÑA ===============*/
const mostrarContrasenia = (loginPass, loginEye) => {
  const input = document.getElementById(loginPass);
  const iconEye = document.getElementById(loginEye);

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

mostrarContrasenia('login-pass', 'login-eye');