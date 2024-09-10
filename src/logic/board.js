import { WINNER_COMBOS } from "../constantes"

export const checkWinner = (boardToCheck)=>{
    // Revisamos todas las combinaciones posibles para ganar
    for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if(
        boardToCheck[a] && // Comprueba si en la primera hay algo (x u o)
        boardToCheck[a] === boardToCheck[b] && // Comprueba que la primera es igual a la segunda
        boardToCheck[a] === boardToCheck[c]  // Comprueba que la primera es igual a la tercera
      ){
        return boardToCheck[a] // x u o
      }
    }
    // Si no hay ganador
    return null
}

export const checkEndGame = (boardToCheck)=>{
  //Revisamos si no hay mas espacios vacios en el tablero
  return boardToCheck.every((square) => square != null)
}