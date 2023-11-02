import React, { useEffect, useState }  from 'react'
import { useQuery } from 'react-query'
import Poster from '../PosterSlider/Poster_Slider'
import decode from 'jwt-decode';
import { api } from '../../utils/axios-config';
import { Button } from '@carbon/react';
import { ChevronLeft, ChevronRight } from '@carbon/react/icons'

export default function Playing({title, keyWord, fetchFunction, trailId, idU, type}) {

  const { isLoading, data } = useQuery([keyWord], fetchFunction)
  const [ stamp, setStamp ] = useState(0);
  const [timex, setTimex] = useState()
  // const slider = useRef(0);
  let isDragging = false;
  const decodedToken = decode(localStorage.token);


  useEffect(() => {
    // iconVisibility()
    const slider = document.getElementById(idU)
  
      slider.addEventListener("mousemove", (drag) => {
        if(!isDragging) return;
        
          slider.scrollLeft -= drag.movementX
          slider.classList.add("dragging")
          // setTimeout(() => {
          //   iconVisibility()
          // }, 50)
       
      })
 
    slider.addEventListener("mousedown", () => {
      isDragging = true;
    })
  
   
    document.addEventListener("mouseup", () => {
      isDragging = false;
      slider.classList.remove("dragging")
    })
 

    return () => {
     
        slider.removeEventListener("mousemove", (drag) => {
          if(!isDragging) return;
          
    
            slider.scrollLeft -= drag.movementX
            slider.classList.add("dragging")
            // setTimeout(() => {
            //   iconVisibility()
            // },50)
          
        })
    
        slider.removeEventListener("mousedown", () => {
          isDragging = true;
        })
    
        document.removeEventListener("mouseup", () => {
          isDragging = false;
          slider.classList.remove("dragging")
        })
     
    }
  },[])

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
    // console.log("stamp yeah", decodedToken?.email, timex)
    savex()

    return () => {
      setTimex()
    }
  },[stamp])


  const handleSlide = (direction, e) => {
    e.preventDefault()
    const slider = document.getElementById(idU)
    const scrollableWidth = slider.clientWidth - 150
    if(direction === "right") {
      if(slider) {
        slider.scrollLeft += scrollableWidth
        // console.log(slider.current.scrollLeft, scrollableWidth)
        // setTimeout(() => {
        //   iconVisibility()
        // }, 50)
      }
    } else {
      if(slider) {
        slider.scrollLeft -= scrollableWidth
        // console.log(slider.current.scrollLeft)
        // setTimeout(() => {
        //   iconVisibility()
        // }, 50)
      }
    }
  }

  //dont forget to the target the left and right button

  // const iconVisibility = () => {

  //   const scrollableLeft = Math.ceil(slider.current.scrollLeft)
  //   const scrollableWidth = slider.current.scrollWidth - slider.current.clientWidth
  //   // console.log("visi", scrollableWidth, scrollableLeft)
  //   btnLeft.current.style.display = scrollableLeft > 0 ? "flex" : "none"
  //   btnRight.current.style.display = scrollableWidth > scrollableLeft ? "flex" : "none"
  // }

  return (
    <section className='nowplaying_section'>
 
      <h3>{title}</h3>
  
      <div className='outer_slider_wrapper'>
          <div className='btn_slider btn_slider_left'>
              <Button 
              className='cds--btn--icon-only-slider'
                onClick={(e) => handleSlide("left" ,e)}
                hasIconOnly
                kind='secondary'
                renderIcon={ChevronLeft} iconDescription="chevron-left"
              />
            </div>
          {/* <button tabIndex={0} onClick={(e) => handleSlide("left" ,e)} className='btn_slider btn_slider_left'><ChevronLeft/></button> */}
        <div className='main_slider' aria-label='slider' id={idU}>
      
          {data?.data?.results.map((movie, i) => (
              <React.Fragment key={i}>
                  <Poster posterUrl={movie?.poster_path} mData={movie} trailId={trailId} stamp={setStamp} setTimex={setTimex}
                  type={type}/>
              </React.Fragment>
          ))}
        
        </div>
{/*         
          <button tabIndex={0} onClick={(e) => handleSlide("right" ,e)} className='btn_slider btn_slider_right'>
            <ChevronRight/>
          </button> */}
          <div className='btn_slider btn_slider_right'>
            <Button 
              className='cds--btn--icon-only-slider'
              onClick={(e) => handleSlide("right" ,e)}
              hasIconOnly
              kind='secondary'
              renderIcon={ChevronRight} iconDescription="chevron-right"
            />
          </div>
      </div>
    </section>
  )
}

 

