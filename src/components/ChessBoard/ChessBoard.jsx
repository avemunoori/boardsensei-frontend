import React, { useState } from "react";
import { Chess } from "chess.js"; // Chess.js for logic
import { Chessboard } from "react-chessboard"; // React-chessboard for visualization
import "./ChessBoard.css";

const ChessBoard = ({ moves }) => {
  const [game, setGame] = useState(new Chess()); // Initialize a Chess instance
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  const handlePieceDrop = (sourceSquare, targetSquare) => {
    const gameCopy = new Chess(game.fen());
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // Always promote to a queen for simplicity
    });

    if (move) {
      setGame(gameCopy); // Update game state
      console.log(`Move made: ${sourceSquare} to ${targetSquare}`);
    } else {
      console.log("Invalid move");
    }
  };

  const handleNextMove = () => {
    if (currentMoveIndex < moves.length - 1) {
      const newMoveIndex = currentMoveIndex + 1;
      setCurrentMoveIndex(newMoveIndex);
      const newGame = new Chess();
      moves.slice(0, newMoveIndex + 1).forEach((move) => newGame.move(move));
      setGame(newGame);
    }
  };

  const handlePreviousMove = () => {
    if (currentMoveIndex > 0) {
      const newMoveIndex = currentMoveIndex - 1;
      setCurrentMoveIndex(newMoveIndex);
      const newGame = new Chess();
      moves.slice(0, newMoveIndex + 1).forEach((move) => newGame.move(move));
      setGame(newGame);
    }
  };

  return (
    <div className="chessboard-container">
      <div className="chessboard-wrapper">
        <Chessboard
          position={game.fen()} // Use the current FEN position
          onPieceDrop={(sourceSquare, targetSquare) =>
            handlePieceDrop(sourceSquare, targetSquare)
          }
          boardWidth={400}
        />
      </div>
      <div className="move-controls">
        <button onClick={handlePreviousMove} disabled={currentMoveIndex === 0}>
          Previous
        </button>
        <span className="current-move">
          Move: {moves[currentMoveIndex] || "Start"} ({currentMoveIndex + 1}/{moves.length})
        </span>
        <button
          onClick={handleNextMove}
          disabled={currentMoveIndex === moves.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ChessBoard;
