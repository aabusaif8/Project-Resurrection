import React from "react";
import { Link } from "react-router-dom";
import './CSS/MangaCard.css';
function FormatManga({ manga }) {
  return (
    <div className="manga-card">
      <h3 className="manga-title">{manga.title}</h3>
      <p className="manga-author">Author: {manga.author}</p>
      <p className="manga-rating">Rating: {manga.rating}</p>
      <p className="manga-description">{manga.description}</p>
      <Link to={`/${manga.manga_id}/info`} className="read-more-button">
        Read More
      </Link>
    </div>
  );
}

export default FormatManga;
