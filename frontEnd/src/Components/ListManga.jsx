import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import FormatManga from "./FormatManga";

function ListManga() {
  const [mangaData, setMangaData] = useState([]);

  useEffect(() => {
    const fetchMangaData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/dashboard"); // Update the URL to your API endpoint
        setMangaData(response.data.data); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error fetching manga data:", error);
      }
    };

    fetchMangaData();
  }, []);
  return (
    <div className="manga-list-container">
      {mangaData.map((manga) => (
        <FormatManga key={manga.manga_id} manga={manga} />
      ))}
    </div>
  );
}

export default ListManga;