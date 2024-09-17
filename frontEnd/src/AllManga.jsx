import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import FormatManga from "./Components/FormatManga";

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
    <div className="manga-list-container">
      {mangaData.map((manga) => (
        <FormatManga key={manga.manga_id} manga={manga} />
      ))}
    </div>
  );
}

export default ListManga;