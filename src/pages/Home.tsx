import styled from 'styled-components';
import PreviewCard from '../components/PreviewCard';
import { Preview } from '../api/createApi';
import { store } from '../App';

const Container = styled.div`
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

const CardContainer = styled.div``;
type Props = {
  previewData: Preview[];
  setShowDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Home({ previewData, setShowDetailsOpen }: Props) {
  console.log('Home render');

  const handleCardClick = (id: string) => {
    store.getState().setSelectedShow(id);
    setShowDetailsOpen(true);
  };

  return (
    <Container>
      <Carousel></Carousel>
      <ShowGrid>
        {previewData.slice(0, 30).map((preview: Preview) => (
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
