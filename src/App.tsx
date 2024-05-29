import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { styled, ThemeProvider } from 'styled-components';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Login from './pages/Login';
import Search from './pages/Search';
import Sidebar from './components/Sidebar';
import ShowDetailsOverlay from './components/ShowDetailsOverlay';
import { useState, FC, useEffect } from 'react';
import { lightTheme, darkTheme } from './utils/themes';
import Navbar from './components/Navbar';
import { createApi } from './api/createApi';
import { useStore } from 'zustand';
import { createStore } from './model/useStore';
import supabase from './utils/supabase';

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
`;

type User = {
  id: string | undefined;
  email: string | undefined;
};

export const api = createApi();
export const store = createStore(api);

const App: FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [showDetailsOpen, setShowDetailsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const previewData = useStore(store, (state) => state.previewData);
  const phase = useStore(store, (state) => state.phase);
  useEffect(() => {
    supabase.auth.getUser().then((userData) => {
      const user = userData.data.user;
      if (user?.id === undefined) {
        setUser(null);
      } else {
        setUser({ id: user.id, email: user?.email });
      }
    });
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
                element={<Favourites />}
              />
              <Route
                path='/Login'
                element={
                  <Login
                    supabase={supabase}
                    user={user}
                    setUser={setUser}
                  />
                }
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
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
