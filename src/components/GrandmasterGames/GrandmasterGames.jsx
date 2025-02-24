"use client"

import { useState } from "react"
import axios from "axios"
import { Chess } from "chess.js"
import { Chessboard } from "react-chessboard"
import { FaChess, FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from "react-icons/fa"
import { Configuration, OpenAIApi } from "openai"
import "./GrandmasterGames.css"

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const GrandmasterGames = () => {
  const [grandmaster, setGrandmaster] = useState("magnuscarlsen")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [games, setGames] = useState([])
  const [selectedGame, setSelectedGame] = useState(null)
  const [currentPosition, setCurrentPosition] = useState(new Chess())
  const [moveIndex, setMoveIndex] = useState(0)
  const [moves, setMoves] = useState([])
  const [analysis, setAnalysis] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)

  const handleFetchGames = async () => {
    if (!month || !year) {
      setError("Please enter both month and year.")
      setGames([])
      return
    }
    setError("")
    setLoading(true)

    try {
      const formattedMonth = month.toString().padStart(2, "0")
      const response = await axios.get(
        `https://api.chess.com/pub/player/${grandmaster}/games/${year}/${formattedMonth}`,
      )

      const allGames = response.data.games || []
      const fetchedGames = allGames.slice(0, 10).map((game) => ({
        white: game.white.username,
        black: game.black.username,
        result: game.white.result,
        url: game.url,
        pgn: game.pgn,
        timeControl: game.time_control,
        rated: game.rated,
        timestamp: game.end_time,
      }))

      setGames(fetchedGames)
      if (fetchedGames.length > 0) {
        handleSelectGame(fetchedGames[0])
      }
    } catch (err) {
      console.error("Error fetching GM games:", err)
      setError("Failed to fetch games. Please try again.")
      setGames([])
    } finally {
      setLoading(false)
    }
  }

  const handleSelectGame = (game) => {
    setSelectedGame(game)
    const chess = new Chess()
    chess.loadPgn(game.pgn)
    setCurrentPosition(chess)
    setMoveIndex(0)
    setAnalysis("")
    // Extract moves from PGN
    const moves = chess.history()
    setMoves(moves)
  }

  const handleNextMove = () => {
    if (!selectedGame || moveIndex >= moves.length) return
    
    const chess = new Chess()
    chess.loadPgn(selectedGame.pgn)
    const gameMoves = chess.history()
    
    if (moveIndex < gameMoves.length) {
      const newChess = new Chess()
      for (let i = 0; i <= moveIndex; i++) {
        newChess.move(gameMoves[i])
      }
      setCurrentPosition(newChess)
      setMoveIndex(moveIndex + 1)
    }
  }

  const handlePrevMove = () => {
    if (!selectedGame || moveIndex === 0) return
    
    const chess = new Chess()
    chess.loadPgn(selectedGame.pgn)
    const gameMoves = chess.history()
    
    const newChess = new Chess()
    for (let i = 0; i < moveIndex - 1; i++) {
      newChess.move(gameMoves[i])
    }
    setCurrentPosition(newChess)
    setMoveIndex(moveIndex - 1)
  }

  const handleViewOnChessCom = () => {
    if (selectedGame && selectedGame.url) {
      window.open(selectedGame.url, '_blank')
    }
  }

  const analyzePosition = async () => {
    if (!selectedGame) return
    setAnalyzing(true)

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `Analyze this chess position and the current game state. Provide strategic insights and key ideas:
                Position FEN: ${currentPosition.fen()}
                Game PGN: ${selectedGame.pgn}
                Current Move: ${moveIndex}`,
        max_tokens: 150,
        temperature: 0.7,
      })

      setAnalysis(response.data.choices[0].text.trim())
    } catch (error) {
      console.error("Error analyzing position:", error)
      setAnalysis("Failed to analyze position. Please try again.")
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="grandmaster-games-container">
      <h1>Grandmaster Games Analysis</h1>

      <div className="search-controls">
        <select value={grandmaster} onChange={(e) => setGrandmaster(e.target.value)} className="grandmaster-select">
          <option value="magnuscarlsen">Magnus Carlsen</option>
          <option value="hikaru">Hikaru Nakamura</option>
          <option value="fabianocaruana">Fabiano Caruana</option>
          <option value="alireza">Alireza Firouzja</option>
          <option value="dommarajuraj">D. Gukesh</option>
        </select>
        <input
          type="number"
          placeholder="Year (e.g., 2024)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="year-input"
        />
        <input
          type="number"
          placeholder="Month (1-12)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          min="1"
          max="12"
          className="month-input"
        />
        <button onClick={handleFetchGames} disabled={loading} className="fetch-button">
          {loading ? "Fetching..." : "Fetch Games"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="game-analysis-container">
        <div className="games-list">
          {games.map((game, index) => (
            <div
              key={index}
              className={`game-item ${selectedGame === game ? "selected" : ""}`}
              onClick={() => handleSelectGame(game)}
            >
              <FaChess className="game-icon" />
              <div className="game-info">
                <h3>
                  {game.white} vs {game.black}
                </h3>
                <p>Result: {game.result}</p>
                <p className="game-date">{new Date(game.timestamp * 1000).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedGame && (
          <div className="game-display">
            <div className="chessboard-container">
              <Chessboard position={currentPosition.fen()} boardWidth={400} />
              <div className="move-controls">
                <button onClick={handlePrevMove} disabled={moveIndex === 0}>
                  <FaArrowLeft /> Previous
                </button>
                <span className="move-indicator">Move {moveIndex}</span>
                <button onClick={handleNextMove} disabled={moveIndex === moves.length}>
                  Next <FaArrowRight />
                </button>
              </div>
              <div className="game-actions">
                <button onClick={analyzePosition} disabled={analyzing} className="analyze-button">
                  {analyzing ? "Analyzing..." : "Analyze Position"}
                </button>
                <button onClick={handleViewOnChessCom} className="chess-com-button">
                  View on Chess.com <FaExternalLinkAlt />
                </button>
              </div>
            </div>

            {analysis && (
              <div className="analysis-container">
                <h3>AI Analysis</h3>
                <p>{analysis}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default GrandmasterGames