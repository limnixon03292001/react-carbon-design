import './App.scss';
import { Content, Theme } from '@carbon/react';
import TutorialHeader from './components/TutorialHeader/TutorialHeader';
import { Route, BrowserRouter, Routes } from 'react-router-dom';      
import LandingPage from './content/LandingPage/LandingPage';
import RepoPage from './content/RepoPage/RepoPage';

function App() {
  return (
      <BrowserRouter>
      <Theme theme="g100">
        <TutorialHeader/>
      </Theme>
        <Content>
          <Routes>
              <Route exact path="/" element={<LandingPage/>} />
              <Route path="/repo" element={<RepoPage/>} />
          </Routes>
        </Content>
      </BrowserRouter>
  );
}

export default App;
