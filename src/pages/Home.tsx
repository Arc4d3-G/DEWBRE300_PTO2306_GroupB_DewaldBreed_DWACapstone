import styled from 'styled-components';
import PreviewCard from '../components/PreviewCard';
import { Preview } from '../api/createApi';
import { GENRES } from '../api/createApi';
import { useState } from 'react';
import { store } from '../main';

const Container = styled.div`
  padding: 20px 30px;
  height: 100%;
`;
const Carousel = styled.div``;

const BtnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
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
  flex-wrap: wrap;
  gap: 20px;
`;
const GenreSelect = styled.select`
  width: 150px;
  color: ${({ theme }) => theme.text_secondary};
  background-color: ${({ theme }) => theme.bg};
  border: 2px solid ${({ theme }) => theme.primary};
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

const CardContainer = styled.div``;
type Props = {
  previewData: Preview[];
  setShowDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  phase: string;
};
export default function Home({ previewData, setShowDetailsOpen, phase }: Props) {
  const [sortByType, setSortByType] = useState('');
  const [filterBy, setFilterBy] = useState('All');
  const sortValues = ['All', 'Latest', 'Oldest', 'A-Z', 'Z-A'];

  const filterPreviews = (filterBy: string) => {
    if (filterBy === 'All') {
      return previewData;
    } else {
      return previewData.filter((preview) => preview.genres.includes(filterBy));
    }
  };
  const sortPreviews = (sortByType: string, filteredPreviews: Preview[]): Preview[] => {
    switch (sortByType) {
      case 'All':
        return filteredPreviews;
      case 'Latest':
        return filteredPreviews.toSorted((a, b) => {
          const aDate = new Date(a.updated);
          const bDate = new Date(b.updated);
          return bDate.getTime() - aDate.getTime();
        });

      case 'Oldest':
        return filteredPreviews.toSorted((a, b) => {
          const aDate = new Date(a.updated);
          const bDate = new Date(b.updated);
          return aDate.getTime() - bDate.getTime();
        });

      case 'A-Z':
        return filteredPreviews.toSorted((a, b) => {
          return a.title.localeCompare(b.title);
        });

      case 'Z-A':
        return filteredPreviews.toSorted((a, b) => {
          return b.title.localeCompare(a.title);
        });

      default:
        return filteredPreviews;
    }
  };

  const handleSortClick = (sortKey: string) => {
    setSortByType(sortKey);
  };

  const handleGenreSelect = (genre: string) => {
    setFilterBy(genre);
  };

  const handleCardClick = (id: string) => {
    store.getState().setSelectedShow(id);
    setShowDetailsOpen(true);
  };

  return (
    <Container>
      {phase === 'LOADING' && <Loading>LOADING...</Loading>}
      <Carousel></Carousel>
      <BtnContainer>
        <Label>Sort By: </Label>
        {sortValues.map((sortBy, index) => {
          return (
            <SortByBtn
              key={index}
              onClick={() => handleSortClick(sortBy)}
            >
              {sortBy}
            </SortByBtn>
          );
        })}
      </BtnContainer>
      <BtnContainer>
        <Label>Genre: </Label>
        <GenreSelect
          name='genres'
          id='genres'
          onChange={(event) => handleGenreSelect(event.target.value)}
        >
          <option
            key={0}
            value={'All'}
          >
            All
          </option>
          {Object.entries(GENRES).map((genre) => {
            const key = genre[0];
            const value = genre[1];
            return (
              <option
                key={key + 1}
                value={value}
              >
                {value}
              </option>
            );
          })}
        </GenreSelect>
      </BtnContainer>
      <ShowGrid>
        {sortPreviews(sortByType, filterPreviews(filterBy)).map((preview: Preview) => (
          <CardContainer
            key={preview.id}
            onClick={() => handleCardClick(preview.id)}
          >
            <PreviewCard show={preview} />
          </CardContainer>
        ))}
      </ShowGrid>
    </Container>
  );
}
