import React, { FC } from 'react';
import styled from 'styled-components';
import { PersonRounded as LoginIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  /* width: 100%; */
  padding: 16px 40px;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  /* gap: 30px; */
  background: ${({ theme }) => theme.bg};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transition: 0.5s;
`;

const MenuBtn = styled.div`
  cursor: pointer;
`;

const ButtonDiv = styled.div`
  cursor: pointer;
  max-width: 70px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  padding: 8px 10px;
  gap: 8px;
  &:hover {
    background-color: ${({ theme }) => theme.button};
  }
`;

type Props = {
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: FC<Props> = ({ setSideBarOpen }) => {
  return (
    <Container>
      <MenuBtn onClick={() => setSideBarOpen((prev) => !prev)}>
        <MenuIcon />
      </MenuBtn>
      <Link to='/Login'>
        <ButtonDiv>
          <LoginIcon />
          Login
        </ButtonDiv>
      </Link>
    </Container>
  );
};

export default Navbar;
