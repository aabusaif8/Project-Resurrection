import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MangaReader({ chapterId }) {
    const [pages, setPages] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                const response = await axios.get(`https://api.mangadex.org/chapter/${chapterId}`);
                const chapterData = response.data.data;
                // Extract page URLs based on the MangaDex API structure
                const imageUrls = chapterData.attributes.pages.map(page => `https://uploads.mangadex.org/data/${chapterData.relationships.find(r => r.type === 'manga').id}/${page}`);
                setPages(imageUrls);
            } catch (error) {
                console.error('Error fetching chapter:', error);
            }
        };

        fetchChapter();
    }, [chapterId]);

    const goToNextPage = () => {
        if (currentPageIndex < pages.length - 1) {
            setCurrentPageIndex(currentPageIndex + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPageIndex > 0) {
            setCurrentPageIndex(currentPageIndex - 1);
        }
    };

    return (
        <div>
            {pages.length > 0 && (
                <div>
                    <img src={pages[currentPageIndex]} alt={`Page ${currentPageIndex + 1}`} />
                    <div>
                        <button onClick={goToPreviousPage} disabled={currentPageIndex === 0}>Previous</button>
                        <button onClick={goToNextPage} disabled={currentPageIndex === pages.length - 1}>Next</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MangaReader;
