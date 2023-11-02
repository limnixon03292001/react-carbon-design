import React from 'react'
import { Content, Theme } from '@carbon/react';
import TutorialHeader from '../components/TutorialHeader/TutorialHeader';
import LandingPage from './LandingPage/LandingPage';
import TvShows from './TvShows/TvShows';
import { Route, Routes } from 'react-router-dom';
import MyList from './MyList/MyList';
export default function Main() {
  return (
    <div>
        <Theme theme="g100">
            <TutorialHeader/>
        </Theme>
        <Content>
            <Routes>
                <Route exact path="/" element={<LandingPage/>} />
                <Route path="/tv-shows" element={<TvShows/>} />
                <Route path="/my-list" element={<MyList/>} />
            </Routes>
        </Content>
    </div>
  )
}
 