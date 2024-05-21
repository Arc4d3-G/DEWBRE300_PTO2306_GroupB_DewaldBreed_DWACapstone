import React from 'react';
import styled from 'styled-components';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import { GENRES } from '../api/createApi';

const Container = styled.div`
  background-color: ${({ theme }) => theme.card};
  max-width: 220px;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 6px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 220px;
  height: 140px;
  border-radius: 6px;
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  position: relative;
`;

const FavoriteBtn = styled(IconButton)`
  color: white !important;
  top: 8px;
  right: 6px;
  padding: 6px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.button} !important;
  backdrop-filter: blur(4px);
  position: absolute !important;
  box-shadow: 0 0 16px #222423;
`;

const Info = styled.div``;

const Title = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-width: 100%;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_primary};
`;

const Description = styled.div`
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
`;

const MetaInfo = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 10px;
  padding-top: 10px;
`;

const Seasons = styled.div``;

const Genres = styled.div``;

const Updated = styled.div``;

type Props = {
  show: {
    id: string;
    title: string;
    description: string;
    seasons: number;
    image: string;
    genres: number[];
    updated: string;
  };
};

function PreviewCard({ show }: Props) {
  const { title, description, image, seasons, genres, updated } = show;

  const genreString = genres.map((id) => GENRES[id]).join(', ');
  return (
    <Container>
      <Top>
        <FavoriteBtn>
          <FavoriteIcon />
        </FavoriteBtn>
        <Image src={image} />
      </Top>
      <Info>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <MetaInfo>
          <Seasons>Seasons: {seasons}</Seasons>
          <Genres>Genres: {genreString}</Genres>
          <Updated>Updated: {updated}</Updated>
        </MetaInfo>
      </Info>
    </Container>
  );
}

export default PreviewCard;
