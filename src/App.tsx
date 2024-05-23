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

const Container = styled.div`
  display: flex;
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
`;
const api = createApi();
export const previews = await api.getPreviewsList();
// const showDetails = await api.getShowDetails('10716');
// console.log(showDetails);

const App: FC = () => {
  console.log('App render');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [showDetailsOpen, setShowDetailsOpen] = useState<boolean>(true);
  const [selectedShowId, setSelectedShowId] = useState<string>('');

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
          <Frame>
            <Navbar setSideBarOpen={setSideBarOpen} />
            {showDetailsOpen && (
              <ShowDetails /* showDetails */ setShowDetailsOpen={setShowDetailsOpen} />
            )}

            <Routes>
              <Route
                path='/'
                element={<Home />}
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
