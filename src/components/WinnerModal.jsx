import React from 'react'
import Square from './Square';

const Winner = ({winner, resetGame}) => {
  if (winner == null) return null;

  return (
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
              <button onClick={resetGame}>Empezar de Nuevo</button>
            </footer>
          </div>
    </section>
  )
}

export default Winner