document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.querySelector('.login__form');

  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const newUserCredentials = {
      email: document.getElementById('login-email').value,
      password: document.getElementById('login-pass').value,
    };

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const userExists = registeredUsers.some((user) => user.email === newUserCredentials.email);

    if (userExists) {
      alert('Este usuario ya está registrado. Por favor, inicia sesión.');
    } else {
      registeredUsers.push(newUserCredentials);

      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

      window.location.href = 'login.html';
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