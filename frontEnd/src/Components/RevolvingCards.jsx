import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper'; // Import necessary modules
import { useNavigate } from 'react-router-dom'; // Import useHistory
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import './CSS/RevolvingCards.css'; // Import your custom CSS

function RevolvingCardBelt() {
    const [mangaList, setMangaList] = useState([]);
    const navigate = useNavigate(); // Initialize useHistory

    useEffect(() => {
        const fetchManga = async () => {
            try {
                const response = await axios.get('http://localhost:8081/manga'); // Adjust the endpoint as needed
                console.log(response.data)
                setMangaList(response.data.data); // Assuming the response structure
            } catch (error) {
                console.error('Error fetching manga:', error);
            }
        };

        fetchManga();
    }, []);

    const handleCardClick = (mangaId) => {
        navigate(`/manga/${mangaId}`); // Navigate to the manga details page
    };

    return (
        <div className="revolving-card-belt-container">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]} // Include necessary modules
                spaceBetween={10} // Space between slides
                slidesPerView={5} // Adjust this based on your design
                navigation // Enable navigation buttons
                pagination={{ clickable: true }} // Enable pagination
                autoplay={{ delay: 3000, disableOnInteraction: false }} // Enable autoplay
                loop={true} // Enable looping
            >
                {mangaList.length > 0 ? (
                    mangaList.map((manga) => (
                        <SwiperSlide key={manga.id}>
                            <div className="carousel-card" onClick={() => handleCardClick(manga.id)}> {/* Handle click event */}
                                <h3>{manga.title}</h3>
                                <p>{manga.author}</p>
                                <p>Rating: {manga.rating}</p>
                                <p>{manga.description}</p>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <div className="carousel-card">Loading...</div>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
}

export default RevolvingCardBelt;