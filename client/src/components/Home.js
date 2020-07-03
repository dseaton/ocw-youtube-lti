import React, { useEffect, useState } from 'react';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import searchService from '../core/services/SearchService';
import shortid from '../utils/shortid';
import VideoCard from './VideoCard';
import './Home.scss';

export default function Home() {
  const [query, setQuery ] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [videos, setVideos] = useState({});
  const [resultsMessage, setResultsMessage] = useState('');
  
  useEffect(() => {
    const loadVideos = async () => {
      setResultsMessage('');
      setIsLoading(true);
      setIsError(false);
      try {
        // Do not send a request for an empty string
        if (search) {
          const videos = await searchService.search(search);
          setVideos(videos);
          setResultsMessage(Object.keys(videos).length > 0 ?
            'Top 8 results from the OCW YouTube channel. Load more below.' :
            `Sorry, we didn’t find any results for "${search}" term.`
          );
        }
      } catch(error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    loadVideos();
  }, [search]);

  const inputChange = (event) => setQuery(event.currentTarget.value);
  

  const inputKeyUp = (event) => {
    // 'Enter' key code
    if (event.keyCode === 13) {
      setSearch(query);
    }
  }
  
  const buttonClick = () => setSearch(query);

  const videosEl = isLoading ? (
    <div>Loading...</div>
  ) : (
    Object.keys(videos).map((key) => (
      <VideoCard
        description={videos[key].description}
        duration={videos[key].duration}
        id={key}
        key={shortid()}
        thumbnail={videos[key].thumbnail}
        title={videos[key].title}
      />
    ))
  );
  
  return (
    <main className="home">
      <TextField
        className="home__search"
        placeholder="Find educational videos from across MIT"
        outlined
        value={query}
        onChange={inputChange}
        onKeyUp={inputKeyUp}
      />
      <Button label="Search" unelevated onClick={buttonClick}/>
      {isError && <div>Error...</div>}
      <div className="home__results-message">
        {resultsMessage}
      </div>
      {videosEl}
    </main>
  );
}
