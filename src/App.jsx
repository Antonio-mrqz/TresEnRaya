import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import  Square  from './components/Square'
import { TURNS } from './constantes'
import { checkWinner, checkEndGame } from './logic/board'
import WinnerModal from './components/WinnerModal.jsx'

function App() {
  // Inicializamos el tablero vacio y el primer turno
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  // Variable para saber el ganador, null = no hay ganador, false = empate
  const [winner, setWinner] = useState(null);

  const resetGame = ()=>{
    setWinner(null);
    setTurn(TURNS.X)
    setBoard(Array(9).fill(null))
  }

  const updateBoard = (index) =>{
    //Comprueba si hay algo ya en el cuadrado para no sobreescribir
    if (board[index] || winner) return;

    //Guardamos el nuevo tablero en una variable y modificamos el original
    const newBoard = [ ... board]
    newBoard[index] = turn
    setBoard(newBoard);
    

    //Cambiamos de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //Revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if(newWinner){
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)){
      setWinner(false) // empate
    }

  }
  return (
    <>
    <main className='board'>
      <h1>Tres en raya</h1>
      <button onClick={resetGame}>Reset del juego</button>
      
      <section className='game'>
        {
          board.map((square, index) => {
            return(
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
               {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>

    </main>
    </>
  )
}

export default App
