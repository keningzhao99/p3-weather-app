import React, { useState, useEffect } from 'react';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moreLoads, setMoreLoads] = useState(false);



  const API_KEY = 'ydz0BJbWlHYA10iNoPG62vAngAJi4sVF'
  useEffect(() => {
    fetchNews();
  }, []);


  const fetchNews = async () => {
    try {
      const response = await fetch(
        `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`
      );
      const data = await response.json();

      if (Array.isArray(data.results) && data.results.length > 0) {
        setNews(data.results);
        setLoading(false);
      } 
      else {
        setLoading(false);
      }

    } 
    catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
    }
  };


  const handleClick = () => {
    setMoreLoads(true);
  }

  return (
    <div>
      <h2>Top News Stories</h2>
      <button onClick={handleClick}>Load More</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {news.slice(0, 5).map((story) => (
            <li key={story.uri}>
              <h3>{story.title}</h3>
              <p>{story.byline}</p>
              <p>{story.abstract}</p>
              {story.media && story.media[0] && (
                <img src={story.media[0]['media-metadata'][0].url} alt={story.title} />
              )}
              <a href={story.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </li>
          ))}
        </ul>
      )}
      {!moreLoads ? (
        null
      ) : (
        <ul>
          {news.slice(5, 20).map((story) => (
            <li key={story.uri}>
              <h3>{story.title}</h3>
              <p>{story.byline}</p>
              <p>{story.abstract}</p>
              {story.media && story.media[0] && (
                <img src={story.media[0]['media-metadata'][0].url} alt={story.title} />
              )}
              <a href={story.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default News
