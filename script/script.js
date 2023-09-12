let creditos = 0;
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

function consultarCreditos() {
  let cdiv = confirm('¿Exoneró el curso o salvó el examen de Cálculo Diferencial e Integral en Una Variable?');   
  let galUno = confirm('¿Exoneró el curso o salvó el examen de Geometría y Álgebra Lineal 1?');    
  let discretaUno = confirm('¿Exoneró el curso o salvó el examen de Matemática Discreta 1?'); 
  let cdivV = confirm('¿Exoneró el curso o salvó el examen de Cálculo Diferencial e Integral en Varias Variable?');    
  let galDos = confirm('¿Exoneró el curso o salvó el examen de Geometría y Álgebra Lineal 2?');    
  let discretaDos = confirm('¿Exoneró el curso o salvó el examen de Matemática Discreta 2?');    
  let prog = confirm('¿Exoneró el curso o salvó el examen de Programación 1?');  
  
  if (cdiv) {
    creditos = creditos + 13;
  }
  if (cdivV) {
    creditos = creditos + 13;
  }
  if (galUno) {
    creditos = creditos + 9;
  }
  if (galDos) {
    creditos = creditos + 9;
  }
  if (discretaUno) {
    creditos = creditos + 9;
  }
  if (discretaDos) {
    creditos = creditos + 9;
  }
  if (prog) {
    creditos = creditos + 10;
  }

  console.log('La suma total de sus créditos es de: ' + creditos);
}

function aniadirCurso() {
  let cursos = prompt('¿Cuántos cursos desea añadir?');
  console.log('----------------CURSOS DISPONIBLES----------------')
  console.log('1: Cálculo Diferencial e Integral en Una Variable');
  console.log('2: Geometría y Álgebra Lineal 1');
  console.log('3: Matemática Discreta 1');
  console.log('4: Cálculo Diferencial e Integral en Varias Variables');
  console.log('5: Geometría y Álgebra Lineal 2');
  console.log('6: Matemática Discreta 2');
  console.log('7: Programación 1');
  console.log('--------------------------------------------------')  

  for (i = 0; i < cursos; i++) {    
    nuevosCursos[i] = [Number(prompt('Añadir el curso N°' + (i + 1)))]
  }

  if (nuevosCursos.length == 1) {
    console.log('Se añadió')
  }

  console.log('Se añadieron ' + nuevosCursos.length + ' nuevos cursos a la escolaridad');

  nuevosCursos.length = 0;
  nuevosCursos.splice(0, nuevosCursos.length);

  while (nuevosCursos.length > 0) {
    a.pop();
  }  

  irAlMenu();
}

function salir() {
  alert('Fin del proceso');
}

function irAlMenu() {
  console.log('-----------------------MENÚ-----------------------');
  console.log('1: Consultar créditos');
  console.log('2: Añadir curso');
  console.log('3: Salir');
  console.log('--------------------------------------------------')
  
  let op = prompt('Seleccione una opción');

  switch(op) {
    case "1":
      consultarCreditos();      
      irAlMenu();
      break;
    case "2":
      aniadirCurso();      
      break;
    case "3":
      salir();
      break;
    default:
      alert('Opción inválida');
      irAlMenu();
      break;
  }
}

irAlMenu();