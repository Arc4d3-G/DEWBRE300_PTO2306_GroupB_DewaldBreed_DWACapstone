import React, { useState } from 'react';
import styled from 'styled-components';

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

export default function Search() {
  const [sortByType, setSortByType] = useState('');
  return (
    <Container>
      <Form>
        <InputField placeholder='Search by Title...'></InputField>
      </Form>
      <BtnContainer>
        <Label>Sort By: </Label>
        <SortByBtn onClick={() => setSortByType('All')}>All</SortByBtn>
        <SortByBtn onClick={() => setSortByType('Latest')}>Latest</SortByBtn>
        <SortByBtn onClick={() => setSortByType('Oldest')}>Oldest</SortByBtn>
        <SortByBtn onClick={() => setSortByType('A-Z')}>A-Z</SortByBtn>
        <SortByBtn onClick={() => setSortByType('Z-A')}>Z-A</SortByBtn>
      </BtnContainer>
      <ShowGrid></ShowGrid>
    </Container>
  );
}
