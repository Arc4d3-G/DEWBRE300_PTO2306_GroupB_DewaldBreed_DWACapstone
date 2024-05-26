import React, { useState } from 'react';
import { Show } from '../api/createApi';
import styled from 'styled-components';

const ShowContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

const Image = styled.img`
  max-width: 280px;
  /* height: 280px; */
`;

const Top = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  gap: 10px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  font-size: 20px;
`;
const Description = styled.div`
  margin: 0;
`;
const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* align-items: center; */
  justify-content: center;
  gap: 10px;
`;
const GenreItem = styled.div`
  font-size: 14px;
  padding: 5px;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.bgLight};
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SeasonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const Episodes = styled.div``;
const SeasonSelect = styled.select``;
type Props = {
  selectedShow: Show;
};

export default function ShowDetails({ selectedShow }: Props) {
  const { image, title, description, genres, seasons } = selectedShow;
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);

  // console.log(seasons);
  console.log(selectedSeason);
  const handleSeasonSelect = (value: string) => {
    setSelectedSeason(seasons[Number(value) - 1]);
  };
  return (
    <ShowContainer>
      <Top>
        <Image src={image} />
        <MetaInfo>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Genres>
            {genres &&
              selectedShow.genres
                .filter((genre) => genre != 'All' && genre != 'Featured')
                .map((genre, index) => <GenreItem key={index}>{genre}</GenreItem>)}
          </Genres>
        </MetaInfo>
      </Top>
      <Bottom>
        <SeasonContainer>
          <Title>Episodes</Title>
          <SeasonSelect
            name='seasons'
            id='seasons'
            onChange={(event) => handleSeasonSelect(event.target.value)}
          >
            {seasons.map((season) => (
              <option
                key={season.season}
                value={season.season}
              >
                Season {season.season}
              </option>
            ))}
          </SeasonSelect>
        </SeasonContainer>
        <Episodes>{}</Episodes>
      </Bottom>
    </ShowContainer>
  );
}
