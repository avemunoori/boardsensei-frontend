"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { FaLightbulb, FaSpinner } from "react-icons/fa"

const AIExplanation = ({ position, correctMove, userMove }) => {
  const [explanation, setExplanation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (userMove) {
      generateExplanation()
    }
  }, [userMove]) // Only userMove is needed here

  const generateExplanation = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a chess tutor. Provide brief, helpful explanations for chess positions and moves.",
            },
            {
              role: "user",
              content: `Chess position FEN: ${position}
              Correct move: ${correctMove}
              User's move: ${userMove.san}
              
              Explain why the correct move is good and if the user's move is different, explain why it might not be the best choice. Keep the explanation concise and friendly.`,
            },
          ],
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      )

      setExplanation(response.data.choices[0].message.content.trim())
    } catch (error) {
      console.error("Error generating AI explanation:", error)
      setError("Sorry, I couldn't generate an explanation at this time. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!userMove) return null

  return (
    <div className="ai-explanation">
      <h3>
        <FaLightbulb /> AI Insight
      </h3>
      {isLoading ? (
        <div className="loading">
          <FaSpinner className="spinner" />
          <span>Generating explanation...</span>
        </div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <p>{explanation}</p>
      )}
    </div>
  )
}

export default AIExplanation

