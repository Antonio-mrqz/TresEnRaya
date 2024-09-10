import { useState } from 'react'
import './App.css'
const TURNS = {
  X: "x",
  O: "o"
}

const Square = ({ children, isSelected, updateBoard, index }) =>{
  const className = `square ${isSelected ? 'is-selected' : ''}`
  
  const handleClick = ()=>{
    updateBoard(index)
  }

  return(
    <div className={className} onClick={handleClick}>
    {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  // Inicializamos el tablero vacio y el primer turno
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)

  // Variable para saber el ganador, null = no hay ganador, false = empate
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck)=>{
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
      setWinner(newWinner);
    }
    //To do: Check game over
  }
  return (
    <>
    <main className='board'>
      <h1>Tres en raya</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return(
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
               {board[index]}
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

      {
      winner != null && (
        <section className='winner'>
          <div className='text'>
            <h2>
              {
                winner == false 
                ? "Empate"
                : "Ganó: "
              }
            </h2>

            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button>Empezar de Nuevo</button>
            </footer>
          </div>
        </section>
      )
      }
    </main>
    </>
  )
}

export default App
