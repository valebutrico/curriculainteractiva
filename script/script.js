class Curso {
  constructor(codigo, nombre, creditos) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.creditos = creditos;
  }
}

const cdiv = new Curso(2454, 'Cálculo Diferencial e Integral en Una Variable', 13);
const galUno = new Curso(8747, 'Geometría y Álgebra Lineal 1', 9);
const discretaUno = new Curso(1543, 'Matemática Discreta 1', 9);
const cdivv = new Curso(2558, 'Cálculo Diferencial e Integral en Varias Variables', 13);
const galDos = new Curso(9274, 'Geometría y Álgebra Lineal 2', 9);
const discretaDos = new Curso(1523, 'Matemática Discreta 2', 9);
const progUno = new Curso(6789, 'Programación 1', 10);

let cursos = [cdiv, galUno, discretaUno, cdivv, galDos, discretaDos, progUno];
let nuevosCursos = [];

function numeroDeEstudiante() {
  let num = (prompt('Ingrese su número de estudiante'));
  if((num != null) && (num != '') && (!isNaN(num))) {
    alert('El estudiante N° ' + num + ' ha ingresado al sistema');
  } else {
    alert('El número no es válido');
    numeroDeEstudiante();
  }
}

function ingresar() {
  let ingresar = confirm('¿Es usted estudiante de la Facultad de Ingeniería?');
  numeroDeEstudiante(ingresar);
}

ingresar();

const consultarCursos = () => {
  if (nuevosCursos.length === 0) {
    console.log('No hay cursos registrados');
    irAlMenu();
  } else {
    console.log('----------- El listado de sus cursos es el siguiente -----------')
    nuevosCursos.forEach((curso) => {
      console.log(curso.nombre);
    })
    console.log('----------------------------------------------------------------')
    irAlMenu();
  }
}

const consultarCreditos = () => {
  const creditosTotales = nuevosCursos.reduce((acumulador, curso) => acumulador + curso.creditos, 0);
  console.log('Sus cursos acumulan un total de ' + creditosTotales + ' créditos. ');
  irAlMenu();
}

const aniadirCurso = () => {
  console.table(cursos);
  let nuevos = prompt('Ingrese el número de cursos que desea añadir');

  if ((nuevos != null) && (nuevos != '') && (!isNaN(nuevos)) && (nuevos <= 7)) {

    for (i = 0; i < nuevos; i++) {
      const codigoIngresado = Number(prompt('Ingresar el código del curso N°' + (i + 1)));
      const cursoIndex = cursos.findIndex(curso => curso.codigo === codigoIngresado);

      if (cursoIndex !== -1 && !nuevosCursos.includes(cursos[cursoIndex])) {
        nuevosCursos.push(cursos[cursoIndex]);
        console.log(`Curso con código ${codigoIngresado} agregado correctamente.`);
      } else {
        console.log(`Curso con código ${codigoIngresado} no válido o ya agregado.`);
      }

    }
  } else {
    alert('El valor ingresado no es válido, debe ser número menor a 7');
    irAlMenu();
  }
  
  irAlMenu();
}

function salir() {
  alert('Fin del proceso');
}

function irAlMenu() {
  console.log('---------------------------- MENÚ -----------------------------');
  console.log('1: Consultar cursos');
  console.log('2: Consultar créditos');
  console.log('3: Añadir curso');
  console.log('4: Salir');
  console.log('----------------------------------------------------------------')
  
  let op = prompt('Seleccione una opción');

  switch(op) {
    case "1": 
      consultarCursos();      
      break;
    case "2":
      consultarCreditos();      
      break;
    case "3":
      aniadirCurso();      
      break;
    case "4":
      salir();
      break;
    default:
      alert('Opción inválida');
      irAlMenu();
      break;
  }
}

irAlMenu();