import React, { useEffect, memo, useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import LinesEllipsis from 'react-lines-ellipsis'
import { Button, Loading } from '@carbon/react'
import { Add, TrashCan } from '@carbon/icons-react';
import { api } from '../../utils/axios-config';
import decode from 'jwt-decode';
import WatchTrailerButton from '../MovieHero/WatchTrailerButton'
import { useLocation } from 'react-router-dom'

const saveMyList = async (data) => {
  return await api.post(`/netflix/save-my-list`, { data } );
}

const checkIfListed = async ({ queryKey }) => {
  const movieId =  queryKey[1];
  const email = queryKey[2];
  return await api.get(`/netflix/checkListed?email=${email}&movieId=${movieId}`);
}

const deleteFromList = async (data) => {
  return await api.delete(`/netflix/deleteList`, { data });
}

const MovieHero = ({ fetchFunction, keyWord, target, trailId }) => {
    const decodedToken = decode(localStorage.token);
    const [ stamp, setStamp ] = useState(0);
    const [timex, setTimex] = useState();
    const [isListed, setIsListed] = useState(false);
    const location = useLocation();

    const { isLoading, data } = useQuery([keyWord], fetchFunction);
    const { data: listed, isLoading: isLoadingListed } = useQuery(['listed', data?.data?.results[target]?.id, decodedToken?.email], checkIfListed, {
      onSuccess: ((data) => {
        setIsListed(data?.data)
      })
    });
    const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation(deleteFromList, {
      onSuccess: (() => {
        setIsListed(false)
      })
    })
    const { mutate, isLoading: isLoadingSave } = useMutation(saveMyList, {
      onSuccess: (() => {
        setIsListed(true)
      })
    })

    const savex = async () => {
        if(timex === undefined) {
          return;
        } else {
          try {
            await api.post("/netflix/save", {
              email: decodedToken?.email,
              movieId: timex?.movieId.toString(),
              timestamp: Math.round(timex?.stamp)
          })
            setTimex()
          } catch (error) {
            console.log(error)
          } 
        }
      }
  
    useEffect(() => {
    
      savex()
    
      return () => {
        setTimex()
      }
    },[stamp]);

  return (
    <div className='hero_banner'
    style={{ 
        background: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${
        data?.data?.results[target]?.backdrop_path})`,
    }}>
      {/* {console.log("moviehero", data?.data?.results[target])} */}
        <div className='hero_content' aria-label='hero-content'>
            <h1 className='hero_content_heading'>{data?.data?.results[target]?.title ?? data?.data?.results[target]?.name}</h1>
            <p className='hero_content_summary'>
                {/* <LinesEllipsis
                text={}
                maxLine='4'
                ellipsis='...'
                trimRight
                basedOn='letters'
                /> */}
                { data?.data?.results[target].overview }
            </p>
            <div style={{display: 'flex',   gap: '0.5rem', width: '100%', maxWidth: '190px'}}>
               
                <WatchTrailerButton mData={data?.data?.results[target]} trailId={trailId} stamp={setStamp}
                setTimex={setTimex} setIsListedx={setIsListed}/>

                { isLoadingDelete || isLoadingListed || isLoadingSave ? 
                      <Loading className={'some-class'} withOverlay={false} />
                    :
                      isListed === true ?
                        <Button renderIcon={(props) => <TrashCan {...props}/>} kind="danger" onClick={() => {
                          mutateDelete({
                            email: decodedToken?.email,
                            movieId:  data?.data?.results[target]?.id
                          })
                        }}>
                          Remove from list
                        </Button> 
                      :
                        <Button renderIcon={(props) => <Add size={34} {...props} />} kind="secondary" iconDescription="Add" onClick={() => {
                          mutate({
                            email: decodedToken?.email,
                            movieId: data?.data?.results[target]?.id,
                            movieName: data?.data?.results[target]?.name ?? "",
                            movieTitle: data?.data?.results[target]?.title ?? "",
                            movieOverview: data?.data?.results[target]?.overview,
                            moviePoster: data?.data?.results[target]?.poster_path,
                            movieBackdrop: data?.data?.results[target]?.backdrop_path,
                            movieAverage: data?.data?.results[target]?.vote_average,
                            type: location?.pathname === "/" ? "movie" : "tv",
                          })}}>
                          Add to List
                        </Button>
                  }
              
            </div>
        </div>
    </div>
  )
}

export default MovieHero
