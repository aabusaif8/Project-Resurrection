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

  return (
    <div>
      <div className="manga-list-container">
        {mangaData.map((manga) => (
          <FormatManga 
            key={manga.manga_id} 
            manga={manga} // Pass the entire manga object
          />
        ))}
      </div>
    </div>
  );
}

export default ListManga;