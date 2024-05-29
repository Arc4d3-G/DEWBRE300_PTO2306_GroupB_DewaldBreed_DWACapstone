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
        <SortByBtn onClick={() => handleSortClick('All')}>All</SortByBtn>
        <SortByBtn onClick={() => handleSortClick('Latest')}>Latest</SortByBtn>
        <SortByBtn onClick={() => handleSortClick('Oldest')}>Oldest</SortByBtn>
        <SortByBtn onClick={() => handleSortClick('A-Z')}>A-Z</SortByBtn>
        <SortByBtn onClick={() => handleSortClick('Z-A')}>Z-A</SortByBtn>
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
