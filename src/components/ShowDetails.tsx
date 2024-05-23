import React from 'react';
import styled from 'styled-components';
import { CloseRounded as CloseIcon } from '@mui/icons-material';

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  min-width: 350px;
  max-width: 900px;
  width: 80%;
  height: 80%;
  transform: translate(-50%, -50%);
  margin: 0;
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
  right: 0;
  top: 0;
  margin: 5px;
  cursor: pointer;
`;

type Props = {
  setShowDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ShowDetails({ setShowDetailsOpen }: Props) {
  return (
    <Container>
      <Dialog>
        <CloseBtn onClick={() => setShowDetailsOpen(false)}>
          <CloseIcon />
        </CloseBtn>
      </Dialog>
    </Container>
  );
}
