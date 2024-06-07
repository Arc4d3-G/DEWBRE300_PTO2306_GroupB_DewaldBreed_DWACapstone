import { useState } from 'react';
import { Show } from '../api/createApi';
import styled from 'styled-components';
import EpisodeCard from './EpisodeCard';
import { store } from '../main';

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
  border-radius: 6px;
`;

const Top = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  max-width: 400px;
  gap: 10px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  font-size: 20px;
`;
const Description = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
  max-height: 270px;
  overflow-y: scroll;
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
  /* background-color: ${({ theme }) => theme.bgLight}; */
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
  margin-bottom: 15px;
`;

const Episodes = styled.div`
  margin: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
// const Loading = styled.div`
//   position: fixed;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   justify-content: center;
//   align-items: center;
//   color: ${({ theme }) => theme.primary};
//   font-size: 20px;
// `;
// const HR = styled.div`
//   width: 100%;
//   height: 2px;
//   margin: 10px 0px 10px 0px;
//   background-color: ${({ theme }) => theme.primary};
// `;
const SeasonSelect = styled.select`
  width: 100px;
  color: ${({ theme }) => theme.text_secondary};
  background-color: ${({ theme }) => theme.bg};
  border: 2px solid ${({ theme }) => theme.primary};
`;

type Props = {
  selectedShow: Show;
};

export default function ShowDetails({ selectedShow }: Props) {
  const { title, description, genres, seasons, id } = selectedShow;
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);
  // const [loading, setLoading] = useState(true);

  const handleSeasonSelect = (value: string) => {
    setSelectedSeason(seasons[Number(value) - 1]);
  };

  const showFavorites = store
    .getState()
    .user?.favorites?.filter(
      (favorite) => favorite.show_id === id && favorite.season_num === selectedSeason.season
    );

  // if (loading) return <Loading>LOADING...</Loading>;
  return (
    <ShowContainer>
      <Top>
        <Image src={selectedSeason.image} />
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
          <Title>{`Episodes (${selectedSeason.episodes.length})`}</Title>
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
        <Episodes>
          {selectedSeason.episodes.map((episode) => {
            const filtered = showFavorites?.filter(
              (favorite) => favorite.episode_num === episode.episode
            );

            const isAlreadyFavorite = filtered?.length ? true : false;
            return (
              <EpisodeCard
                key={episode.episode}
                episode={episode}
                selectedSeason={selectedSeason.season}
                selectedShow={selectedShow.id}
                isAlreadyFavorite={isAlreadyFavorite}
                favoriteDate={null}
              />
            );
          })}
        </Episodes>
      </Bottom>
    </ShowContainer>
  );
}
