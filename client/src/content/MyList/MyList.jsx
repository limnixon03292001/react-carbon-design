import { Button, Column, Grid } from '@carbon/react'
import React, { memo, useEffect, useState } from 'react'
import { api } from '../../utils/axios-config';
import decode from 'jwt-decode';
import { useQuery } from 'react-query';
import ListCard from '../../components/ListCard/ListCard'

const getSaveMyList = async ({ queryKey }) => {
  const email = queryKey[1]
  return await api.get(`/netflix/getSaveList?email=${email}`);
}

const MyList = () => {
  const decodedToken = decode(localStorage.token);
  const [lists, setLists] = useState([]);
  const [ stamp, setStamp ] = useState(0);
  const [timex, setTimex] = useState()

  const { isLoading } = useQuery(['my-list', decodedToken?.email], getSaveMyList, {
    onSuccess: (({ data }) => {
      setLists(data)
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
  },[stamp])
 
  return (
    <Grid fullWidth>
      <Column lg={16} md={8} sm={4}  >
        <br />
        <h1 className='my_list_title'>My List</h1>
        <div>
          <Test list={lists} setTimex={setTimex} setStamp={setStamp} lists={lists} setLists={setLists}/>
        </div>
      </Column>
    </Grid>
  )
}

export default MyList


const Test = memo (function Test ({ setTimex, setStamp, lists, setLists }) {
  return (
      // <Grid fullWidth>
      <div className='grid_my_list'>
          {lists?.map((d, i) => (
            // <Column sm={3} key={i}>
          
              <ListCard trailId="movie" mData={{
                id: d?.movie_id,
                title: d?.movie_title,
                name: d?.movie_name,
                overview: d?.movie_overview,
                backdrop_path: d?.movie_backdrop,
                poster: d?.movie_poster,
                type: d?.type}}  
                stamp={setStamp} 
                setTimex={setTimex}

                setLists={setLists}
                lists={lists}
                key={i}
              />
       
   
          ))}   
        </div>
      // </Grid>
  )
})