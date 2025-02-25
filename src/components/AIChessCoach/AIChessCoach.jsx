import React, { useState } from "react"
import axios from "axios"

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
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-yellow-400">AI Chess Coach</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask about chess strategy, openings, or famous games..."
          className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 mb-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Thinking..." : "Ask Coach"}
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {aiResponse && (
        <div className="bg-gray-800 rounded-md p-4">
          <h3 className="text-lg font-semibold mb-2 text-yellow-400">Coach's Response:</h3>
          <p className="text-white">{aiResponse}</p>
        </div>
      )}
    </div>
  )
}

export default AIChessCoach