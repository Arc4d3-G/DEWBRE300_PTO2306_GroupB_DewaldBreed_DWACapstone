import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { styled, ThemeProvider } from 'styled-components';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Login from './pages/Login';
import Search from './pages/Search';
import Sidebar from './components/Sidebar';
import ShowDetailsOverlay from './components/ShowDetailsOverlay';
import AudioPlayer from './components/AudioPlayer';
import { useState, FC, useEffect } from 'react';
import { lightTheme, darkTheme } from './utils/themes';
import Navbar from './components/Navbar';
import { useStore } from 'zustand';
import { store } from './main';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bgLight};
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  transition: 0.5s;
  overflow-y: scroll;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  /* margin-bottom: 200px; */
`;

const App: FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [showDetailsOpen, setShowDetailsOpen] = useState<boolean>(false);

  const previewData = useStore(store, (state) => state.previewData);
  const phase = useStore(store, (state) => state.phase);
  const user = useStore(store, (state) => state.user);
  const currentlyPlaying = useStore(store, (state) => state.currentlyPlaying);

  useEffect(() => {
    store.getState().setUser();
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Container>
          {sideBarOpen && (
            <Sidebar
              setShowDetailsOpen={setShowDetailsOpen}
              setSideBarOpen={setSideBarOpen}
              setDarkMode={setDarkMode}
              darkMode={darkMode}
              user={user}
            />
          )}
          <Navbar
            setSideBarOpen={setSideBarOpen}
            user={user}
          />
          <Frame>
            {showDetailsOpen && <ShowDetailsOverlay setShowDetailsOpen={setShowDetailsOpen} />}
            <Routes>
              <Route
                path='/'
                element={
                  <Navigate
                    replace
                    to='/Home'
                  />
                }
              />
              <Route
                path='/Home'
                element={
                  <Home
                    setShowDetailsOpen={setShowDetailsOpen}
                    previewData={previewData}
                    phase={phase}
                  />
                }
              />
              <Route
                path='/Favourites'
                element={
                  <Favourites
                    previewData={previewData}
                    phase={phase}
                  />
                }
              />
              <Route
                path='/Login'
                element={<Login user={user} />}
              />
              <Route
                path='/Search'
                element={
                  <Search
                    setShowDetailsOpen={setShowDetailsOpen}
                    previewData={previewData}
                  />
                }
              />
            </Routes>
          </Frame>
          {currentlyPlaying && <AudioPlayer />}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
