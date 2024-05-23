import styled from 'styled-components';
import PreviewCard from '../components/PreviewCard';
import { Preview } from '../api/createApi';
import { previews } from '../App';
import { useState } from 'react';

const Container = styled.div`
  overflow-y: scroll;
  padding: 20px 30px;
  height: 100%;
`;
const Carousel = styled.div``;

const ShowGrid = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export default function Home() {
  console.log('Home render');
  return (
    <Container>
      <Carousel></Carousel>
      <ShowGrid>
        {previews.slice(0, 10).map((preview: Preview) => (
          <PreviewCard
            key={preview.id}
            show={preview}
          />
        ))}
      </ShowGrid>
    </Container>
  );
}
