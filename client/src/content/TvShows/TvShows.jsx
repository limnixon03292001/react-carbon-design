import React from 'react'
import { Grid, Column } from '@carbon/react';
import MovieHero from '../../components/MovieHero/MovieHero';
import axios from 'axios';
import Playing from '../../components/NowPlayingMovies/Playing';

const fetchTopRated = () => {
    return axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`)
}

const fetchTopRatedTvShows = ({pageParam = 1}) => {
  return axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1` )
}

const fetchAiringTvShows = ({pageParam = 1}) => {
  return axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1` )
}

const trailId = "tv";

export default function TvShows() {
  return (
    <Grid className="landing-page" fullWidth>
        <Column lg={16} md={8} sm={4} className="landing-page__banner">
          <MovieHero fetchFunction={fetchTopRated} keyWord="top-rated" target={8} trailId={trailId} />
        </Column>
        <Column lg={16} md={8} sm={4} className="landing-page__r2">
          <Playing keyWord='top-rated-tv-shows' fetchFunction={fetchTopRatedTvShows} title='Top Rated' trailId="tv" idU="slider1TvShow"/>
          <br/>
          <Playing keyWord='airing-today-tv-shows' fetchFunction={fetchAiringTvShows} title='Airing Today' trailId="tv" idU="slider2TvShow"/>
        </Column>
        <Column lg={16} md={8} sm={4}>
        </Column>
    </Grid>
  )
}
