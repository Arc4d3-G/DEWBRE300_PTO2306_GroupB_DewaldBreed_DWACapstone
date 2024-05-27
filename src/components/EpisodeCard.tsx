import React from 'react';
import { Episode } from '../api/createApi';
import styled from 'styled-components';
import { PlayCircleOutline as PlayIcon, FavoriteBorder as FavIcon } from '@mui/icons-material';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.bgLight};
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
`;

const Details = styled.div`
  margin: 10px;
  width: 80%;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
`;
const Description = styled.div`
  font-size: 15px;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_secondary};
`;

const Buttons = styled.div`
  display: flex;
  padding: 15px;
  gap: 10px;
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  cursor: pointer;
`;

type Props = {
  episode: Episode;
};

export default function EpisodeCard({ episode }: Props) {
  const { title, description, episode: episodeNum, file } = episode;
  return (
    <Container>
      <Details>
        <Title>{`#${episodeNum} - ${title}`}</Title>
        <Description>{description}</Description>
      </Details>
      <Buttons>
        <Button>
          <PlayIcon fontSize='large' />
        </Button>
        <Button>
          <FavIcon fontSize='large' />
        </Button>
      </Buttons>
    </Container>
  );
}
