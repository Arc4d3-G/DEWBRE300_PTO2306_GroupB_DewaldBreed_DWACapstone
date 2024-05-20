import React from 'react';
import styled from 'styled-components';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';

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

const Title = styled.div``;

const Description = styled.div``;

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
const GENRES: { [key: number]: string } = {
  1: 'Personal Growth',
  2: 'True Crime and Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family',
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
        <Seasons>Seasons: {seasons}</Seasons>
        <Genres>Genres: {genreString}</Genres>
        <Updated>Updated:</Updated>
      </Info>
    </Container>
  );
}

export default PreviewCard;
