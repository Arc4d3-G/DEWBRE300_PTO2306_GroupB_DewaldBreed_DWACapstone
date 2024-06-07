import React from 'react';
import { Preview } from '../api/createApi';
import PreviewCard from './PreviewCard';
import { store } from '../main';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const CardContainer = styled.div``;

type Props = {
  previewData: Preview[];
  setShowDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Carousel({ previewData, setShowDetailsOpen }: Props) {
  // const generateFeaturedArray = () => {
  //   const result: Preview[] = [];

  //   const getRandomElement = () => {
  //     const randomIndex = Math.floor(Math.random() * previewData.length);
  //     return previewData[randomIndex];
  //   };

  //   for (let i = 1; i < previewData.length; i++) {
  //     const randomElement = getRandomElement();

  //     if (!result.includes(randomElement)) {
  //       result.push(randomElement);
  //     }
  //     if (result.length === 10) break;
  //   }
  //   console.log(result);
  //   return result;
  // };

  const handleCardClick = (id: string) => {
    store.getState().setSelectedShow(id);
    setShowDetailsOpen(true);
  };

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '100px',
    slidesToShow: 6,
    speed: 500,
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          className: 'center',
          centerMode: true,
          infinite: true,
          centerPadding: '100px',
          slidesToShow: 5,
          speed: 500,
        },
      },
      {
        breakpoint: 2165,
        settings: {
          className: 'center',
          centerMode: true,
          infinite: true,
          centerPadding: '100px',
          slidesToShow: 4,
          speed: 500,
        },
      },
      {
        breakpoint: 1835,
        settings: {
          className: 'center',
          centerMode: true,
          infinite: true,
          centerPadding: '100px',
          slidesToShow: 3,
          speed: 500,
        },
      },
      {
        breakpoint: 1505,
        settings: {
          className: 'center',
          centerMode: true,
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1086,
        settings: {
          className: 'center',
          centerMode: true,
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='slider-container'>
      <Slider {...settings}>
        {previewData.slice(15, 25).map((preview: Preview) => (
          <CardContainer
            key={preview.id}
            onClick={() => handleCardClick(preview.id)}
          >
            <PreviewCard show={preview} />
          </CardContainer>
        ))}
      </Slider>
    </div>
  );
}
