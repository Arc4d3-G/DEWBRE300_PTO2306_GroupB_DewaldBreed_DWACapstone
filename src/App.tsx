import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { styled, ThemeProvider } from 'styled-components';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Login from './pages/Login';
import Search from './pages/Search';
import Sidebar from './components/Sidebar';
import ShowDetails from './components/ShowDetails';
import { useState, FC } from 'react';
import { lightTheme, darkTheme } from './utils/themes';
import Navbar from './components/Navbar';
import { createApi } from './api/createApi';
import { useStore } from 'zustand';
import { createStore } from './model/useStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bgLight};
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  transition: 0.5s;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  overflow-y: scroll;
`;

const Loading = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.primary};
  font-size: 20px;
`;
export const api = createApi();
export const store = createStore(api);

const App: FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [showDetailsOpen, setShowDetailsOpen] = useState<boolean>(false);

  const previewData = useStore(store, (state) => state.previewData);
  const phase = useStore(store, (state) => state.phase);
  console.log('App Render');
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
            />
          )}
          <Navbar setSideBarOpen={setSideBarOpen} />
          <Frame>
            {phase === 'LOADING' && <Loading>LOADING...</Loading>}
            {showDetailsOpen && <ShowDetails setShowDetailsOpen={setShowDetailsOpen} />}
            <Routes>
              <Route
                path='/'
                element={
                  <Home
                    setShowDetailsOpen={setShowDetailsOpen}
                    previewData={previewData}
                  />
                }
              />
              <Route
                path='/Favourites'
                element={<Favourites />}
              />
              <Route
                path='/Login'
                element={<Login />}
              />
              <Route
                path='/Search'
                element={<Search />}
              />
            </Routes>
          </Frame>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
