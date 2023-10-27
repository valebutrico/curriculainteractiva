document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('.login__form');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const enteredCredentials = {
      email: document.getElementById('login-email').value,
      password: document.getElementById('login-pass').value,
    };

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const userExists = registeredUsers.some((user) =>
      user.email === enteredCredentials.email && user.password === enteredCredentials.password
    );

    if (userExists) {
      window.location.href = 'index.html';
    } else {
      alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  });
});

/*=============== MOSTRAR CONTRASEÑA ===============*/
const mostrarContrasenia = (loginPass, loginEye) =>{
  const input = document.getElementById(loginPass),
   iconEye = document.getElementById(loginEye)

   iconEye.addEventListener('click', () =>{
     if(input.type === 'password'){
      input.type = 'text'

      iconEye.classList.add('ri-eye-line')
      iconEye.classList.remove('ri-eye-off-line')
      } else{
      input.type = 'password'

      iconEye.classList.remove('ri-eye-line')
      iconEye.classList.add('ri-eye-off-line')
      }
   })
}

mostrarContrasenia('login-pass','login-eye')