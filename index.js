const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.static("public"))
app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador {
    constructor(Id) {
        this.Id = Id
        this.x = 0;
        this.y = 0;
        this.dragon = null;
        this.attacks = [];
    }
    asignarDragon(dragon) {
        this.dragon = dragon
    }

    positionRefresh(x, y){
        this.x = x 
        this.y = y
    }
    asignarAttacks(attacks) {
        this.attacks = attacks
}

}



class Dragon{
    constructor(nombre){
        this.nombre = nombre
    }
}

app.get("/join", (req, res) =>{
    const Id = `${Math.random()}`

    const jugador = new Jugador(Id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(Id)
})

app.post("/dragon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.dragon || ""
    const dragon = new Dragon(nombre)
    
    const playerIndex = jugadores.findIndex((jugador) => jugadorId === jugador.Id)
    
    if(playerIndex >= 0) {
        jugadores[playerIndex].asignarDragon(dragon)
    } else {
        console.log("Error: jugador no encontrado para asignar dragón.");
     }
    
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/dragon/:jugadorId/position" , (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const playerIndex = jugadores.findIndex((jugador) => jugadorId === jugador.Id)
    
    if(playerIndex >= 0) {
        jugadores[playerIndex].positionRefresh(x, y)
    }

    const enemigos = jugadores.filter((jugador) =>  jugadorId  !== jugador.Id);

    res.send({
        enemigos
    })
})

app.post("/dragon/:jugadorId/attacks", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const attacks = req.body.attacks || []
    
    const playerIndex = jugadores.findIndex((jugador) => jugadorId === jugador.Id)
    
    if(playerIndex >= 0) {
        jugadores[playerIndex].asignarAttacks(attacks)
    }
    
    res.end()
})

app.get("/dragon/:jugadorId/attacks", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugador.Id === jugadorId)
    res.send({
        attacks:jugador.attacks || [] 
    }) 
})

app.listen(8080, () => {
    console.log("Server Funcionando")
})