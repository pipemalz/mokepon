const botonElegir = document.getElementById('boton-elegir')
const botonReiniciar = document.getElementById('boton-reiniciar')
const botonesMover = document.querySelectorAll('.boton-mover')
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
const contenedorMapa = document.getElementById('contenedor-mapa')
const mapa = document.getElementById('mapa')
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
let intervalo

class Mokepon {
    constructor(nombre, foto, tipo){
        this.nombre = nombre
        this.foto = foto
        this.tipo = tipo
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

function crearMokepon(nombre, foto, tipo){
    let mokepon = new Mokepon(nombre, foto, tipo)
    mokepones.push(mokepon)
    asignarAtaques(mokepon)
}

function asignarAtaques(mokepon){

    let ataques = [
        {nombre: 'AGUA', id: 'boton-agua', icono: '💦'},
        {nombre: 'VIENTO', id: 'boton-viento', icono: '💨'},
        {nombre: 'TIERRA', id: 'boton-tierra', icono: '🌱'},
        {nombre: 'FUEGO', id: 'boton-fuego', icono: '🔥'}
    ]

        ataques.forEach(ataque=>{
            mokepon.ataques.push(
                {nombre: ataque.nombre, id: `boton-${ataque.nombre.toLocaleLowerCase()}`, icono: ataque.icono}
            )
            if(ataque.nombre == mokepon.tipo){
                mokepon.ataques.push(
                    {nombre: ataque.nombre, id: `boton-${ataque.nombre.toLocaleLowerCase()}`, icono: ataque.icono}
                )
            }
        })    

}

function iniciarJuego(){

    crearMokepon('hipodoge', './img/hipodoge.png', 'AGUA')
    crearMokepon('capipepo', './img/capipepo.png', 'TIERRA')
    crearMokepon('ratigueya', './img/ratigueya.png', 'FUEGO')
    crearMokepon('tucapalma', './img/tucapalma.png', 'VIENTO')
    crearMokepon('pydos', './img/pydos.png', 'TIERRA')
    crearMokepon('langostelvis', './img/langostelvis.png', 'AGUA')

    contenedorMapa.style.display = 'none'
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
            spanMascotaJugador.innerHTML = inputMascota[i].id
            mokepones.forEach(mokepon => {
                if(inputMascota[i].id == mokepon.nombre){
                    mascotaJugador = mokepon
                }
            })
            seleccionarMascotaEnemigo()
        } 
    }

    if(mascotaJugador == null){
        botonElegir.disabled = true
    }
    extraerAtaques()
    mostrarMapa()
}

function mostrarMapa(){

    contenedorMapa.style.display = 'flex'

    mapa.width = 800
    mapa.height = 600

    window.addEventListener('keydown', evento=>{
        if(evento.key == 'ArrowUp'){
            moverMokepon('y', -5)
        }else if(evento.key == 'ArrowDown'){
            moverMokepon('y', 5)
        }else if(evento.key == 'ArrowRight'){
            moverMokepon('x', 5)
        }else if(evento.key == 'ArrowLeft'){
            moverMokepon('x', -5)
        }
    })

    document.addEventListener('keyup', detenerMokepon)
      
    botonesMover.forEach(boton=>{
        boton.addEventListener('mousedown', (evento)=> {
            if (evento.target.id == 'boton-mover-derecha'){
                moverMokepon('x', 5)
            } else if (evento.target.id == 'boton-mover-izquierda'){
                moverMokepon('x', -5)
            } else if (evento.target.id == 'boton-mover-arriba'){
                moverMokepon('y', -5)
            } else if (evento.target.id == 'boton-mover-abajo'){
                moverMokepon('y', 5)
            }
        })
        boton.addEventListener('mouseup', detenerMokepon)
    })

    intervalo = setInterval(pintarCanvas, 50)
}

function moverMokepon(eje, pixels){
    if(eje == 'x'){
        mascotaJugador.velocidadX = pixels;
    }else if(eje == 'y'){
        mascotaJugador.velocidadY = pixels;
    }
}

function detenerMokepon(){
    mascotaJugador.velocidadX = 0
    mascotaJugador.velocidadY = 0
}

function pintarCanvas (){
    mascotaJugador.x += mascotaJugador.velocidadX
    mascotaJugador.y += mascotaJugador.velocidadY

    let mapaBackground = new Image()
    mapaBackground.src = './img/mapa.jpg'

    let lienzo = mapa.getContext('2d')

    lienzo.clearRect(0,0,mapa.width,mapa.height)
    
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    lienzo.drawImage(
        mascotaJugador.mapaFoto,
        mascotaJugador.x,
        mascotaJugador.y,
        mascotaJugador.ancho,
        mascotaJugador.alto
    )
}

function extraerAtaques(){
    ataquesMokeponJugador = mascotaJugador.ataques
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
    seccionSeleccionarMascota.style.display='none'
    // seccionSeleccionarAtaque.style.display='flex'
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
