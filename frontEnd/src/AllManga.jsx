import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import FormatManga from "./Components/FormatManga"; // Import the FormatManga component
import NavBar from "./Components/NavBar"; // Import the NavBar component
import './Components/CSS/AllManga.css';
import './Components/CSS/NavBar.css'

function ListManga() {
  const [mangaData, setMangaData] = useState([]);

  useEffect(() => {
    const fetchMangaData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/manga");
        setMangaData(response.data.data);
      } catch (error) {
        console.error("Error fetching manga data:", error);
      }
    };

    fetchMangaData();
  }, []);

  return (
    <div>
      {/* NavBar is wrapped in a container to ensure proper centering */}
      <div className="nav-bar-container">
        <NavBar 
          onGenreSelect={() => console.log("Genre selection logic here")}
          onLetterSelect={() => console.log("Letter selection logic here")}
          onSortByPopularity={() => console.log("Sorting by popularity logic here")}
          onSortByReleaseDate={() => console.log("Sorting by release date logic here")}
        />
      </div>

      {/* Manga list container */}
      <div className="manga-list-container">
        <div className="manga-list">
          {mangaData.map((manga) => (
            <FormatManga key={manga.manga_id} manga={manga} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListManga;
