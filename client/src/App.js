import './App.scss';
import { Content, Theme } from '@carbon/react';
import TutorialHeader from './components/TutorialHeader/TutorialHeader';
import { Route, BrowserRouter, Routes } from 'react-router-dom';      
import LandingPage from './content/LandingPage/LandingPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import TvShows from './content/TvShows/TvShows';
import Login from './content/Login/Login';
import Main from './content/Main';
import ProtectedRoutes from './content/ProtectedRoutes';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route element={<ProtectedRoutes path="/login"  />}>
                  <Route path="/*" element={<Main/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;
