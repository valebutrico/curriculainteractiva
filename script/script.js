let creditos = 0;
let cursos = [
  { codigo: 2454, nombre: 'Cálculo Diferencial e Integral en Una Variable', creditos: 13 },
  { codigo: 8747, nombre: 'Geometría y Álgebra Lineal 1', creditos: 9 },
  { codigo: 1543, nombre: 'Matemática Discreta 1', creditos: 9 },
  { codigo: 2558, nombre: 'Cálculo Diferencial e Integral en Varias Variables', creditos: 13 },
  { codigo: 9274, nombre: 'Geometría y Álgebra Lineal 2', creditos: 9 },
  { codigo: 1523, nombre: 'Matemática Discreta 2', creditos: 9 },
  { codigo: 6789, nombre: 'Programación 1', creditos: 10 }
];
let nuevosCursos = [];
let aniadir = []; 

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
    console.log('El listado de sus cursos es el siguiente:')
    nuevosCursos.forEach((curso) => {
      console.log(curso.nombre);
    })
    irAlMenu();
  }
}

const consultarCreditos = () => {
  const creditosTotales = nuevosCursos.reduce((acumulador, curso) => acumulador + curso.creditos, 0);
  console.log('Sus cursos acumulan un total de ' + creditosTotales + ' créditos. ');
  irAlMenu();
}

// Esta función fue usada en la entrega anterior porque se solicitaban bucles for, while o do while. La reescribí pero dejo el código por las dudas
// function aniadirCurso() {
//   let cursos = prompt('¿Cuántos cursos desea añadir?');
//   console.log('----------------CURSOS DISPONIBLES----------------')
//   console.log('1: Cálculo Diferencial e Integral en Una Variable');
//   console.log('2: Geometría y Álgebra Lineal 1');
//   console.log('3: Matemática Discreta 1');
//   console.log('4: Cálculo Diferencial e Integral en Varias Variables');
//   console.log('5: Geometría y Álgebra Lineal 2');
//   console.log('6: Matemática Discreta 2');
//   console.log('7: Programación 1');
//   console.log('--------------------------------------------------')  

//   for (i = 0; i < cursos; i++) {    
//     nuevosCursos[i] = [Number(prompt('Añadir el curso N°' + (i + 1)))]
//   }

//   if (nuevosCursos.length == 1) {
//     console.log('Se añadió')
//   }

//   console.log('Se añadieron ' + nuevosCursos.length + ' nuevos cursos a la escolaridad');

//   nuevosCursos.length = 0;
//   nuevosCursos.splice(0, nuevosCursos.length);

//   while (nuevosCursos.length > 0) {
//     a.pop();
//   }  

//   irAlMenu();
// }

const aniadirCurso = () => {
  console.table(cursos);
  
  let nuevos = prompt('¿Cuántos cursos desea añadir?');

  if((nuevos != null) && (nuevos != '') && (!isNaN(nuevos))) {
    for (i = 0; i < nuevos; i++) {    
      aniadir.push(Number(prompt('Ingresar el código del curso N°' + (i + 1))));
    }
  } else {
    alert('Debe añadir el número de cursos que desea agregar');
    irAlMenu();
  }      
  
  if ((aniadir.includes(2454)) && !nuevosCursos.includes(cursos[0])) {
    nuevosCursos.push(cursos[0]);
  }
  if ((aniadir.includes(8747)) && !nuevosCursos.includes(cursos[1])) {
    nuevosCursos.push(cursos[1]);
  }
  if ((aniadir.includes(1543)) && !nuevosCursos.includes(cursos[2])) {
    nuevosCursos.push(cursos[2]);
  }
  if ((aniadir.includes(2558)) && !nuevosCursos.includes(cursos[3])) {
    nuevosCursos.push(cursos[3]);
  }
  if ((aniadir.includes(9274)) && !nuevosCursos.includes(cursos[4])) {
    nuevosCursos.push(cursos[4]);
  }
  if ((aniadir.includes(1523)) && !nuevosCursos.includes(cursos[5])) {
    nuevosCursos.push(cursos[5]);
  }
  if ((aniadir.includes(6789)) && !nuevosCursos.includes(cursos[6])) {
    nuevosCursos.push(cursos[6]);
  }

  irAlMenu();
}

function salir() {
  alert('Fin del proceso');
}

function irAlMenu() {
  console.log('-----------------------MENÚ-----------------------');
  console.log('1: Consultar cursos');
  console.log('2: Consultar créditos');
  console.log('3: Añadir curso');
  console.log('4: Salir');
  console.log('--------------------------------------------------')
  
  let op = prompt('Seleccione una opción');

  switch(op) {
    case "1": 
      consultarCursos();      
      break;
    case "2":
      consultarCreditos();      
      break;1
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