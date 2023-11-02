import React, { memo, useEffect, useState } from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  ExpandableSearch,
  Loading,
  Button,
} from '@carbon/react';
import { Logout } from '@carbon/react/icons'
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { UserAvatar } from '@carbon/react/icons';
import decode from 'jwt-decode';
import axios from 'axios';
import { useQuery } from 'react-query'
import { useDebounce } from 'use-debounce';
import ListModal from '../TutorialHeader/ListModal'
import { api } from '../../utils/axios-config';

const TutorialHeader = () => {
  const [dropDown, setDropDown] = useState(false)
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.token;
    const decodedToken = decode(token);
    setUser(decodedToken);
  },[]);

 return ( 
  <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="Carbon Tutorial">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName as={Link} to="/" prefix="IBM">
            NETFLIX
          </HeaderName>
          <HeaderNavigation aria-label="Carbon Tutorial">
            <HeaderMenuItem as={Link} to="/tv-shows">Tv-shows</HeaderMenuItem>
            <HeaderMenuItem as={Link} to="/my-list">My List</HeaderMenuItem>
            <SearchBar length={400}/>
          </HeaderNavigation>
       
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            isPersistent={false}
          >
            <SideNavItems>
              <HeaderSideNavItems>
                <SearchBar length={"100%"}/>
                <HeaderMenuItem as={Link} to="/tv-shows">Tv-Shows</HeaderMenuItem>
                <HeaderMenuItem as={Link} to="/my-list">My List</HeaderMenuItem>
              </HeaderSideNavItems>
            </SideNavItems>
          </SideNav>
          <HeaderGlobalBar>
             <HeaderGlobalAction role="button" aria-label="Profile" tooltipAlignment="end">
         
                <img src={user?.picture} alt={user?.name} className='avatar_img'
                onClick={() => setDropDown(prev => !prev)}/>
      
            </HeaderGlobalAction>
              {dropDown && 
                  <div className="logout_container" aria-label='logout-container'> 
                  
                    <Button 
                      onClick={() => {
                        localStorage.removeItem('token');
                        navigate("/login", { replace: true });
                      }}
                      kind='secondary'
                      renderIcon={Logout} iconDescription="Logout">Logout</Button>
                  </div>
                }

          </HeaderGlobalBar>
        
        </Header>
      )}
  />
)};

export default TutorialHeader;

const search = ( searchData, pathname ) => {
  const path = pathname === "/" ? "movie" : "tv"
  return axios.get(`https://api.themoviedb.org/3/search/${path}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${searchData}`);
}

const SearchBar = ({ length }) => {
  const decodedToken = decode(localStorage.token);
  const [searchData, setSearchData] = useState('');
  const [value] = useDebounce(searchData, 1000);
  const [ stamp, setStamp ] = useState(0);
  const [timex, setTimex] = useState();
  const { pathname }= useLocation();
  const { data, isFetching }  = useQuery(['search', value], () => search(value, pathname), 
      {
        enabled: Boolean(value)
    });
  
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
    <div
    className='search_container'
      style={{
        width: length,
       }}
    >
      <ExpandableSearch size="lg" labelText="Search" playgroundWidth={400} textDirection="rtl" closeButtonLabelText="Clear search input" id="search-expandable-1" 
      onChange={(e) => setSearchData(e?.target?.value)} />
      {isFetching ?
        <div className='search_outer_container'>
          <div className='search_loading'>
            <Loading className={'some-class'} withOverlay={false} small={true} />
            <p>Loading...</p>
          </div>
        </div>
      : 
        value && 
          <div className='search_outer_container'>
            <Test search={data?.data?.results} setTimex={setTimex} setStamp={setStamp} path={pathname}/>
          </div>
      }
  </div>
  )
}

const Test = memo (function Test ({ setTimex, setStamp, search, setLists, path }) {
 
  return (
      // <Grid fullWidth>
      <>
          {search?.map((s, i) => (
            // <Column sm={3} key={i}>
            <div key={i}>
              <ListModal trailId={path === "/" ? "movie" : "tv"} searchedItem={s}
                stamp={setStamp} 
                setTimex={setTimex}

                setLists={setLists}
                lists={search}
              />
            </div>
          ))}   
        </>
      // </Grid>
  )
})
