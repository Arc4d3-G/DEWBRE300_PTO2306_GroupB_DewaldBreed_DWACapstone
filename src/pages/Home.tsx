import styled from 'styled-components';
import PreviewCard from '../components/PreviewCard';
import { Preview } from '../api/createApi';
import { store } from '../App';
import { useState } from 'react';

const Container = styled.div`
  padding: 20px 30px;
  height: 100%;
`;
const Carousel = styled.div``;

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
  flex-wrap: wrap;
  gap: 20px;
`;

const CardContainer = styled.div``;
type Props = {
  previewData: Preview[];
  setShowDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Home({ previewData, setShowDetailsOpen }: Props) {
  const [sortByType, setSortByType] = useState('');

  const sortPreviews = (sortByType: string): Preview[] => {
    let sorted: Preview[] = [];
    switch (sortByType) {
      case 'All':
        return previewData;
      case 'Latest':
        sorted = previewData.toSorted((a, b) => {
          const aDate = new Date(a.updated);
          const bDate = new Date(b.updated);
          return bDate.getTime() - aDate.getTime();
        });
        return sorted;
      case 'Oldest':
        sorted = previewData.toSorted((a, b) => {
          const aDate = new Date(a.updated);
          const bDate = new Date(b.updated);
          return aDate.getTime() - bDate.getTime();
        });
        return sorted;
      case 'A-Z':
        sorted = previewData.toSorted((a, b) => {
          return a.title.localeCompare(b.title);
        });
        return sorted;
      case 'Z-A':
        sorted = previewData.toSorted((a, b) => {
          return b.title.localeCompare(a.title);
        });
        return sorted;
      default:
        return previewData;
    }
  };

  const handleSortClick = (sortKey: string, event) => {
    setSortByType(sortKey);
  };
  const handleCardClick = (id: string) => {
    store.getState().setSelectedShow(id);
    setShowDetailsOpen(true);
  };

  return (
    <Container>
      <Carousel></Carousel>
      <BtnContainer>
        <Label>Sort By: </Label>
        <SortByBtn onClick={(event) => handleSortClick('All', event)}>All</SortByBtn>
        <SortByBtn onClick={(event) => handleSortClick('Latest', event)}>Latest</SortByBtn>
        <SortByBtn onClick={(event) => handleSortClick('Oldest', event)}>Oldest</SortByBtn>
        <SortByBtn onClick={(event) => handleSortClick('A-Z', event)}>A-Z</SortByBtn>
        <SortByBtn onClick={(event) => handleSortClick('Z-A', event)}>Z-A</SortByBtn>
      </BtnContainer>
      <ShowGrid>
        {sortPreviews(sortByType).map((preview: Preview) => (
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
