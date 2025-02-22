"use client"

import { useEffect, useRef, useState } from "react"
import { Chess } from "chess.js" // Chess.js for logic
import { Chessboard } from "react-chessboard" // React-chessboard for visualization
import "./ChessBoard.css"

const ChessBoard = ({ moves = [] }) => {
  const [game, setGame] = useState(new Chess()) // Initialize a Chess instance
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const autoPlayRef = useRef(null) // We'll store setInterval ID here

  // On component unmount, clear any running interval
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [])

  // Helper: Updates the game state to reflect moves up to currentMoveIndex
  const updateGameToCurrentIndex = (index) => {
    const newGame = new Chess()
    moves.slice(0, index + 1).forEach((move) => newGame.move(move))
    setGame(newGame)
  }

  // Handler: When a piece is dropped on the board
  const handlePieceDrop = (sourceSquare, targetSquare) => {
    // Only allow manual moves if not auto-playing
    if (autoPlay) return

    const gameCopy = new Chess(game.fen())
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // Always promote to a queen for simplicity
    })

    if (move) {
      setGame(gameCopy) // Update game state
      console.log(`Move made: ${move.san}`)
    } else {
      console.warn("Invalid move:", sourceSquare, "->", targetSquare)
    }
  }

  // Handler: Move to the next move in the array
  const handleNextMove = () => {
    if (currentMoveIndex < moves.length - 1) {
      const newMoveIndex = currentMoveIndex + 1
      setCurrentMoveIndex(newMoveIndex)
      updateGameToCurrentIndex(newMoveIndex)
    }
  }

  // Handler: Move to the previous move in the array
  const handlePreviousMove = () => {
    if (currentMoveIndex > 0) {
      const newMoveIndex = currentMoveIndex - 1
      setCurrentMoveIndex(newMoveIndex)
      updateGameToCurrentIndex(newMoveIndex)
    }
  }

  // Handler: Reset to start
  const handleReset = () => {
    setCurrentMoveIndex(0)
    const newGame = new Chess()
    setGame(newGame)
    setAutoPlay(false) // Stop auto-play if it was running
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
  }

  // Handler: Toggle auto-play (moves played every 1.5s, for example)
  const toggleAutoPlay = () => {
    if (autoPlay) {
      // Turn off auto-play
      setAutoPlay(false)
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
      return
    }

    // Turn on auto-play
    setAutoPlay(true)
    autoPlayRef.current = setInterval(() => {
      setCurrentMoveIndex((prevIndex) => {
        if (prevIndex < moves.length - 1) {
          const nextIndex = prevIndex + 1
          updateGameToCurrentIndex(nextIndex)
          return nextIndex
        } else {
          // Reached last move, stop auto-play
          clearInterval(autoPlayRef.current)
          setAutoPlay(false)
          return prevIndex
        }
      })
    }, 1500) // 1.5s per move (adjust as desired)
  }

  // If no moves array or empty, just show a default chessboard
  if (!moves || moves.length === 0) {
    return (
      <div className="chessboard-container">
        <h2>No moves available</h2>
        <div className="chessboard-wrapper">
          <Chessboard position={game.fen()} onPieceDrop={handlePieceDrop} boardWidth={400} />
        </div>
      </div>
    )
  }

  return (
    <div className="chessboard-container">
      <div className="chessboard-wrapper">
        <Chessboard position={game.fen()} onPieceDrop={handlePieceDrop} boardWidth={400} />
      </div>

      <div className="move-controls">
        <button onClick={handlePreviousMove} disabled={currentMoveIndex === 0}>
          Previous
        </button>

        <span className="current-move">
          Move: {moves[currentMoveIndex] || "Start"} ({currentMoveIndex + 1}/{moves.length})
        </span>

        <button onClick={handleNextMove} disabled={currentMoveIndex === moves.length - 1}>
          Next
        </button>
      </div>

      <div className="extra-controls">
        <button onClick={handleReset}>Reset</button>
        <button onClick={toggleAutoPlay}>{autoPlay ? "Stop Auto-Play" : "Start Auto-Play"}</button>
      </div>
    </div>
  )
}

export default ChessBoard

