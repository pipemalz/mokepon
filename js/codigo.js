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
const tamanoInicial = 75
const mapaInicial = {
    alto: 600,
    ancho: 800
}
let mokepones = []
let mascotaJugador = null
let mascotaEnemigo
let mokeponesEnemigos = []
let mokeponesJugador = []
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
let lienzo = mapa.getContext('2d')
let intervalo
let posicionMascotaJugador

class Mokepon {
    constructor(nombre, foto, tipo, mapaFoto, x= 5, y = 80){
        this.nombre = nombre
        this.foto = foto
        this.tipo = tipo
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho = tamanoInicial
        this.alto = tamanoInicial
        this.mapaFoto = new Image()
        this.mapaFoto.src = mapaFoto
        this.velocidadX = 0
        this.velocidadY = 0 
        this.arriba
        this.abajo
        this.derecha
        this.izquierda
    }

    pintarMokepon(){   
        this.ancho = (tamanoInicial * mapa.width)/mapaInicial.ancho
        this.alto = (tamanoInicial * mapa.width)/mapaInicial.ancho 
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

function crearMokeponJugador(nombre, foto, tipo, mapaFoto){
    let mokepon = new Mokepon(nombre, foto, tipo, mapaFoto)
    mokeponesJugador.push(mokepon)
    asignarAtaques(mokepon)
}

function crearMokeponEnemigo(nombre, foto, tipo, mapaFoto) {
    let mokepon = new Mokepon(nombre, foto, tipo, mapaFoto)
    mokeponesEnemigos.push(mokepon)
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

    crearMokeponJugador('hipodoge', './img/hipodoge.png', 'AGUA', './img/hipodoge-head.png')
    crearMokeponJugador('capipepo', './img/capipepo.png', 'TIERRA', './img/capipepo-head.png')
    crearMokeponJugador('ratigueya', './img/ratigueya.png', 'FUEGO', './img/ratigueya-head.png')
    crearMokeponJugador('tucapalma', './img/tucapalma.png', 'VIENTO', './img/tucapalma.png')
    crearMokeponJugador('pydos', './img/pydos.png', 'TIERRA', './img/pydos.png')
    crearMokeponJugador('langostelvis', './img/langostelvis.png', 'AGUA', './img/langostelvis.png')

    crearMokeponEnemigo('hipodoge', './img/hipodoge.png', 'AGUA', './img/hipodoge-head.png')
    crearMokeponEnemigo('capipepo', './img/capipepo.png', 'TIERRA', './img/capipepo-head.png')
    crearMokeponEnemigo('ratigueya', './img/ratigueya.png', 'FUEGO', './img/ratigueya-head.png')
    
    contenedorMapa.style.display = 'none'
    seccionSeleccionarAtaque.style.display='none'
    seccionReiniciarJuego.style.display='none'
    seccionMensajes.style.display='none'

    mokeponesJugador.forEach((mokepon) => {
        opcionDeMokepones = `
            <input type="radio" name="mascota" id="${mokepon.nombre}" />
            <label class="tarjeta-mokepon" for="${mokepon.nombre}" />
                <p>${mokepon.nombre}</p>
                <img src="${mokepon.foto}" alt="${mokepon.nombre}" id="img-${mokepon.nombre}" />
            </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
    })

    inputMascota = document.getElementsByName('mascota')
    
    botonElegir.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {

    for (let i = 0; i < inputMascota.length; i++) {
        if(inputMascota[i].checked){
            spanMascotaJugador.innerHTML = inputMascota[i].id
            mokeponesJugador.forEach(mokepon => {
                if(inputMascota[i].id == mokepon.nombre){
                    mascotaJugador = mokepon
                }
            })
            seccionSeleccionarMascota.style.display='none'
        } 
    }

    if(mascotaJugador == null){
        botonElegir.disabled = true
    }
    extraerAtaques()
    mostrarMapa()
}

function calcularBordes(mokepon){
        mokepon.arriba = mokepon.y
        mokepon.abajo = mokepon.y + mokepon.alto
        mokepon.izquierda = mokepon.x
        mokepon.derecha = mokepon.x + mokepon.alto
}

function recalcularMapa(){
    if(window.innerWidth < 880){
        mapa.width = window.innerWidth-80
        mapa.height = (mapa.width*mapaInicial.alto)/mapaInicial.ancho
    }
}

function colisionEnemiga(mokeponesEnemigos){

    for (let i = 0; i < mokeponesEnemigos.length; i++) {
        if(
            mokeponesEnemigos[i].arriba > mokeponesEnemigos[i+1].abajo || 
            mokeponesEnemigos[i].abajo < mokeponesEnemigos[i+1].arriba ||
            mokeponesEnemigos[i].derecha < mokeponesEnemigos[i+1].izquierda ||
            mokeponesEnemigos[i].izquierda > mokeponesEnemigos[i+1].derecha ||
            mokeponesEnemigos[i].arriba > mokeponesEnemigos[i-1].abajo || 
            mokeponesEnemigos[i].abajo < mokeponesEnemigos[i-1].arriba ||
            mokeponesEnemigos[i].derecha < mokeponesEnemigos[i-1].izquierda ||
            mokeponesEnemigos[i].izquierda > mokeponesEnemigos[i-1].derecha
        ){
            return false
        }else{
           return true
        }
        
    }
}

function mostrarMapa(){
 
    mapa.width = mapaInicial.ancho
    mapa.height = mapaInicial.alto

    recalcularMapa()

    mokeponesEnemigos.forEach(mokepon=>{
        mokepon.x = numeroRandom(mokepon.ancho + 10, (mapa.width - mokepon.ancho))
        mokepon.y = numeroRandom(0, (mapa.height - mokepon.alto))
        calcularBordes(mokepon)
    })

    while (colisionEnemiga(mokeponesEnemigos)){
        mokeponesEnemigos.forEach(mokepon=>{
            mokepon.x = numeroRandom(mokepon.ancho + 10, (mapa.width - mokepon.ancho))
            mokepon.y = numeroRandom(0, (mapa.height - mokepon.alto))
            calcularBordes(mokepon)
        })
    }
    
    contenedorMapa.style.display = 'flex'
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

function detectarColision(){

    calcularBordes(mascotaJugador)

    mokeponesEnemigos.forEach( mokepon => {
        calcularBordes(mokepon)
        if(
            mascotaJugador.arriba > mokepon.abajo || 
            mascotaJugador.abajo < mokepon.arriba ||
            mascotaJugador.derecha < mokepon.izquierda ||
            mascotaJugador.izquierda > mokepon.derecha
        ){
            return
        }else{
            detenerMokepon()
            clearInterval(intervalo)
            alert(`Te encontraste con ${mokepon.nombre}!!!`)
            seccionSeleccionarAtaque.style.display='flex'
            contenedorMapa.style.display='none'
            seleccionarMascotaEnemigo(mokepon)
        }
    })

    if(mascotaJugador.arriba < 1){
        mascotaJugador.y = 0
    }
    if(mascotaJugador.izquierda < 1){
        mascotaJugador.x = 0
    }
    if(mascotaJugador.abajo > mapa.height){
        mascotaJugador.y = mapa.height - mascotaJugador.alto
    }
    if(mascotaJugador.derecha > mapa.width){
        mascotaJugador.x = mapa.width - mascotaJugador.ancho
    }

}


function pintarCanvas (){

    recalcularMapa()
    mascotaJugador.x += mascotaJugador.velocidadX
    mascotaJugador.y += mascotaJugador.velocidadY

    let mapaBackground = new Image()
    mapaBackground.src = './img/mapa.jpg'

    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mokeponesEnemigos.forEach(mokeponEnemigo =>   
        mokeponEnemigo.pintarMokepon()
    )
    mascotaJugador.pintarMokepon()

    if(mascotaJugador.velocidadX !== 0 || mascotaJugador.velocidadY !==0){
        detectarColision()
    }
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

function seleccionarMascotaEnemigo(mokponEnemigo){
    spanMascotaEnemigo.innerHTML = mokponEnemigo.nombre  
    ataquesMokeponEnemigo = mokponEnemigo.ataques
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