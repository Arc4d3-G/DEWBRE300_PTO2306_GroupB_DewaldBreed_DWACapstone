import React from 'react';
import styled from 'styled-components';
import ShowDetails from './showDetails';
import { CloseRounded as CloseIcon } from '@mui/icons-material';
import { useStore } from 'zustand';

import { Show } from '../api/createApi';
import { store } from '../main';

const DisableOutsideClick = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* z-index: 10000; */
  backdrop-filter: blur(6px);
`;

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  min-width: 350px;
  max-width: 900px;
  width: 80%;
  height: 80%;
  transform: translate(-50%, -50%);
  padding: 30px 20px 30px 20px;

  border: 2px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
`;

const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const CloseBtn = styled.div`
  position: fixed;
  right: 10px;
  top: 0;
  margin: 5px;
  cursor: pointer;
`;

type Props = {
  setShowDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ShowDetailsOverLay({ setShowDetailsOpen }: Props) {
  console.log('ShowDetails Render');

  const selectedShow: Show | null = useStore(store, (state) => state.selectedShow);
  const handleClose = () => {
    setShowDetailsOpen(false);
    store.setState({ selectedShow: null });
  };
  return (
    <DisableOutsideClick onClick={() => handleClose()}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Dialog>
          <CloseBtn onClick={() => handleClose()}>
            <CloseIcon />
          </CloseBtn>
          {/* {selectedShow === null && <Loading>LOADING SHOW...</Loading>} */}
          {selectedShow && <ShowDetails selectedShow={selectedShow} />}
        </Dialog>
      </Container>
    </DisableOutsideClick>
  );
}
