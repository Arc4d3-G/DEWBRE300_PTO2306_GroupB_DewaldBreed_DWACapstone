import { Routes, Route, BrowserRouter} from "react-router-dom"
import {styled, ThemeProvider } from "styled-components"
import Home from "./pages/Home"
import Favourites from "./pages/Favourites"
import Login from "./pages/Login"
import Search from "./pages/Search"
import Sidebar from "./components/Sidebar"
import { useState } from "react"
import { lightTheme, darkTheme } from "./utils/themes"

const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bgLight};
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;

`;

const Frame= styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [sideBarOpen, setSideBarOpen] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Container>
          <Sidebar setSideBarOpen={setSideBarOpen} setDarkMode={setDarkMode} darkMode={darkMode} />
          <Frame>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Favourites" element={<Favourites />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Search" element={<Search />} /> 
            </Routes>
          </Frame>
        </Container>
      </BrowserRouter>
      
    </ThemeProvider>

  )
}


{/* <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<Search />} /> 
    </Routes> */}