const entrada = document.querySelector("#entrada");
const salida = document.querySelector("#salida");
const encriptador = document.querySelector("#encriptar");
const desencriptador = document.querySelector("#desencriptar");
const limpiar = document.querySelector("#limpiar");
const copiar = document.querySelector("#copiar");
const muñeco = document.getElementById("muñeco");
const msj = document.getElementById("mensaje");
const alerta = document.getElementById("validacion");
const notificacion = document.getElementsByClassName("notificacion")[0];
const dark = document.querySelector("#dark");
const ancho = document.documentElement.clientWidth + 17;
let op;

const arreglo = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"],
];

function check() {
  let vocal = entrada.value;

  arreglo.forEach(([original, reemplazo]) => {
    if (op === 0 && vocal.includes(original)) {
      vocal = vocal.replaceAll(original, reemplazo);
    } else if (op === 1 && vocal.includes(reemplazo)) {
      vocal = vocal.replaceAll(reemplazo, original);
    }
  });

  salida.value = vocal;
}

function mostrar() {
  muñeco.style.display = ancho > 1007 ? "block" : "none";
  msj.style.display = "block";
}

function ocultar() {
  muñeco.style.display = "none";
  msj.style.display = "none";
  salida.style.position = "relative";
  salida.style.top = "1000px";
}

function cifrar() {
  if (!/[A-ZÀ-ÿ\u00f1\u00d1]/g.test(entrada.value)) {
    op = 0;
    check();
    ocultar();
    alerta.style.display = "none";

    if (entrada.value === "") {
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

    if (entrada.value === "") {
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
  if (salida.value !== "") {
    navigator.clipboard.writeText(salida.value);
    notificacion.style.display = "flex";
    setTimeout(() => {
      notificacion.style.display = "none";
    }, 3000);
  }
}

function oscuro() {
  document.body.classList.toggle('dark');
}

encriptador.addEventListener("click", cifrar);
desencriptador.addEventListener("click", decifrar);
limpiar.addEventListener("click", borrar);
copiar.addEventListener("click", copiarTexto);
dark.addEventListener("click", oscuro);
