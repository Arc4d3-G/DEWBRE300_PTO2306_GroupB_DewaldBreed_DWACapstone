import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Episode, Preview, Season, Show } from '../api/createApi';
import { api, store } from '../main';
import PreviewCard from '../components/PreviewCard';
import EpisodeCard from '../components/EpisodeCard';
import { useStore } from 'zustand';
import { Favorite, UserData } from '../model/useStore';

const Container = styled.div`
  padding: 20px 30px;
  height: 100%;
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 10px;
  align-items: center;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.text_secondary};
`;

const SortByBtn = styled.button`
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.bg};
  }
  font-size: 18px;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.bgLight};
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  cursor: pointer;
`;

const ShowGrid = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  gap: 20px;
`;

const CardContainer = styled.div``;

const FavoriteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Episodes = styled.div``;

const Loading = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.primary};
  font-size: 20px;
`;

type Props = {
  previewData: Preview[];

  phase: string;
};

export default function Favourites({ previewData, phase }: Props) {
  const [sortByType, setSortByType] = useState('');
  const userFavorites = store.getState().user?.favorites;
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>();

  // const showIdArray = [...new Set(userFavorites?.map((favorite) => favorite.show_id))];

  useEffect(() => {
    setIsLoading(true);
    store
      .getState()
      .parseUserData()
      .then((result) => {
        setFavorites(result);
        setIsLoading(false);
      });
    console.log(favorites);
  }, [userFavorites]);

  // useEffect(() => {
  //   const getFavData = async () => {
  //     setIsLoading(true);
  //     if (!userFavorites) return;
  //     const results: Favorite[] | undefined = [];

  //     // for (const showId of showIdArray) {
  //     //   const favoriteEpisodes = userFavorites?.filter((favorite) => favorite.show_id === showId);
  //     //   api.getShowDetails(showId).then((data) => {
  //     //     for (const episode of favoriteEpisodes) {
  //     //       results.push({
  //     //         show_Id: data.id,
  //     //         season_num: data.seasons[episode.season_num],
  //     //         episode: data.seasons[episode.season_num].episodes[episode.episode_num],
  //     //       });
  //     //     }
  //     //   });
  //     // }
  //     for (const favorite of userFavorites) {
  //       api.getShowDetails(favorite.show_id).then((data: Show) => {
  //         const match = data.seasons
  //           .find((season: Season) => season.season === favorite.season_num)
  //           ?.episodes.find((episode: Episode) => episode.episode === favorite.episode_num);
  //         match &&
  //           results.push({
  //             show_Id: favorite.show_id,
  //             season_num: favorite.season_num,
  //             episode: match,
  //           });
  //       });
  //     }

  //     setFavorites(results);
  //     setIsLoading(false);
  //   };
  //   getFavData();

  //   console.log(favorites);
  // }, [userFavorites]);

  const sortPreviews = (sortByType: string): Preview[] => {
    switch (sortByType) {
      case 'All':
        return previewData;
      case 'Latest':
        return previewData.toSorted((a, b) => {
          const aDate = new Date(a.updated);
          const bDate = new Date(b.updated);
          return bDate.getTime() - aDate.getTime();
        });

      case 'Oldest':
        return previewData.toSorted((a, b) => {
          const aDate = new Date(a.updated);
          const bDate = new Date(b.updated);
          return aDate.getTime() - bDate.getTime();
        });

      case 'A-Z':
        return previewData.toSorted((a, b) => {
          return a.title.localeCompare(b.title);
        });

      case 'Z-A':
        return previewData.toSorted((a, b) => {
          return b.title.localeCompare(a.title);
        });

      default:
        return previewData;
    }
  };

  const handleSortClick = (sortKey: string) => {
    setSortByType(sortKey);
  };

  return (
    <Container>
      {phase === 'LOADING' && <Loading>LOADING...</Loading>}
      <BtnContainer>
        <Label>Sort By: </Label>
        <SortByBtn onClick={() => handleSortClick('All')}>All</SortByBtn>
        <SortByBtn onClick={() => handleSortClick('Latest')}>Latest</SortByBtn>
        <SortByBtn onClick={() => handleSortClick('Oldest')}>Oldest</SortByBtn>
        <SortByBtn onClick={() => handleSortClick('A-Z')}>A-Z</SortByBtn>
        <SortByBtn onClick={() => handleSortClick('Z-A')}>Z-A</SortByBtn>
      </BtnContainer>
      <ShowGrid>
        <Episodes>
          {favorites &&
            favorites.map((favorite) => {
              return (
                <EpisodeCard
                  key={favorite.added_date}
                  episode={favorite.episode}
                  selectedSeason={favorite.season_num}
                  selectedShow={favorite.show_Id}
                  isAlreadyFavorite={true}
                />
              );
            })}
        </Episodes>
      </ShowGrid>
    </Container>
  );
}
