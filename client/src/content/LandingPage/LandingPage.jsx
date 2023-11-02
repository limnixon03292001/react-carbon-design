import React from 'react';
import { Grid, Column } from '@carbon/react';
import MovieHero from '../../components/MovieHero/MovieHero';
import axios from 'axios';
import Playing from '../../components/NowPlayingMovies/Playing';
import ReactPlayer from 'react-player';
// import "./landing-page.scss"

const fetchLatestMovie = () => {
  return axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_KEY}`)
}
 
const fetchNowPlaying = ({pageParam = 1}) => {
  return axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${pageParam}` )
}


const fetchUpcoming = ({pageParam = 1}) => {
  return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${pageParam}` )
}

const trailId = "movie"
const type = "movie"
const LandingPage = () => {
  return (
      <Grid className="landing-page" fullWidth>
        <Column lg={16} md={8} sm={4} className="landing-page__banner">
          <MovieHero fetchFunction={fetchLatestMovie} keyWord="latest-movie" target={0} trailId={trailId}/>
        </Column>
        <Column lg={16} md={8} sm={4} className="landing-page__r2">
          <Playing keyWord='now-playing' fetchFunction={fetchNowPlaying} title='Now Playing Movies' trailId={trailId} idU="slider1Movie"
          type={type}/>
          <br />
          <Playing keyWord='top-rated' fetchFunction={fetchUpcoming} title='Top Rated' trailId={trailId} idU="slider2Movie"
          type={type}/>
        </Column>
        <br />
       
      </Grid>
  )
};

export default LandingPage;
