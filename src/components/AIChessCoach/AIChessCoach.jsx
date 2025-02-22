"use client"

import { useState } from "react"
import { Configuration, OpenAIApi } from "openai"
import "./AIChessCoach.css"

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const AIChessCoach = () => {
  const [userInput, setUserInput] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `You are an AI chess coach. The user asks: "${userInput}". Provide a helpful and insightful response.`,
        max_tokens: 150,
        temperature: 0.7,
      })

      setAiResponse(response.data.choices[0].text.trim())
    } catch (error) {
      console.error("Error generating AI response:", error)
      setAiResponse("Sorry, I encountered an error. Please try again.")
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

