// src/Components/FormatManga.jsx
import React from "react";
import { Link } from "react-router-dom"; // Corrected import

function FormatManga({ manga }) {
  return (
    <div className="manga-item">
      <p className="field-name">Manga Name : {manga.title}</p>
      <p className="field-name">Author Name : {manga.author}</p>
      <p className="field-name">Rating : {manga.rating}</p>
      <p className="field-name">Description : {manga.description}</p>
      <p className="field-value"></p>
      <Link to={`/${manga.manga_id}/info`} className="read-more-button">
        Read More
      </Link>
    </div>
  );
}

export default FormatManga;