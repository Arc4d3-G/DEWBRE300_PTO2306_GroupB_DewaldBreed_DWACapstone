import React, { useState } from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import { Preview } from '../api/createApi';
import PreviewCard from '../components/PreviewCard';
import { store } from '../main';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${({ theme }) => theme.primary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  width: 300px;
  gap: 10px;
`;
const InputField = styled.input`
  color: ${({ theme }) => theme.text_primary};
  background-color: ${({ theme }) => theme.bgLight};
  width: 100%;
  height: 2rem;
  border: 2px solid ${({ theme }) => theme.primary};
  padding: 8px 10px;
  border-radius: 12px;
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
    background-color: ${({ theme }) => theme.button};
  }
  &:active {
    color: ${({ theme }) => theme.bgLight};
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

export default function Search({ previewData, setShowDetailsOpen }: Props) {
  console.log('render');
  const [sortByType, setSortByType] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [searchKey, setSearchKey] = useState('');

  const handleCardClick = (id: string) => {
    store.getState().setSelectedShow(id);
    setShowDetailsOpen(true);
  };
  const fuse = new Fuse(previewData, {
    keys: ['title', 'genres'],
    includeScore: true,
  });

  const searchResults = fuse.search(searchKey);

  const sortResults = (sortByType: string) => {
    switch (sortByType) {
      case 'All':
        return searchResults;
      case 'Latest':
        return searchResults.toSorted((a, b) => {
          const aDate = new Date(a.item.updated);
          const bDate = new Date(b.item.updated);
          return bDate.getTime() - aDate.getTime();
        });

      case 'Oldest':
        return searchResults.toSorted((a, b) => {
          const aDate = new Date(a.item.updated);
          const bDate = new Date(b.item.updated);
          return aDate.getTime() - bDate.getTime();
        });

      case 'A-Z':
        return searchResults.toSorted((a, b) => {
          return a.item.title.localeCompare(b.item.title);
        });

      case 'Z-A':
        return searchResults.toSorted((a, b) => {
          return b.item.title.localeCompare(a.item.title);
        });

      default:
        return searchResults;
    }
  };

  return (
    <Container>
      <Form
        onSubmit={(event) => {
          setSearchKey(inputValue);
          event.preventDefault();
        }}
      >
        <InputField
          type='text'
          onChange={(event) => setInputValue(event.target.value)}
          placeholder='Search by Title or Genre...'
          value={inputValue}
        ></InputField>
      </Form>
      <BtnContainer>
        <Label>Sort By: </Label>
        <SortByBtn onClick={() => setSortByType('All')}>All</SortByBtn>
        <SortByBtn onClick={() => setSortByType('Latest')}>Latest</SortByBtn>
        <SortByBtn onClick={() => setSortByType('Oldest')}>Oldest</SortByBtn>
        <SortByBtn onClick={() => setSortByType('A-Z')}>A-Z</SortByBtn>
        <SortByBtn onClick={() => setSortByType('Z-A')}>Z-A</SortByBtn>
      </BtnContainer>
      <ShowGrid>
        {sortResults(sortByType).map((result) => (
          <CardContainer
            key={result.item.id}
            onClick={() => handleCardClick(result.item.id)}
          >
            <PreviewCard show={result.item} />
          </CardContainer>
        ))}
      </ShowGrid>
    </Container>
  );
}
