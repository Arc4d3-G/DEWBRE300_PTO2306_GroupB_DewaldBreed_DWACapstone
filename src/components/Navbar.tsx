import React, { FC } from 'react';
import styled from 'styled-components';
import { PersonRounded as LoginIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { User } from '@supabase/supabase-js';

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

const Left = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Right = styled.div``;
const MenuBtn = styled.div`
  cursor: pointer;
`;

const PageTitle = styled.div`
  margin-bottom: 4px;
  /* color: ${({ theme }) => theme.primary}; */
  /* font-weight: bold; */
  /* font-size: 20px; */
`;

const ButtonDiv = styled.div`
  cursor: pointer;
  /* max-width: 70px; */
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  padding: 8px 10px;
  gap: 8px;
  /* &:hover {
    background-color: ${({ theme }) => theme.button};
  } */
`;

type Props = {
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
};

const Navbar = ({ setSideBarOpen, user }: Props) => {
  return (
    <Container>
      <Left>
        <MenuBtn onClick={() => setSideBarOpen((prev) => !prev)}>
          <MenuIcon />
        </MenuBtn>
        <PageTitle>{useLocation().pathname.substring(1)}</PageTitle>
      </Left>
      <Right>
        <Link to='/Login'>
          <ButtonDiv>
            <LoginIcon />
            {user === null ? 'Login' : user.email}
          </ButtonDiv>
        </Link>
      </Right>
    </Container>
  );
};

export default Navbar;
