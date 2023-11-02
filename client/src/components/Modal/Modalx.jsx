import React, { useEffect, useState } from 'react'
import { Button, Column, Grid, Modal, Loading } from "@carbon/react";
import { Add, TrashCan } from '@carbon/icons-react';
import LinesEllipsis from 'react-lines-ellipsis';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { api } from '../../utils/axios-config';
import decode from 'jwt-decode';
import { useLocation } from 'react-router-dom'

const fetchTrailer = async ({ queryKey}) => {
  const id = queryKey[1];
  const trailId = queryKey[2]
  return axios.get(`https://api.themoviedb.org/3/${trailId}/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&append_to_response=videos`)
}

const fetchCast = async ({ queryKey }) => {
  const id = queryKey[1];
  const type = queryKey[2]
  return axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`)
}

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


 const Modalx = ({ mData, open, setOpen, button, trailId, stamp, setTimex, type, 
  
  setIsListedx, setLists, lists }) => {


  const decodedToken = decode(localStorage.token);
  const [isListed, setIsListed] = useState(false);
  const location = useLocation();

  const { data, isLoading } = useQuery(['trailer', mData.id, location.pathname === "/my-list" ? mData?.type : trailId], fetchTrailer);
  const { data: castData, isLoading: isLoadingCast } = useQuery(['casts', mData.id, location.pathname === "/my-list" ? mData?.type : trailId], fetchCast);


  const { data: listed, isLoading: isLoadingListed } = useQuery(['listed', mData.id, decodedToken?.email], checkIfListed, {
    onSuccess: ((data) => {
      setIsListed(data?.data)
    })
  });
  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation(deleteFromList, {
    onSuccess: (() => {
      setIsListed(false)
      setIsListedx && setIsListedx(false);
      // console.log("remove", lists?.filter(i => i?.movie_id !== mData?.id))
      lists && setLists(lists?.filter(i => i?.movie_id !== mData?.id))
      location.pathname === "/my-list" && setOpen((prev) => !prev)
    })
  })
  const { mutate, isLoading: isLoadingSave } = useMutation(saveMyList, {
    onSuccess: (() => {
      setIsListed(true)
      setIsListedx && setIsListedx(true)
    })
  })

  return (
    <div>
         <Modal launcherbuttonref={button} passiveModal
            open={open} onRequestClose={() => setOpen((prev) => !prev)} onClick={(e) => { console.log("firessss"); e.preventDefault()}} >
            <div>
              {/* {console.log("Modalx", trailId)} */}
              <div className="wrapper_img_modal">
                <img className="backdrop_img_modal" src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${
                  mData?.backdrop_path}`} alt={`${mData?.title}_backdrop`}/>
              </div>

              <Grid fullWidth>

              <Column lg={10} md={8} sm={4}  >
                <section className="wrapper_content_modal">
               
                  <h2>{mData?.title || mData?.name}</h2>
                  <p>{mData?.tagline}</p>
                  {/* {console.log("modal", mData)} */}
                    <LinesEllipsis
                      text={mData?.overview}
                      maxLine='4'
                      ellipsis='...'
                      trimRight
                      basedOn='letters'
                    />
       
                    <div>
                      <VideoPlayer mData={mData} data={data} stamp={stamp} setTimex={setTimex}/>
                    </div>

                </section>
                </Column>
                <Column lg={6} md={8} sm={4}  >.
                 
                  <section className="wrapper_content_cast" >
                    {isLoadingDelete || isLoadingListed || isLoadingSave ? 
                      <Loading className={'some-class'} withOverlay={false} />
                    :
                      isListed === true ?
                        <Button renderIcon={(props) => <TrashCan {...props}/>} kind="danger" onClick={() => {
                          mutateDelete({
                            email: decodedToken?.email,
                            movieId: mData?.id
                          })
                        }}>
                          Remove from list
                        </Button> 
                      :
                        <Button renderIcon={(props) => <Add size={34} {...props} />} kind="secondary" iconDescription="Add" onClick={() => {
                            mutate({
                            email: decodedToken?.email,
                            movieId: mData?.id,
                            movieName: mData?.name ?? "",
                            movieTitle: mData?.title ?? "",
                            movieOverview: mData?.overview,
                            moviePoster: mData?.poster_path,
                            movieBackdrop: mData?.backdrop_path,
                            movieAverage: mData?.vote_average,
                            type: location?.pathname === "/" ? "movie" : "tv",
                          })
                        }}>
                          Add to List
                        </Button>
                    }
                    
                    <div>
                      <p style={{fontSize: '13px'}}><span style={{fontWeight: 'bold'}}>Cast: </span> 
                      {castData?.data?.cast?.slice(0,6)?.map((c, i) => (
                        <span key={i}>{c.name}{castData?.data?.cast?.slice(0,6)?.length - 1 !== i ? ',' : '.'} </span>
                      ))}</p>
                    </div>
                    <br />
                    {/* <div>
                      <p style={{fontSize: '13px'}}><span style={{fontWeight: 'bold'}}>Genres:</span> Action, Shounen, Anime</p>
                    </div> */}
                  </section>
                </Column>
              </Grid>
              {/* <YouTube videoId={trailer?.key}  /> */}
            </div>
          </Modal>
    </div>
  )
}

export default Modalx
