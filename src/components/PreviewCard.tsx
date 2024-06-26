import styled from 'styled-components';
import { Preview } from '../api/createApi';
import { useEffect, useRef } from 'react';
import placeholderImg from '../assets/placeholder.png';

const Container = styled.div`
  background-color: ${({ theme }) => theme.card};
  max-width: 220px;
  height: 350px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 6px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 6px;
`;

const Info = styled.div``;

const Title = styled.div`
  padding: 10px 0px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-width: 100%;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_primary};
`;

const Description = styled.div`
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
`;

const MetaInfo = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 10px;
  padding-top: 10px;
`;

const Seasons = styled.div``;

const Genres = styled.div``;

const Updated = styled.div``;

type Props = {
  show: Preview;
};

function PreviewCard({ show }: Props) {
  const { title, description, image, seasons, genres, updated } = show;

  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;

          const src = img.getAttribute('data-src');
          if (src) {
            img.setAttribute('src', src);
            img.classList.add('fade');
            observer.disconnect();
          }
        }
      });
    });
    if (imgRef.current) observer.observe(imgRef.current);
  }, []);

  return (
    <Container>
      <Image
        ref={imgRef}
        src={placeholderImg}
        data-src={image}
        loading='lazy'
      />

      <Info>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <MetaInfo>
          <Seasons>Seasons: {seasons}</Seasons>
          <Genres>Genres: {genres.join(', ')}</Genres>
          <Updated>Updated: {updated}</Updated>
        </MetaInfo>
      </Info>
    </Container>
  );
}

export default PreviewCard;
