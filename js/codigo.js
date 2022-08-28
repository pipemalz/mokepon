const botonElegir = document.getElementById('boton-elegir')
const botonReiniciar = document.getElementById('boton-reiniciar')
const seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const seccionReiniciarJuego = document.getElementById('boton-reiniciar')
const seccionMensajes = document.getElementById('mensajes')
const seccionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador') 
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const parrafoGanador = document.getElementById('resultado')
const parrafoResultado = document.getElementById('resultado-final')
const divAtaquesEnemigo = document.getElementById('ataques-enemigo')
const divAtaquesJugador = document.getElementById('ataques-jugador')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorBotonesAtaque = document.getElementById('botones-ataque')
let mokepones = []
let mascotaJugador
let mascotaEnemigo
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let botonesAtaques
let botonFuego
let botonAgua
let botonTierra
let botones = []
let ataqueSeleccionadoJugador = []
let ataqueSeleccionadoEnemigo = []
let ataquesMokeponEnemigo = []
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('hipodoge', './img/hipodoge.png', 5)
let capipepo = new Mokepon('capipepo', './img/capipepo.png', 5)
let ratigueya = new Mokepon('ratigueya', './img/ratigueya.png', 5)

hipodoge.ataques.push(
    {nombre: '💦', id: 'boton-agua', nombreAtaque: 'AGUA'},
    {nombre: '💦', id: 'boton-agua', nombreAtaque: 'AGUA'},
    {nombre: '💦', id: 'boton-agua', nombreAtaque: 'AGUA'},
    {nombre: '🌱', id: 'boton-tierra', nombreAtaque: 'TIERRA'},
    {nombre: '🔥', id: 'boton-fuego', nombreAtaque: 'FUEGO'}
)

capipepo.ataques.push(
    {nombre: '🌱', id: 'boton-tierra', nombreAtaque: 'TIERRA'},
    {nombre: '🌱', id: 'boton-tierra', nombreAtaque: 'TIERRA'},
    {nombre: '🌱', id: 'boton-tierra', nombreAtaque: 'TIERRA'},
    {nombre: '💦', id: 'boton-agua', nombreAtaque: 'AGUA'},
    {nombre: '🔥', id: 'boton-fuego', nombreAtaque: 'FUEGO'}
)

ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton-fuego', nombreAtaque: 'FUEGO'},
    {nombre: '🔥', id: 'boton-fuego', nombreAtaque: 'FUEGO'},
    {nombre: '🔥', id: 'boton-fuego', nombreAtaque: 'FUEGO'},
    {nombre: '💦', id: 'boton-agua', nombreAtaque: 'AGUA'},
    {nombre: '🌱', id: 'boton-tierra', nombreAtaque: 'TIERRA'}
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego(){
    seccionSeleccionarAtaque.style.display='none'
    seccionReiniciarJuego.style.display='none'
    seccionMensajes.style.display='none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
            <input type="radio" name="mascota" id="${mokepon.nombre}" />
            <label class="tarjeta-mokepon" for="${mokepon.nombre}" />
                <p>${mokepon.nombre}</p>
                <img src="${mokepon.foto}" alt="${mokepon.nombre}" id="img-${mokepon.nombre}" />
            </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
        
        inputHipodoge = document.getElementById('hipodoge')
        inputCapipepo = document.getElementById('capipepo')
        inputRatigueya = document.getElementById('ratigueya')
    })

    botonElegir.addEventListener('click', seleccionarMascotaJugador)

    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
        seleccionarMascotaEnemigo()
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
        seleccionarMascotaEnemigo()
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
        seleccionarMascotaEnemigo()
    } else {
        alert('Por favor elige una mascota! 🤔')
    }
    extraerAtaques(mascotaJugador)
}

function extraerAtaques(mascotaJugador){
    
    let ataques = []

    // for (let i = 0; i < mokepones.length; i++) {
    //     if(mascotaJugador === mokepones[i].nombre){
    //         ataques = mokepones[i].ataques
    //     }        
    // }

    mokepones.forEach((mokepon)=> {
        if(mascotaJugador === mokepon.nombre){
            ataques = mokepon.ataques
        }
    })

    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    
    ataques.forEach((ataque)=> {
        botonesAtaques = `<button class="boton-ataque btn-ataque" id="${ataque.id}">${ataque.nombre}</button>`
        contenedorBotonesAtaque.innerHTML += botonesAtaques
    })

    botones = document.querySelectorAll('.btn-ataque')
 
    secuenciaAtaque()
}

function secuenciaAtaque(){

    botones.forEach((boton)=> {
        boton.addEventListener('click', (evento)=>{
            if (evento.target.textContent === '🔥'){
                ataqueSeleccionadoJugador.push('FUEGO')
            }else if(evento.target.textContent === '💦'){
                ataqueSeleccionadoJugador.push('AGUA')
            }else{
                ataqueSeleccionadoJugador.push('TIERRA')
            }
            boton.style.background = '#666'
            boton.disabled = true
            boton.classList.remove('btn-ataque')
            seleccionarAtaqueEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatoriaEnemigo = numeroRandom(0, mokepones.length-1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoriaEnemigo].nombre
    
    ataquesMokeponEnemigo = mokepones[mascotaAleatoriaEnemigo].ataques
    // seccionSeleccionarMascota.style.display='none'
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


function seleccionarAtaqueEnemigo(){

    // let ataqueAleatorio = numeroRandom(0, ataquesMokeponEnemigo.length-1)

    // if (ataqueAleatorio == 0) {
    //     ataqueSeleccionadoEnemigo.push('FUEGO')
    // } else if (ataqueAleatorio == 1){
    //     ataqueSeleccionadoEnemigo.push('FUEGO')
    // } else if (ataqueAleatorio == 2){
    //     ataqueSeleccionadoEnemigo.push('AGUA')
    // } else if (ataqueAleatorio == 3){
    //     ataqueSeleccionadoEnemigo.push('AGUA')
    // } else {
    //     ataqueSeleccionadoEnemigo.push('TIERRA')
    // }

    // console.log(ataqueSeleccionadoEnemigo)
    ataquesMokeponEnemigo.sort(()=>Math.random()-0.5)
    ataqueSeleccionadoEnemigo.push(ataquesMokeponEnemigo[0].nombreAtaque)
    ataquesMokeponEnemigo.shift()

    console.log(ataqueSeleccionadoEnemigo)

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