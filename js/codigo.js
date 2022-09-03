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
let mascotaJugador = null
let mascotaEnemigo
let opcionDeMokepones
let inputMascota = []
let botonesAtaques
let botones = []
let ataqueSeleccionadoJugador = []
let ataqueSeleccionadoEnemigo = []
let ataquesMokeponJugador = []
let ataquesMokeponEnemigo = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0

class Mokepon {
    constructor(nombre, foto, tipo){
        this.nombre = nombre
        this.foto = foto
        this.tipo = tipo
        this.ataques = []
    }
}

function crearMokepon(nombre, foto, tipo){
    let mokepon = new Mokepon(nombre, foto, tipo)
    mokepones.push(mokepon)
    asignarAtaques(mokepon)
}

function asignarAtaques(mokepon){
    if (mokepon.tipo == 'AGUA'){
        mokepon.ataques.push(
            {nombre: 'AGUA', id: 'boton-agua', icono: '💦'},
            {nombre: 'AGUA', id: 'boton-agua', icono: '💦'},
            {nombre: 'VIENTO', id: 'boton-viento', icono: '💨'},
            {nombre: 'TIERRA', id: 'boton-tierra', icono: '🌱'},
            {nombre: 'FUEGO', id: 'boton-fuego', icono: '🔥'}
        )
    }else if (mokepon.tipo == 'TIERRA'){
        mokepon.ataques.push(
            {nombre: 'TIERRA', id: 'boton-tierra', icono: '🌱'},
            {nombre: 'TIERRA', id: 'boton-tierra', icono: '🌱'},
            {nombre: 'VIENTO', id: 'boton-viento', icono: '💨'},
            {nombre: 'AGUA', id: 'boton-agua', icono: '💦'},
            {nombre: 'FUEGO', id: 'boton-fuego', icono: '🔥'}
        )
    }else if (mokepon.tipo == 'FUEGO'){
        mokepon.ataques.push(
            {nombre: 'FUEGO', id: 'boton-fuego', icono: '🔥'},
            {nombre: 'FUEGO', id: 'boton-fuego', icono: '🔥'},
            {nombre: 'VIENTO', id: 'boton-viento', icono: '💨'},
            {nombre: 'AGUA', id: 'boton-agua', icono: '💦'},
            {nombre: 'TIERRA', id: 'boton-tierra', icono: '🌱'}
        )      
    }else if(mokepon.tipo == 'VIENTO'){
        mokepon.ataques.push(
            {nombre: 'VIENTO', id: 'boton-viento', icono: '💨'},
            {nombre: 'VIENTO', id: 'boton-viento', icono: '💨'},
            {nombre: 'TIERRA', id: 'boton-tierra', icono: '🌱'},
            {nombre: 'AGUA', id: 'boton-agua', icono: '💦'},
            {nombre: 'FUEGO', id: 'boton-fuego', icono: '🔥'}
        )
    }
}

function iniciarJuego(){

    crearMokepon('hipodoge', './img/hipodoge.png', 'AGUA')
    crearMokepon('capipepo', './img/capipepo.png', 'TIERRA')
    crearMokepon('ratigueya', './img/ratigueya.png', 'FUEGO')
    crearMokepon('tucapalma', './img/tucapalma.png', 'VIENTO')
    crearMokepon('pydos', './img/pydos.png', 'TIERRA')
    crearMokepon('langostelvis', './img/langostelvis.png', 'AGUA')

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
        
        inputMascota = document.getElementsByName('mascota')
    })

    botonElegir.addEventListener('click', seleccionarMascotaJugador)

    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {

    for (let i = 0; i < inputMascota.length; i++) {
        if(inputMascota[i].checked){
            console.log("Seleccionado " + inputMascota[i].id)
            spanMascotaJugador.innerHTML = inputMascota[i].id
            mascotaJugador = inputMascota[i].id
            seleccionarMascotaEnemigo()
        } 
    }

    if(mascotaJugador == null){
        botonElegir.disabled = true
    }
    
    extraerAtaques(mascotaJugador)
}

function extraerAtaques(mascotaJugador){
    
    mokepones.forEach((mokepon)=> {
        if(mascotaJugador === mokepon.nombre){
            ataquesMokeponJugador = mokepon.ataques
        }
    })

    mostrarAtaques(ataquesMokeponJugador)
}

function mostrarAtaques(ataques){
    
    ataques.forEach((ataque)=> {
        botonesAtaques = `<button class="boton-ataque btn-ataque" id="${ataque.id}">${ataque.icono}</button>`
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
            console.log(ataqueSeleccionadoJugador)
        })
    })
}

function numeroRandom(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatoriaEnemigo = numeroRandom(0, mokepones.length-1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoriaEnemigo].nombre
    
    ataquesMokeponEnemigo = mokepones[mascotaAleatoriaEnemigo].ataques
    // seccionSeleccionarMascota.style.display='none'
    seccionSeleccionarAtaque.style.display='flex'
    inputMascota.disabled = true
    botonElegir.disabled = true
}

function seleccionarAtaqueEnemigo(){

    ataquesMokeponEnemigo.sort(()=>Math.random()-0.5)
    ataqueSeleccionadoEnemigo.push(ataquesMokeponEnemigo[0].nombre)
    ataquesMokeponEnemigo.shift()

    console.log(ataqueSeleccionadoEnemigo)

    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueSeleccionadoJugador.length === 5){
        combate()
    }
}

// Agua derrota Fuego, Fuego derrota Tierra, Tierra derrota Agua

function indexAmbosOponentes(jugador,enemigo){
    indexAtaqueJugador = ataqueSeleccionadoJugador[jugador]
    indexAtaqueEnemigo = ataqueSeleccionadoEnemigo[enemigo]
}

function combate() {

    seccionMensajes.style.display='flex'

    for (let i = 0; i < ataqueSeleccionadoJugador.length; i++) {
        
        if (ataqueSeleccionadoJugador[i] ==  ataqueSeleccionadoEnemigo[i]){
            indexAmbosOponentes(i,i)
        }else if (ataqueSeleccionadoJugador[i] == 'AGUA' && ataqueSeleccionadoEnemigo[i] == 'FUEGO') {
            indexAmbosOponentes(i,i)
            victoriasJugador++
        } else if (ataqueSeleccionadoJugador[i] == 'FUEGO' && ataqueSeleccionadoEnemigo[i] == 'TIERRA') {
            indexAmbosOponentes(i,i)
            victoriasJugador++
        } else if (ataqueSeleccionadoJugador[i] == 'TIERRA' && ataqueSeleccionadoEnemigo[i] == 'TIERRA') {
            indexAmbosOponentes(i,i)
            victoriasJugador++
        } else {
            indexAmbosOponentes(i,i)
            victoriasEnemigo++
        }

        spanVidasJugador.innerHTML = "Victorias: " + victoriasJugador
        spanVidasEnemigo.innerHTML = "Victorias: " + victoriasEnemigo
        crearMensaje()
    }
    
    revisarVictorias()
    detenerJuego() 
}


function revisarVictorias() {

    if(victoriasJugador == victoriasEnemigo){
        crearMensajeGanador(3)
    }else if (victoriasJugador > victoriasEnemigo){
        crearMensajeGanador(2)
    }else{
        crearMensajeGanador(1)
    }
    
}

function crearMensaje(resultado) { 
    let parrafoAtaquesEnemigo = document.createElement('p')
    let parrafoAtaquesJugador = document.createElement('p')
    parrafoAtaquesEnemigo.innerHTML = indexAtaqueEnemigo
    parrafoAtaquesJugador.innerHTML = indexAtaqueJugador

    divAtaquesEnemigo.appendChild(parrafoAtaquesEnemigo)
    divAtaquesJugador.appendChild(parrafoAtaquesJugador)
}

function detenerJuego() {

    seccionReiniciarJuego.style.display = 'block'
    parrafoGanador.style.display = 'none'
}

function crearMensajeGanador(resultado) { 
    if (resultado == 1){
        parrafoResultado.innerHTML = 'Te quedaste sin vidas, has perdido! 😫'
        seccionMensajes.style.backgroundColor = 'crimson'
    } else if (resultado == 2) {
        parrafoResultado.innerHTML = 'El enemigo se ha quedado sin vidas, ganaste! 😁'
        seccionMensajes.style.backgroundColor = 'green'
    } else {
        parrafoResultado.innerHTML = 'Ambos jugadores obtuvieron las mismas victorias, esto es un empate!'
        seccionMensajes.style.backgroundColor = 'orange'
    }
}

function reiniciarJuego(){
    location.reload()
}

window.addEventListener('load', iniciarJuego)