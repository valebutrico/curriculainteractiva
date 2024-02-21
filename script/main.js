/*=============== LOADER ===============*/
let loader = document.querySelector('.loader');

window.addEventListener("load", vanish);

function vanish() {
  loader.classList.add('disappear');
}

/*
=============== LOGOUT ===============
Deshabilitado para facilitar la visualización de contenido

document.addEventListener('DOMContentLoaded', function () {
  const userEmailElement = document.getElementById('user-email');
  const logoutButton = document.getElementById('logout-button');
  const userCredentials = JSON.parse(localStorage.getItem('userCredentials'));

  if (userCredentials) {
    userEmailElement.textContent = `${userCredentials.email}`;
  } else {
    window.location.href = 'login.html';
  }

  logoutButton.addEventListener('click', function () {
  window.location.href = 'login.html';
  });
}); 

*/

/*=============== MAIN ===============*/
let cursosJSON = [];

fetch("./script/cursos.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo JSON.");
    }
    return response.json();
  })
  .then(data => {
    cursosJSON = data;
    construirBotonesDesdeJSON();
  })
  .catch(error => {
    console.error("Error al cargar datos desde el archivo JSON:", error);
  });


function construirBotonesDesdeJSON() {
  const contenedores = document.querySelectorAll('.curricula div');
  let aniosConCursos = {};

  cursosJSON.forEach(curso => {
    const boton = document.createElement('button');
    boton.textContent = curso.nombre;
    boton.classList.add('curso');
    boton.setAttribute('data-curso-id', curso.id);

    const contenedor = Array.from(contenedores).find(element => {
      return element.getAttribute('data-curso-id') === curso.anio;
    });

    if (contenedor) {
      contenedor.appendChild(boton);
    }

    aniosConCursos[curso.anio] = true;
  });

  contenedores.forEach(contenedor => {
    const anio = contenedor.dataset.cursoId;
    const h2 = document.querySelector(`h2[data-curso-id="${anio}"]`);
    if (h2) {
      if (aniosConCursos[anio]) {
        h2.style.display = 'block'; 
      } else {
        h2.style.display = 'none'; 
      }
    }
  });

  cargarEstadosDesdeLocalStorage();
  calcularCreditosTotales();
  actualizarEstadoBotones();
}

function cargarEstadosDesdeLocalStorage() {
  const botones = document.querySelectorAll('.curso');

  botones.forEach(boton => {
    const cursoID = boton.dataset.cursoId;
    const estado = localStorage.getItem(`curso_${cursoID}`);

    if (estado === 'aprobado') {
      boton.classList.add('aprobado');
    } else if (estado === 'exonerado') {
      boton.classList.add('exonerado');
    }
  });

  actualizarEstadoBotones();
}

function actualizarEstadoBotones() {
  const botones = document.querySelectorAll('.curso');

  botones.forEach(boton => {
    const cursoID = parseInt(boton.dataset.cursoId);
    const curso = cursosJSON.find(curso => curso.id === cursoID);
    
    const requisitosAprobados = curso.requisitoAprobado.every(id => {
      const botonRequisito = document.querySelector(`.curso[data-curso-id="${id}"]`);
      return botonRequisito && (botonRequisito.classList.contains('aprobado') || botonRequisito.classList.contains('exonerado'));
    });

    const requisitosExonerados = curso.requisitoExonerado.every(id => {
      const botonRequisito = document.querySelector(`.curso[data-curso-id="${id}"]`);
      return botonRequisito && botonRequisito.classList.contains('exonerado');
    });

    if (!requisitosAprobados || !requisitosExonerados) {
      boton.classList.add('visualmente-deshabilitado');
      boton.classList.remove('aprobado', 'exonerado');

      localStorage.setItem(`curso_${cursoID}`, 'ninguno');
    } else {
      boton.classList.remove('visualmente-deshabilitado');    
    }

    calcularCreditosTotales();
  });
}

function manejarClics(event) {
  const boton = event.target;

  if (boton.classList.contains('curso')) {
    if (boton.classList.contains('visualmente-deshabilitado')) {
      mostrarRequisitos(boton);
    } else {
      const cursoID = boton.dataset.cursoId;

      if (!boton.classList.contains('aprobado')) {
        boton.classList.add('aprobado');
        localStorage.setItem(`curso_${cursoID}`, 'aprobado');
      } else if (!boton.classList.contains('exonerado')) {
        boton.classList.add('exonerado');
        localStorage.setItem(`curso_${cursoID}`, 'exonerado');
      } else {
        boton.classList.remove('aprobado', 'exonerado');
        localStorage.setItem(`curso_${cursoID}`, 'ninguno');
      }

      calcularCreditosTotales();
      actualizarEstadoBotones();
    }
  }
}

function mostrarRequisitos(boton) {
  const cursoID = parseInt(boton.dataset.cursoId);
  const curso = cursosJSON.find(curso => curso.id === cursoID);

  let requisitosAprobados = [];
  let requisitosExonerados = [];

  if (curso.requisitoAprobado.length > 0) {
    requisitosAprobados = curso.requisitoAprobado.map(id => {
      return cursosJSON.find(curso => curso.id === id).nombre;
    });
  }

  if (curso.requisitoExonerado.length > 0) {
    requisitosExonerados = curso.requisitoExonerado.map(id => {
      return cursosJSON.find(curso => curso.id === id).nombre;
    });
  }

  let mensaje = '';
  if (requisitosAprobados.length > 0) {
    mensaje += `<p><strong>Necesitas al menos aprobar:</strong><br>${requisitosAprobados.join('<br>')}</p>`;
  }
  if (requisitosExonerados.length > 0) {
    if (mensaje !== '') mensaje += '<br>';
    mensaje += `<p><strong>Necesitas exonerar:</strong><br>${requisitosExonerados.join('<br>')}</p>`;
  }

  if (mensaje !== '') {
    Swal.fire({
      title: 'Requisitos pendientes',
      html: mensaje,
      icon: 'info',
      confirmButtonText: 'Entendido'
    });
  }
}

function calcularCreditosTotales() {
  const botones = document.querySelectorAll('.curso');
  let creditosTotales = 0;

  botones.forEach(boton => {
    if (boton.classList.contains('exonerado')) {
      const cursoID = parseInt(boton.dataset.cursoId);
      const curso = cursosJSON.find(curso => curso.id === cursoID);

      if (curso) {
        creditosTotales += curso.creditos;
      }
    }
  });

  const creditosTotalesDiv = document.getElementById('creditosTotales');
  creditosTotalesDiv.textContent = `Créditos Totales: ${creditosTotales}`;

  localStorage.setItem('creditosTotales', creditosTotales);
}

function limpiarCurricula() {
  const botones = document.querySelectorAll('.curso');

  botones.forEach(boton => {
    boton.classList.remove('aprobado', 'exonerado', 'deshabilitado');

    const cursoID = boton.dataset.cursoId;
    localStorage.setItem(`curso_${cursoID}`, 'ninguno');
  });

  const creditosTotalesDiv = document.getElementById('creditosTotales');
  creditosTotalesDiv.textContent = 'Créditos Totales: 0';
  localStorage.setItem('creditosTotales', 0);

  actualizarEstadoBotones();
}

const creditosGuardados = localStorage.getItem('creditosTotales');
if (creditosGuardados) {
  const creditosTotalesDiv = document.getElementById('creditosTotales');
  creditosTotalesDiv.textContent = `Créditos Totales: ${creditosGuardados}`;
}

const contenedorCursos = document.querySelector('.curricula');
contenedorCursos.addEventListener('click', manejarClics);

const limpiarButton = document.querySelector('.limpiar button');
limpiarButton.addEventListener('click', limpiarCurricula);