"use client"

import { useState } from "react"
import axios from "axios"
import "./AIChessCoach.css"

const AIChessCoach = () => {
  const [userInput, setUserInput] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setAiResponse("")

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY
    if (!apiKey) {
      setError("OpenAI API key not found. Please check your environment variables.")
      setIsLoading(false)
      return
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are an AI chess coach, providing helpful and insightful responses to chess-related questions. Your knowledge spans opening theory, middlegame tactics, endgame techniques, and general chess strategy."
            },
            {
              role: "user",
              content: userInput
            }
          ],
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      )

      const aiResponseText = response.data.choices[0]?.message?.content
      if (!aiResponseText) {
        throw new Error("No response received from OpenAI")
      }
      setAiResponse(aiResponseText.trim())
    } catch (error) {
      console.error("Error generating AI response:", error)
      setError(`Failed to get a response. ${error.response?.data?.error?.message || error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="ai-coach-container">
      <h2>AI Chess Coach</h2>
      <form onSubmit={handleSubmit} className="ai-coach-form">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask about chess strategy, openings, or famous games..."
          className="ai-coach-input"
        />
        <button type="submit" className="ai-coach-button" disabled={isLoading}>
          {isLoading ? "Thinking..." : "Ask Coach"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {aiResponse && (
        <div className="ai-coach-response">
          <h3>Coach's Response:</h3>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  )
}

export default AIChessCoach