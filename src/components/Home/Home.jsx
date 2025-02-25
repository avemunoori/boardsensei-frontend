import React from "react"
import { Link } from "react-router-dom"
import { FaChess, FaQuestionCircle, FaTrophy } from "react-icons/fa"

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to BoardSensei</h1>
        <p className="text-xl mb-8">Master chess openings, take quizzes, and learn from grandmasters.</p>
        <div className="space-x-4">
          <Link to="/login" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
            Login
          </Link>
          <Link to="/register" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
            Register
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        {[
          { icon: FaChess, title: "Learn Openings", description: "Explore and master popular chess openings to improve your game." },
          { icon: FaQuestionCircle, title: "Take Quizzes", description: "Test your knowledge with interactive quizzes and track your progress." },
          { icon: FaTrophy, title: "Grandmaster Games", description: "Study games from top grandmasters and learn from the best." },
        ].map((feature, index) => (
          <div key={index} className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 text-center transform hover:scale-105 transition duration-300">
            <feature.icon className="text-5xl mb-4 mx-auto text-yellow-300" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home