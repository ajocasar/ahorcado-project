
const imagenes = document.querySelector(".imagenes");
const palabra = document.querySelector(".palabra");
const letrasErradas = document.querySelector(".letrasErradas");
const agregarInput = document.querySelector(".input-text");
const horca = document.querySelector(".bruja");
const primero = document.querySelector(".horca");
var validacion = 0;
var intentos = 7;
var palabraElegida;
const imagen = document.querySelector(".letra");
var textContent;

let tiempoRestante = 60; // 2 minutos en segundos
let nuevoArray = [];
let nuevoArray2 = [];
// let pattern = new RegExp('[A-ZÑ]?'); //patron para letras entre la A y la Z mayusculas y la Ñ
var palabras = 
[
"HONDURAS",
"TEGUCIGALPA",
"SPS",
];

function escogerPalabra(n){
    random = Math.round(Math.random()*n); //funcion para randomizar un numero entre el 0 y el numero mayor del array
    if (random == palabras.length) {
        random = random - 1; 
    }
    return random;
}

function agregarBtn(){
    comprobarTextarea();
}

function agregar(value){         // funcion para agregar una nueva palabra en mayuscula
    if (value != ""){
        value = value.toUpperCase();
        palabras.push(value);
        // console.log(palabras);
    }
}

const fragment = document.createDocumentFragment();
const bgrImg = document.createDocumentFragment();

function escoger() {
    var numeroPalabra = escogerPalabra(palabras.length);   //variable asociada al numero que se randomizó
    palabraAleatoria =  palabras[numeroPalabra].split("");
    for ( var i=0; i < palabraAleatoria.length; i++) {
        palabraElegida= document.createElement("span");
        palabraElegida.innerHTML += `<img src="/static/imagenes/LETRA.svg"><b>${palabraAleatoria[i]}</b>`
        palabraElegida.classList.add(palabraAleatoria[i]+i);
        fragment.appendChild(palabraElegida);
    }
    // imagen.innerHTML = "imagenes/LETRA.png";
    palabra.appendChild(fragment);
}
var tecla; //recoge el evento de la tecla

function paginaJugar(){
    document.querySelector(".paginaIndex").style.display = `none`;
    document.querySelector(".paginaJugar").style.display = `block`;
    document.addEventListener("keydown", verificacion, true);
    document.querySelector(".container-letrasErradas").style.visibility = "hidden";
    document.getElementById("repetida").classList.remove("repetida");
    document.getElementById("alertaFallo-fondo").classList.remove("alertaFallo-fondo");
    document.getElementById("alertaCorrecto-fondo").classList.remove("alertaCorrecto-fondo");
    agregarInput.blur();

    limpiar();
    agregarInput.value = "";
}
function paginaAgregar(){
    document.querySelector(".paginaIndex").style.display = `none`;
    document.querySelector(".paginaJugar").style.display = `none`;
    document.querySelector(".paginaAgregar").style.display = `block`;
    document.getElementById("palabraExiste").classList.remove("alertaAgregar");
    tecla = document.removeEventListener("keydown", verificacion, true);
    // agregarInput.onkeydown = "cancelar()";
}
function paginaIndex(){
    document.querySelector(".paginaJugar").style.display = `none`;
    document.querySelector(".paginaAgregar").style.display = `none`;
    document.querySelector(".paginaIndex").style.display = `block`;
    tecla = document.removeEventListener("keydown", verificacion, true);
}

function verificacion(event){
    key = event.key.toUpperCase();   // Deja solo la letra que se apretó en mayuscula
    const existe = palabraAleatoria.includes(key);   //devuelve true si existe
    const repite = nuevoArray.includes(key);        //devuelve true si se repite
    const repite2 = nuevoArray2.includes(key);
    const repetidas = repite + repite2;
    const abecedario = /^[A-ZÑ]$/.test(key);
    if(abecedario){
        if (repite == false && existe){
            for( var i=0; i < palabraAleatoria.length; i++){
                if(palabraAleatoria[i] == key){
                    nuevoArray.push(palabraAleatoria[i]);
                    document.querySelector("."+palabraAleatoria[i]+i).classList.add("aparecer");

                }
            }    
        }
        if (nuevoArray.length == palabraAleatoria.length) {
            document.getElementById("alertaCorrecto-fondo").classList.remove("alertaCorrecto-fondo")
            document.getElementById("alertaCorrecto-fondo").offsetWidth;
            document.getElementById("alertaCorrecto-fondo").classList.add("alertaCorrecto-fondo")
            setTimeout( function alertaPerder(){
                paginaJugar();
            },3600)
        }
        if(repetidas){
            document.getElementById("repetida").classList.remove("repetida");
            document.getElementById("repetida").offsetWidth;
            document.getElementById("repetida").classList.add("repetida");
        }
        if(existe == false && repite2 == false){
                nuevoArray2.push(key);
            letrasErradas.innerHTML += (" "+ key);
            intentos = intentos -1;
            document.querySelector(".container-letrasErradas").style.visibility = "visible";
            document.querySelector(".intentos-numero").innerHTML = intentos
            bruja(intentos);
        }
    } 
    if(intentos == 0){
        tecla = document.removeEventListener("keydown", verificacion, true);
        for( var i=0; i < palabraAleatoria.length; i++){
            document.querySelector("."+palabraAleatoria[i]+i).className = "aparecer";
        }
        laPalabraEra = palabraAleatoria.join("");
        console.log(laPalabraEra)
        document.querySelector(".texto-alertaFallo").innerHTML = laPalabraEra
        document.getElementById("alertaFallo-fondo").classList.remove("alertaFallo-fondo")
        document.getElementById("alertaFallo-fondo").offsetWidth;
        document.getElementById("alertaFallo-fondo").classList.add("alertaFallo-fondo")
        setTimeout( function alertaPerder(){
            paginaJugar();
        },3600)
    } 
}


function bruja(numero){
    switch (numero){
        case 6:
        horca.innerHTML += `<img class="horca" src="/static/imagenes/PARTE-3.svg">`
        break;

        case 5:
            document.querySelector(".horca").classList.add("sencillo")
            document.querySelector(".horca").classList.remove("horca");
        horca.innerHTML += `<img class="horca" src="/static/imagenes/PARTE-4.svg">`
        break;
        
        case 4:
            document.querySelector(".horca").classList.add("sencillo")
            document.querySelector(".horca").classList.remove("horca");
            horca.innerHTML += `<img class="horca" src="/static/imagenes/AHORCADO PARTES/PARTE-5.svg">`
        break;

        case 3:
            document.querySelector(".horca").classList.add("sencillo")
            document.querySelector(".horca").classList.remove("horca");
            horca.innerHTML += `<img class="horca" src="/static/imagenes/PARTE-6.svg">`
        break;
        
        case 2:
            document.querySelector(".horca").classList.add("sencillo")
            document.querySelector(".horca").classList.remove("horca");
            horca.innerHTML += `<img class="horca" src="/static/imagenes/PARTE-7.svg">`
        break;
        
        case 1:
            document.querySelector(".horca").classList.add("sencillo")
            document.querySelector(".horca").classList.remove("horca");
            horca.innerHTML += `<img class="horca" src="/static/imagenes/PARTE-8.svg">`
        break;
        
        case 0:
            document.querySelector(".horca").classList.add("sencillo")
            document.querySelector(".horca").classList.remove("horca");
            horca.innerHTML += `<img class="horca" src="/static/imagenes/PARTE-9.svg">`
        break;
        
        default:
        break;
    }
}


function actualizarTemporizador() {
    if (tiempoRestante > 0) {
        tiempoRestante--;
        mostrarTiempo(tiempoRestante);
    } else {
        // El tiempo ha expirado, realiza alguna acción (por ejemplo, pasa a la siguiente palabra)
        limpiar();
    }
}


 function limpiar(){
    palabra.innerHTML= "";
    escogerPalabra(palabras.length);
    escoger();
    intentos = 7;
    horca.innerHTML = "";
    letrasErradas.innerHTML = "";
    document.querySelector(".intentos-numero").innerHTML = "7"
    nuevoArray2 = [];
    nuevoArray = [];
 
tiempoRestante = 60;
}
setInterval(actualizarTemporizador, 1000);

 function cancelar(){
    var key = event.keyCode;
    if(key == 13){
        event.preventDefault();
        agregarBtn();
    }
    if(key == 32){
        event.preventDefault();
    }
 }
 function comprobarTextarea (){
    const existePalabra = palabras.includes(agregarInput.value);
    const pattern = new RegExp('^[A-Z]+$', 'i');
    if (agregarInput.value == ""){
        paginaJugar();
    }else{
        if (pattern.test(agregarInput.value)){
            const existePalabra = palabras.includes(agregarInput.value.toUpperCase())
            // console.log(agregarInput.value)
            if (existePalabra){
                document.getElementById("palabraExiste").classList.remove("alertaAgregar");
                document.getElementById("palabraExiste").offsetWidth;
                document.getElementById("palabraExiste").classList.add("alertaAgregar");
            }
            if(existePalabra == false){
                agregar(agregarInput.value);    //función de botón que llama a la función para agregar la palabra
                paginaJugar();
            }
        }
        else{
            document.getElementById("permitidas").classList.remove("alertaAgregar");
            document.getElementById("permitidas").offsetWidth;
            document.getElementById("permitidas").classList.add("alertaAgregar");
        }
    }
}
