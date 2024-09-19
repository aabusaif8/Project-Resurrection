import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import FormatManga from "./FormatManga";

function ListManga() {
  const [mangaData, setMangaData] = useState([]);

  useEffect(() => {
    const fetchMangaData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/manga"); 
        setMangaData(response.data.data); // Assuming response.data.data is an array of manga objects
      } catch (error) {
        console.error("Error fetching manga data:", error);
      }
    };

    fetchMangaData();
  }, []);

  // Get the top 10 manga
  const topManga = mangaData.slice(0, 10);

  return (
    <div className="manga-list-container">
      {topManga.map((manga) => (
        <FormatManga 
          key={manga.manga_id} 
          manga={manga} // Pass the entire manga object
        />
      ))}
    </div>
  );
}

export default ListManga;