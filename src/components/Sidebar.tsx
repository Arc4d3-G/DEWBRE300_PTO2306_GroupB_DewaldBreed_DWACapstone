
import { CloseRounded as CloseIcon, HomeRounded as HomeIcon, Favorite as FavouritesIcon, Search as SearchIcon, Login as LoginIcon, Contrast as ThemeIcon } from '@mui/icons-material';
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Container = styled.div`
    display: flex;
    flex: 0.5;
    flex-direction: column;
    height: 100vh;
    background-color:${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
    min-width: 180px;
`;

const Logo = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  font-size: 20px;
  margin: 16px 0px;
  padding-left: 20px;
  width: 100%;
  
`;

const NavButtons = styled.div`
  display: flex;
  flex-direction: column;
`;

const CloseBtn = styled.div`
  cursor: pointer;
  
`;

const NavBtn = styled.div`
  display: flex;
  padding: 20px 0px 20px 0px;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.text_secondary};
  &:hover {
    background-color: ${({ theme }) => theme.button};
  }
  &:active{
    color: ${({ theme }) => theme.text_primary};
  }
  cursor: pointer;
`;

const NavText = styled.div`
  padding: 0px 0px 5px 12px;
  
  text-decoration: none;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const HR = styled.div`
  width: 100%;
  height: 1px;
  margin: 10px 0px 10px 0px;
  background-color: ${({ theme }) => theme.text_secondary};
`;

const NavIcon = styled.div`
  padding-left: 20px;
`;

export default function Sidebar({setSideBarOpen, setDarkMode, darkMode}) {

  const handleThemeToggle = () => {
    setDarkMode(prev => !prev);
  }

  return (
    <Container>
      <Flex>
        <Logo>Pod-Lite</Logo>
        <CloseBtn>
          <CloseIcon/>
        </CloseBtn>
      </Flex>
      
      <NavButtons>

        <Link to='/'>
          <NavBtn>
            <NavIcon>
              <HomeIcon/>
            </NavIcon>
            <NavText>Home</NavText>
          </NavBtn>
        </Link>

        <Link to='/Search'>
          <NavBtn>
          <NavIcon>
            <SearchIcon/>
          </NavIcon>
            <NavText>Search</NavText>
          </NavBtn>
        </Link>
        
        <Link to='/Favourites'>
          <NavBtn>
            <NavIcon>
              <FavouritesIcon/>
            </NavIcon>
            <NavText>Favourites</NavText>
          </NavBtn>
        </Link>

        <HR/>

        <NavBtn onClick={handleThemeToggle}>
          <NavIcon>
            <ThemeIcon/>
          </NavIcon>
          <NavText>{darkMode ? "Light Mode" : "Dark Mode"}</NavText>
        </NavBtn>
        
        <Link to='/Login'>
          <NavBtn>
            <NavIcon>
              <LoginIcon/>
            </NavIcon>
            <NavText>Login</NavText>
          </NavBtn>
        </Link>
        
      </NavButtons>

    </Container>
  )
}