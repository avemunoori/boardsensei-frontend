import React, { useState } from "react";
import axios from "axios";
import "./GrandmasterGames.css";

const GrandmasterGames = () => {
  const [grandmaster, setGrandmaster] = useState("magnuscarlsen");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

  const handleFetchGames = async () => {
    if (!month || !year) {
      setError("Please enter both month and year.");
      setGames([]);
      return;
    }
    setError("");

    try {
      const formattedMonth = month.toString().padStart(2, "0");
      const response = await axios.get(
        `https://api.chess.com/pub/player/${grandmaster}/games/${year}/${formattedMonth}`
      );

      const allGames = response.data.games || [];
      const fetchedGames = allGames.slice(0, 10);

      if (fetchedGames.length === 0) {
        setError(
          `No games found for ${grandmaster} in ${formattedMonth}/${year}. 
           Please try another month/year.`
        );
      }

      // Extract the actual strings from the objects
      const validGames = fetchedGames.map((game) => ({
        white: game.white?.username || "Unknown",
        black: game.black?.username || "Unknown",
        // Check if the API has an overall 'result' field or if it's stored in black/white sub-fields
        // For now, let's assume white.result or black.result:
        result: game.white?.result || game.black?.result || "Unknown",
        url: game.url || "#",
      }));

      setGames(validGames);
    } catch (err) {
      console.error("Error fetching GM games:", err);
      setError("Failed to fetch games. Please try again.");
      setGames([]); 
    }
  };

  return (
    <div className="grandmaster-games-container">
      <h1>Grandmaster Games</h1>
      {error && <p className="error-message">{error}</p>}

      <div className="input-section">
        <select
          value={grandmaster}
          onChange={(e) => setGrandmaster(e.target.value)}
          className="grandmaster-select"
        >
          <option value="magnuscarlsen">Magnus Carlsen</option>
          <option value="hikaru">Hikaru Nakamura</option>
          <option value="fabianocaruana">Fabiano Caruana</option>
        </select>

        <input
          type="number"
          placeholder="Year (e.g., 2023)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="number"
          placeholder="Month (01-12)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />

        <button onClick={handleFetchGames}>Fetch Games</button>
      </div>

      <div className="games-list">
        {games.length > 0 ? (
          games.map((game, index) => (
            <div key={index} className="game-card">
              <h3>
                {game.white} vs {game.black}
              </h3>
              <p>Result: {game.result}</p>
              <a href={game.url} target="_blank" rel="noopener noreferrer">
                View Game
              </a>
            </div>
          ))
        ) : (
          !error && <p>No games to display. Please enter a valid month and year.</p>
        )}
      </div>
    </div>
  );
};

export default GrandmasterGames;
