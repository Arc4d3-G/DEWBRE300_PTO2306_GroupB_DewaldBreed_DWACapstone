import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Preview } from '../api/createApi';
import { store } from '../main';
import EpisodeCard from '../components/EpisodeCard';
import { Favorite } from '../model/useStore';

const Container = styled.div`
  padding: 20px 30px;
  height: 100%;
  margin-bottom: 70px;
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

const FavoriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  min-width: 300px;
  height: 100%;
  padding: 16px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.bg};
`;

const Image = styled.img`
  width: 220px;
  height: 220px;
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
  max-width: 400px;
  gap: 10px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  font-size: 15px;
`;

const Description = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
`;

const Updated = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
  font-size: 10px;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Episodes = styled.div`
  margin: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

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

  const favoriteShowArray = [
    ...new Set(
      userFavorites?.map((favorite) => previewData.find((show) => show.id === favorite.show_id)!)
    ),
  ];

  const sortFavorites = (sortByType: string): Preview[] => {
    switch (sortByType) {
      case 'All':
        return favoriteShowArray;
      case 'Latest':
        return favoriteShowArray.toSorted((a, b) => {
          const aDate = new Date(a.updated);
          const bDate = new Date(b.updated);
          return bDate.getTime() - aDate.getTime();
        });

      case 'Oldest':
        return favoriteShowArray.toSorted((a, b) => {
          const aDate = new Date(a.updated);
          const bDate = new Date(b.updated);
          return aDate.getTime() - bDate.getTime();
        });

      case 'A-Z':
        return favoriteShowArray.toSorted((a, b) => {
          return a.title.localeCompare(b.title);
        });

      case 'Z-A':
        return favoriteShowArray.toSorted((a, b) => {
          return b.title.localeCompare(a.title);
        });

      default:
        return favoriteShowArray;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    store
      .getState()
      .parseUserData()
      .then((result) => {
        setFavorites(result);
        setIsLoading(false);
      });
  }, [userFavorites]);

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
        {!isLoading &&
          favoriteShowArray &&
          sortFavorites(sortByType).map((show) => {
            return (
              <FavoriteContainer key={show?.id}>
                <Top>
                  <Image src={show?.image} />
                  <MetaInfo>
                    <Title>{show?.title}</Title>
                    <Description>{show?.description}</Description>
                    <Updated>Updated: {show?.updated}</Updated>
                  </MetaInfo>
                </Top>
                <Bottom>
                  <Episodes>
                    {show &&
                      favorites?.map((favorite) => {
                        if (favorite.show_Id === show.id) {
                          return (
                            <EpisodeCard
                              key={favorite.added_date}
                              episode={favorite.episode}
                              selectedSeason={favorite.season_num}
                              selectedShow={favorite.show_Id}
                              isAlreadyFavorite={true}
                              favoriteDate={favorite.added_date}
                            />
                          );
                        }
                      })}
                  </Episodes>
                </Bottom>
              </FavoriteContainer>
            );
          })}
      </ShowGrid>
    </Container>
  );
}
