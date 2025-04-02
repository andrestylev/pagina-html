const BotonDragonPlayer = document.getElementById('boton-dragon')
const escogetuataque = document.getElementById('seleccionar-ataque')
const ocultarreinicio = document.getElementById('boton-reiniciar')
const botonreiniciar = document.getElementById('boton-reiniciar')

const escogedragon = document.getElementById('seleccionar-dragon')   
const spanPlayerDragon = document.getElementById('player-dragon')

const spanEnemyDragon = document.getElementById('enemy-dragon')

const spanplayerlifes = document.getElementById('player-lifes')
const spanenemylifes = document.getElementById('enemy-lifes')

const sectionmensajes = document.getElementById('resultado')
const ataquejugador = document.getElementById('ataque-jugador')
const ataqueenemigo = document.getElementById('ataque-enemigo')
const tarjetasContenedor = document.getElementById('tarjetasContenedor')
const ataquescontenedor = document.getElementById('ataques-contenedor')

const sectionShowMap = document.getElementById('show-map')
const map = document.getElementById('map')

let enemigoId = null
let jugadorId = null
let dragons = []
let dragonsEnemy = []
let dragonsoptions
let inputcaraxes
let inputsyrax
let inputvhagar
let playerDragon
let dragonObject
let dragonsAttacks
let playerAttack = []
let enemyattack = []
let BotonEscupirFuego
let BotonMordedura
let BotonGolpeGarras
let seleccpunch = []
let botones = []
let attackEnemyDragon
let indexPlayerAttack
let indexEnemyAttack
let victoryPlayer = 0
let victoryEnemy = 0
let EnemyLifes = 3
let PlayerLifes = 3
let lienzo = map.getContext("2d")
let intervalo
let backgroundMap = new Image()
backgroundMap.src = './Assets/kingslanding.jpg'
let alturaRequerida
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoMap = 800

if( anchoDelMapa > anchoMaximoMap) {
    anchoDelMapa = anchoMaximoMap - 20
}

alturaRequerida = anchoDelMapa * 550 / 800

map.width = anchoDelMapa
map.height = alturaRequerida


class TargaryensDragons{
    constructor(nombre, foto, vida, fotomap, id = null ) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 100
        this.alto = 100
        this.x = aleatorio(0, map.width - this.ancho)
        this.y = aleatorio(0, map.height - this.alto)
        this.mapFoto = new Image()
        this.mapFoto.src = fotomap
        this.velocidadX = 0
        this.velocidadY = 0       
    }

    paintDragon(){
        lienzo.drawImage(       
            this.mapFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        
        )
    }

}


let Caraxes = new TargaryensDragons('Caraxes', './Assets/Y2TGXWGRVFEEFJA6N3VSKMW5CM.jfif', 5, './Assets/download-removebg.png')

let Vhagar = new TargaryensDragons('Vhagar', './Assets/descarga.jfif', 5, './Assets/descarga-removebg.png')

let Syrax = new TargaryensDragons('Syrax', './Assets/syraxxxxxx.jfif', 5, './Assets/syraxxxxxx-removebg.png')


const CARAXES_ataques = [
    {nombre: 'Llamarada de fuego', id: 'boton-escupir-fuego'},
    {nombre: 'Llamarada de fuego', id: 'boton-escupir-fuego'},
    {nombre: 'Llamarada de fuego', id: 'boton-escupir-fuego'},
    {nombre: 'Golpe de Garras', id: 'boton-golpe-de-garras'},
    {nombre: 'Mordedura', id: 'boton-mordedura'},
]
Caraxes.ataques.push(...CARAXES_ataques)
 


const VHAGAR_ataques = [
    {nombre: 'Mordedura', id: 'boton-mordedura'},
    {nombre: 'Mordedura', id: 'boton-mordedura'},
    {nombre: 'Mordedura', id: 'boton-mordedura'},
    {nombre: 'Golpe de Garras', id: 'boton-golpe-de-garras'},
    {nombre: 'Llamarada de fuego', id: 'boton-escupir-fuego'},
]
Vhagar.ataques.push(...VHAGAR_ataques)



const SYRAX_ataques = [
    {nombre: 'Llamarada de fuego', id: 'boton-escupir-fuego'},
    {nombre: 'Llamarada de fuego', id: 'boton-escupir-fuego'},
    {nombre: 'Llamarada de fuego', id: 'boton-escupir-fuego'},
    {nombre: 'Golpe de Garras', id: 'boton-golpe-de-garras'},
    {nombre: 'Mordedura', id: 'boton-mordedura'}, 
]
Syrax.ataques.push(...SYRAX_ataques)



dragons.push(Caraxes,Vhagar,Syrax)

function IniciarEmparejamiento() {

    dragons.forEach((dragon) => {
        dragonsoptions = `
        <input type="radio"  name="dragon" id=${dragon.nombre} />
                    <label class="tarjeta-dragon" for=${dragon.nombre}> 
                         <p>${dragon.nombre}</p>
                         <img src=${dragon.foto} alt=${dragon.nombre}>
                    </label>
        `
       tarjetasContenedor.innerHTML += dragonsoptions

        inputcaraxes = document.getElementById('Caraxes')
        inputvhagar = document.getElementById('Vhagar')
        inputsyrax = document.getElementById('Syrax')

    })

     escogetuataque.style.display ='none'
     sectionShowMap.style.display = 'none'
     ocultarreinicio.style.display = 'none'

     BotonDragonPlayer.addEventListener('click' , ElegirDragonPlayer)
       
     botonreiniciar.addEventListener('click' , TryAgain)
    
    joinGame()
}

function joinGame(){
    fetch("http://192.168.1.5:8080/join")
        .then(function (res) {
            
            if (res.ok) {
                res.text()
                    .then(function (respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            } 

        })
}


function ElegirDragonPlayer() {
    
 
      

    

    if (inputcaraxes.checked) {       
        spanPlayerDragon.innerHTML = inputcaraxes.id
        playerDragon = inputcaraxes.id
    } else if (inputvhagar.checked) {
        spanPlayerDragon.innerHTML = inputvhagar.id
        playerDragon = inputvhagar.id
    } else if (inputsyrax.checked) {
        spanPlayerDragon.innerHTML = inputsyrax.id
        playerDragon = inputsyrax.id
    } else { 
        alert( "¡Elige un dragon!" ) 
        return
    } 
        escogedragon.style.display ='none'

        seleccionarDragon(playerDragon)
        sectionShowMap.style.display ='flex'
        iniciarMap()               
        extraerAtaques(playerDragon)  
              
}

function seleccionarDragon(playerDragon){
    fetch(`http://192.168.1.5:8080/dragon/${jugadorId}` , {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            dragon: playerDragon
        })
    })
}

function extraerAtaques(playerDragon){
    let ataques 
    for (let i=0; i<dragons.length;i++) {
        if (playerDragon==dragons[i].nombre) {
            ataques=dragons[i].ataques
        }
              
    }
showAttacks(ataques) 
}

function showAttacks(ataques){
      ataques.forEach((ataque) =>{
            dragonsAttacks= 
            `<button id=${ataque.id} class="boton-ataque punchSeleccion">${ataque.nombre}</button>`

            ataquescontenedor.innerHTML += dragonsAttacks

        })

            BotonEscupirFuego = document.getElementById('boton-escupir-fuego')
            BotonMordedura = document.getElementById('boton-mordedura')
            BotonGolpeGarras = document.getElementById('boton-golpe-de-garras')
            botones = document.querySelectorAll('.punchSeleccion')
                                  
}

function secuenciaDeAtaques() {
     botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === 'Llamarada de fuego') {                
                playerAttack.push('LLAMARADA DE FUEGO')
                console.log(playerAttack) 
                boton.style.background='#112f58'
                boton.disabled = true

         } else if (e.target.textContent==='Mordedura'){                 
                playerAttack.push('MORDEDURA')
                console.log(playerAttack)             
                boton.style.background='#112f58'
                boton.disabled = true
        }  else { 
                playerAttack.push('GOLPE DE GARRAS')  
                console.log(playerAttack)            
                boton.style.background='#112f58'
                boton.disabled = true
             }  
             //enemyramdomattack()

             if (playerAttack.length === 5){
                sendAttacks()
             }
             
        })
     })
     
}

function sendAttacks(){
    fetch(`http://192.168.1.5:8080/dragon/${jugadorId}/attacks`, {
        method: "post" ,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            attacks: playerAttack
        })
    })

    intervalo = setInterval(obtenerAttacks, 50)
}

function obtenerAttacks() {
    fetch(`http://192.168.1.5:8080/dragon/${enemigoId}/attacks`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({attacks}) {
                        if (attacks.length == 5) {
                            ataqueenemigo = attacks
                            combate()
                        }
                    })
            }
        })
}

function ElegirDragonPc(enemy) {
    let dragonAleatorio = aleatorio(0,dragons.length -1)

    spanEnemyDragon.innerHTML = enemy.nombre
    attackEnemyDragon = enemy.ataques
    secuenciaDeAtaques()
}



function enemyramdomattack(){
    let ramdomattack = aleatorio(0,attackEnemyDragon.length -1)

    if (ramdomattack == 0 || ramdomattack ==1){
        enemyattack.push('LLAMARADA DE FUEGO')
    } else if ( ramdomattack == 3 || ramdomattack == 4){
        enemyattack.push('MORDEDURA')
    } else {
        enemyattack.push('GOLPE DE GARRAS')
    }
    console.log(enemyattack)
    peleaIniciar()
}

function peleaIniciar(){
    if (playerAttack.length === 5) {
        combate()
    }
}

function indexBothOponents(player, enemy) {
    indexPlayerAttack = playerAttack[player]
    indexEnemyAttack = enemyattack[enemy]
}

function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < playerAttack.length; index++) {
        if(playerAttack[index] === enemyattack[index]) {
            indexBothOponents(index, index)
            crearmensaje("CON RASGUÑOS AL IGUAL QUE EL DEL ENEMIGO")   
                    
        } else if (playerAttack[index] === 'LLAMARADA DE FUEGO' && enemyattack[index] === 'MORDEDURA') {
            indexBothOponents(index, index)
            crearmensaje("VICTORIOSO")
            victoryPlayer ++
            spanplayerlifes.innerHTML = victoryPlayer
        } else if (playerAttack[index] === 'MORDEDURA' && enemyattack[index] === 'GOLPE DE GARRAS') {
            indexBothOponents(index, index)
            crearmensaje("VICTORIOSO")
            victoryPlayer ++
            spanplayerlifes.innerHTML = victoryPlayer
        } else if (playerAttack[index] === 'GOLPE DE GARRAS' && enemyattack[index] === 'LLAMARADA DE FUEGO') {
            indexBothOponents(index, index)
            crearmensaje("VICTORIOSO")
            victoryPlayer ++
            spanplayerlifes.innerHTML = victoryPlayer
        } else {
            indexBothOponents(index, index)
            crearmensaje("DERROTADO")
            victoryEnemy ++
            spanenemylifes.innerHTML = victoryEnemy
        }
    }

        lifescheck()

}

function lifescheck(){
    
    if(victoryPlayer === victoryEnemy ){
        endgame("¡NINGUNO DE LOS DRAGONES HA TRIUNFADO")
    }
    else if (victoryPlayer > victoryEnemy){
       endgame("¡ERES EL VENCEDOR!" )
    } else {
        endgame("¡HAS SIDO DERROTADO!")
    }   
}

function endgame(resultadofinal) {
    
     ocultarreinicio.style.display = 'block'   
    
    sectionmensajes.innerHTML = resultadofinal   

}    


function crearmensaje(resultado) {
    
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')   

    sectionmensajes.innerHTML =  resultado
    nuevoAtaqueJugador.innerHTML = indexPlayerAttack
    nuevoAtaqueEnemigo.innerHTML = indexEnemyAttack

    //let parrafo = document.createElement('p')
    //parrafo.innerHTML = 'tu dragon atacó con ' + playerAttack + ', el dragon de enemigo ataco con ' + enemyattack +  '. Tu dragon salió  !' + resultado   + '¡.'

    
    ataquejugador.appendChild(nuevoAtaqueJugador)
    ataqueenemigo.appendChild(nuevoAtaqueEnemigo)
}    

function canvasPaint() {
    dragonObject.x = dragonObject.x + dragonObject.velocidadX
    dragonObject.y = dragonObject.y + dragonObject.velocidadY
    lienzo.clearRect(0, 0, map.width, map.height) 
    lienzo.drawImage(
        backgroundMap,
        0,
        0,
        map.width,
        map.height
    )
        dragonObject.paintDragon()

        sendPosition(dragonObject.x, dragonObject.y)

        dragonsEnemy.forEach(function (dragons) {
            dragons.paintDragon()
            revisarCollisions(dragons)
        })    
}

function sendPosition(x, y){
    fetch(`http://192.168.1.5:8080/dragon/${jugadorId}/position`,{
        method:"post" ,
        headers: {
            "content-Type": "application/json" 
        },
        body: JSON.stringify({
            x,
            y
        })
        
    })

    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({enemigos}) {
                    console.log(enemigos)
                    
                    dragonsEnemy = enemigos.map(function (enemigo) {
                        let dragonEnemy = null
                        const dragonNombre = enemigo.dragon.nombre || []
                        if (dragonNombre === "Caraxes"){
                            dragonEnemy = new TargaryensDragons('Caraxes', './Assets/Y2TGXWGRVFEEFJA6N3VSKMW5CM.jfif', 5, './Assets/download-removebg.png', enemigo.id)
                        }else if (dragonNombre === "Vhagar") {
                            dragonEnemy = new TargaryensDragons('Vhagar', './Assets/descarga.jfif', 5, './Assets/descarga-removebg.png', enemigo.id)
                        }else if (dragonNombre === "Syrax") {
                            dragonEnemy = new TargaryensDragons('Syrax', './Assets/syraxxxxxx.jfif', 5, './Assets/syraxxxxxx-removebg.png', enemigo.id)
                        }               

                            dragonEnemy.x = enemigo.x
                            dragonEnemy.y = enemigo.y
                            
                        return dragonEnemy
                    })                   
                })
        }
    })

}

function moveRight() {
    dragonObject.velocidadX = +5
}
function moveLeft() {
    dragonObject.velocidadX = - 5
}
function moveUp() {
    dragonObject.velocidadY = -5
}
function moveDown() {
    dragonObject.velocidadY = + 5
}

function presionTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp()
            break
        case 'w':
            moveUp()
            break;
        case 'ArrowDown':
            moveDown()
            break
        case 's':
            moveDown()
            break;
        case 'ArrowRight':
            moveRight()
            break
        case 'd':
            moveRight()
            break;   
        case 'ArrowLeft' :
            moveLeft()            
        case 'a':
            moveLeft()
            break;
        default:
            break;
    }
}

function iniciarMap() {  
    dragonObject = obtenerObjectDragon(playerDragon)
    intervalo = setInterval(canvasPaint, 50)

    window.addEventListener('keydown', presionTecla)

    window.addEventListener('keyup', detenerMoviento)
}

function obtenerObjectDragon(){
    for (let i=0; i<dragons.length;i++) {
        if (playerDragon==dragons[i].nombre) {
            return dragons[i]
        }
              
    }
}

function revisarCollisions(enemy) {
    const arribaEnemy = enemy.y
    const abajoEnemy = enemy.y + enemy.alto
    const derechaEnemy = enemy.x + enemy.ancho
    const izquiedaEnemy = enemy.x 

    const arribaDragon = dragonObject.y
    const abajoDragon = dragonObject.y + dragonObject.alto
    const derechaDragon = dragonObject.x + dragonObject.ancho
    const izquierdaDragon = dragonObject.x 

    if(
        abajoDragon < arribaEnemy ||
        arribaDragon > abajoEnemy ||
        derechaDragon < izquiedaEnemy ||
        izquierdaDragon > derechaEnemy
    ) {
        return
    }

    if (enemy.x == undefined || enemy.y == undefined){
        return
    }

    detenerMoviento()
    clearInterval(intervalo)
    console.log('se detecto');

    enemigoId = enemy.id
    escogetuataque.style.display ='flex'
    sectionShowMap.style.display = 'none'
    ElegirDragonPc(enemy)
}


function detenerMoviento(){   
    dragonObject.velocidadX = 0
    dragonObject.velocidadY = 0
}

function TryAgain() {
    location.reload()
}

function aleatorio(min,max)  {
    return Math.floor(Math.random() * (max - min + 1) + min) 
}

window.addEventListener('load' , IniciarEmparejamiento)