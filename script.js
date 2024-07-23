let entrada = document.querySelector("#entrada");
let salida = document.querySelector("#salida");
let encriptador = document.querySelector("#encriptar");
let desencriptador = document.querySelector("#desencriptar");
let limpiar = document.querySelector("#limpiar");
let copiar = document.querySelector("#copiar");
let muñeco = document.getElementById("muñeco");
let msj = document.getElementById("mensaje");
let alerta = document.getElementById("validacion");
let notificacion = document.getElementsByClassName("notificacion")[0];
let dark = document.querySelector("#dark");
let ancho = document.documentElement.clientWidth + 17;
let op;

function check() {
  let vocal = entrada.value;
  let arreglo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];

  switch (op) {
    case 0:
      for (let i = 0; i < arreglo.length; i++) {
        if (vocal.includes(arreglo[i][0])) {
          vocal = vocal.replaceAll(arreglo[i][0], arreglo[i][1]);
        }
      }
      break;
    case 1:
      for (let i = 0; i < arreglo.length; i++) {
        if (vocal.includes(arreglo[i][1])) {
          vocal = vocal.replaceAll(arreglo[i][1], arreglo[i][0]);
        }
      }
      break;
    default:
      muñeco.style.display = "block";
      msj.style.display = "block";
      break;
  }
  salida.value = vocal;
}

function mostrar() {
  if (ancho > 1007) {
    muñeco.style.display = "block";
    msj.style.display = "block";
  } else {
    msj.style.display = "block";
  }
}

function ocultar() {
  muñeco.style.display = "none";
  msj.style.display = "none";
  salida.style.position = "relative";
  salida.style.top = 1000;
}

function cifrar() {
  //Comprueba mayúsculas y  con acentos
  if (!/[A-ZÀ-ÿ\u00f1\u00d1]/g.test(entrada.value)) {
    op = 0;
    check();
    ocultar();
    alerta.style.display = "none";

    if (entrada.value == "") {
      mostrar();
    }
  } else {
    mostrar();
    salida.value = "";
    alerta.style.display = "flex";
  }
}

function decifrar() {
  if (!/[A-ZÀ-ÿ\u00f1\u00d1]/g.test(entrada.value)) {
    op = 1;
    check();
    ocultar();
    alerta.style.display = "none";
    if (entrada.value == "") {
      mostrar();
    }
  } else {
    mostrar();
    salida.value = "";
    alerta.style.display = "flex";
  }
}

function borrar() {
  mostrar();
  salida.value = "";
  entrada.value = "";
  alerta.style.display = "none";
}

function copiarTexto() {
  if (salida.value != "") {
    navigator.clipboard.writeText(salida.value);
    notificacion.style.display = "flex";
    setTimeout(() => {
      notificacion.style.display = "none";
    }, 3000);
  }
}

function oscuro(){
  document.body.classList.toggle('dark')
}

encriptador.onclick = cifrar;
desencriptador.onclick = decifrar;
limpiar.onclick = borrar;
copiar.onclick = copiarTexto;
dark.onclick = oscuro;
