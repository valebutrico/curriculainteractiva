document.addEventListener('DOMContentLoaded', function () {
  const isUserRegistered = localStorage.getItem('userCredentials') !== null;

  if (!isUserRegistered) {
      window.location.href = 'login.html';
  }
});

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
  });

  cargarEstadosDesdeLocalStorage();
  calcularCreditosTotales();
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
}

function manejarClics(event) {
  const boton = event.target;

  if (boton.classList.contains('curso')) {
    const cursoID = boton.dataset.cursoId;

    if (boton.classList.contains('aprobado')) {
      boton.classList.remove('aprobado');
      boton.classList.add('exonerado');

      localStorage.setItem(`curso_${cursoID}`, 'exonerado');
    } else if (boton.classList.contains('exonerado')) {
      boton.classList.remove('exonerado');
      localStorage.setItem(`curso_${cursoID}`, 'ninguno'); 
    } else {
      boton.classList.add('aprobado');
      localStorage.setItem(`curso_${cursoID}`, 'aprobado');
    }

    calcularCreditosTotales();
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

const creditosGuardados = localStorage.getItem('creditosTotales');
if (creditosGuardados) {
  const creditosTotalesDiv = document.getElementById('creditosTotales');
  creditosTotalesDiv.textContent = `Créditos Totales: ${creditosGuardados}`;
}

const contenedorCursos = document.querySelector('.curricula');
contenedorCursos.addEventListener('click', manejarClics);

let loader = document.querySelector('.loader');

window.addEventListener("load", vanish);

function vanish() {
  loader.classList.add('disappear');
}