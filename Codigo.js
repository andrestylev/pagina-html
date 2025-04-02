    function aleatorio(min,max)  {
        return Math.floor(Math.random() * (max - min + 1) + min) }

    function eleccion(jugada) { 
    let resultado = ""
            if(jugada == 1) {
                resultado = " 🤛 Rock "
            } else if(jugada == 2) {
                resultado = " 🧻 Paper "
            } else if(jugada == 3) {
                resultado = " ✂ scissors" 
            } else { 
                alert("NULL0")
            }  
            return resultado  }  

    let nombre = ""
    nombre = prompt("cuál es tu nombre?")
    alert("Welcome " + nombre)

    let jugador = 0
    let pc = 0
    let triunfos = 0
    let perdidas = 0
    let Empates  = 0

while (triunfos < 3 && perdidas < 3)      {
        pc = aleatorio (1,3) 
        jugador = prompt("Elige: 1 para piedra, 2 para papel, 3 para tijera")
        //alert("Elegiste " + jugador)

        alert("pc elige: " + eleccion(pc))
        alert("Tu eliges: " + eleccion (jugador))

// Combate
    if (pc == jugador) {
                alert("EMPATE") 
                Empates = Empates + 1 
         }   else if(jugador == 1 && pc == 3) {
                alert("GANASTE")
                triunfos = triunfos + 1
        }   else if(jugador == 2 && pc == 1) {
                alert("GANASTE")
                triunfos = triunfos + 1
        }   else if(jugador == 3 && pc == 2) {
                alert("GANASTE")
                triunfos = triunfos + 1
        }    else                           {
                alert("PERDISTE")
                perdidas = perdidas + 1
            }
    } 
    
    alert("Ganaste " + triunfos + " veces. Perdiste " + perdidas + " veces. " + " Empaste " + Empates + " veces ")
         