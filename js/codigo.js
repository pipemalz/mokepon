const botonElegir = document.getElementById('boton-elegir')
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonTierra = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById('boton-reiniciar')
const seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const seccionReiniciarJuego = document.getElementById('boton-reiniciar')
const seccionMensajes = document.getElementById('mensajes')
const seccionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const inputHipodoge = document.getElementById('hipodoge')
const inputCapipepo = document.getElementById('capipepo')
const inputRatigueya = document.getElementById('ratigueya')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador') 
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const parrafoGanador = document.getElementById('resultado')
const parrafoResultado = document.getElementById('resultado-final')
const divAtaquesEnemigo = document.getElementById('ataques-enemigo')
const divAtaquesJugador = document.getElementById('ataques-jugador')
let mokepones = []
let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
    }
}

let hipodoge = new Mokepon('Hipodoge', './img/hipodoge.png', 5)
let capipepo = new Mokepon('capipepo', './img/capipepo.png', 5)
let ratigueya = new Mokepon('ratigueya', './img/ratigueya.png', 5)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego(){
    seccionSeleccionarAtaque.style.display='none'
    seccionReiniciarJuego.style.display='none'
    seccionMensajes.style.display='none'

    botonElegir.addEventListener('click', seleccionarMascotaJugador)
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() { 

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = 'Hipodoge'
        seleccionarMascotaEnemigo()
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = 'Capipepo'
        seleccionarMascotaEnemigo()
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = 'Ratigueya'
        seleccionarMascotaEnemigo()
    } else {
        alert('Por favor elige una mascota! 🤔')
    }

}

function seleccionarMascotaEnemigo(){
    let mascotaAleatoriaEnemigo = numeroRandom(1,3)

    if (mascotaAleatoriaEnemigo == 1){
        spanMascotaEnemigo.innerHTML ='Hipodoge'
    } else if (mascotaAleatoriaEnemigo == 2){
        spanMascotaEnemigo.innerHTML ='Capipepo'
    } else {
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }

    seccionSeleccionarMascota.style.display='none'
    seccionSeleccionarAtaque.style.display='flex'
    inputHipodoge.disabled = true
    inputCapipepo.disabled = true
    inputRatigueya.disabled = true
    botonElegir.disabled = true
    spanVidasJugador.innerHTML = vidasJugador
    spanVidasEnemigo.innerHTML = vidasEnemigo
}

function numeroRandom(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function ataqueFuego(){
    ataqueJugador = 'Fuego 🔥'
    seleccionarAtaqueEnemigo()
}

function ataqueAgua(){
    ataqueJugador = 'Agua 💦'
    seleccionarAtaqueEnemigo()
}

function ataqueTierra(){
    ataqueJugador = 'Tierra 🌱'
    seleccionarAtaqueEnemigo()
}

function seleccionarAtaqueEnemigo(){
    let ataqueAleatorio = numeroRandom(1,3)

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'Fuego 🔥'
    } else if (ataqueAleatorio == 2){
        ataqueEnemigo = 'Agua 💦'
    } else {
        ataqueEnemigo = 'Tierra 🌱'
    }

    if(vidasEnemigo <= 0 || vidasJugador <=0){
        alert('El combate ha finalizado, reinicia el juego para seguir jugando...')
    } else {
        combate()
    }
    
}

// Agua derrota Fuego, Fuego derrota Tierra, Tierra derrota Agua

function crearMensaje(resultado) { 
    let parrafoAtaquesEnemigo = document.createElement('p')
    let parrafoAtaquesJugador = document.createElement('p')
    parrafoAtaquesEnemigo.innerHTML = ataqueEnemigo
    parrafoAtaquesJugador.innerHTML = ataqueJugador
    parrafoGanador.innerHTML = resultado

    divAtaquesEnemigo.appendChild(parrafoAtaquesEnemigo)
    divAtaquesJugador.appendChild(parrafoAtaquesJugador)
}

function combate() {
    let resultado
    seccionMensajes.style.display='flex'
    spanVidasJugador.innerHTML = vidasJugador
    spanVidasEnemigo.innerHTML = vidasEnemigo

    if (ataqueJugador ==  ataqueEnemigo){
        resultado = 'Empate!! 😐'
    }else if (ataqueJugador == 'Agua 💦' && ataqueEnemigo == 'Fuego 🔥') {
        resultado = 'Ganaste!! 😁'
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'Fuego 🔥' && ataqueEnemigo == 'Tierra 🌱') {
        resultado = 'Ganaste!! 😁'
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'Tierra 🌱' && ataqueEnemigo == 'Agua 💦') {
        resultado = 'Ganaste!! 😁'
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        resultado = 'Perdiste!! 😫'
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }
    crearMensaje(resultado)

    revisarVidas()
}

function revisarVidas() {
    let ganador

    if(vidasJugador == 0){
        ganador = 1
        // crearMensajeGanador('Te quedaste sin vidas, has perdido! 😫')
        detenerJuego()
    } else if (vidasEnemigo == 0) {
        // crearMensajeGanador()
        ganador = 2
        detenerJuego()
    }
    
    crearMensajeGanador(ganador)
}

function detenerJuego() {
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    seccionReiniciarJuego.style.display = 'block'
    parrafoGanador.style.display = 'none'
}

function crearMensajeGanador(ganador) { 
    if (ganador == 1){
        parrafoResultado.innerHTML = 'Te quedaste sin vidas, has perdido! 😫'
        seccionMensajes.style.backgroundColor = 'crimson'
    } else if (ganador == 2) {
        parrafoResultado.innerHTML = 'El enemigo se ha quedado sin vidas, ganaste! 😁'
        seccionMensajes.style.backgroundColor = 'green'
    }
}

function reiniciarJuego(){
    location.reload()
}

window.addEventListener('load', iniciarJuego)