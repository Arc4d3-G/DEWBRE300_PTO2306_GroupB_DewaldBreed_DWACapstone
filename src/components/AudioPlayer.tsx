import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  PlayCircleOutline as PlayIcon,
  PauseCircleOutlineOutlined as PauseIcon,
} from '@mui/icons-material';
import { store } from '../main';
import { useStore } from 'zustand';
import { Episode } from '../api/createApi';

const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  background: ${({ theme }) => theme.bg};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transition: 0.5s;
  padding: 20px 0px;
  color: ${({ theme }) => theme.primary};
`;

// const EpisodeDetails = styled.div`
//   min-width: 100px;
//   /* max-width: 300px; */
// `;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 500px;
  gap: 5px;
`;

const ProgressBar = styled.input`
  width: 100%;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 3px;
    position: relative;
    /* background: ${({ theme }) => theme.primary}; */
  }
  &::-webkit-slider-thumb {
    position: relative;
    appearance: none;
    height: 3px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const VolumeContainer = styled.div``;

const Title = styled.div`
  margin: 0;
`;

const Button = styled.div`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;
type Props = {};

export default function AudioPlayer({}: Props) {
  const [duration, setDuration] = React.useState(0);
  const currentlyPlaying = useStore(store, (state) => state.currentlyPlaying);
  const isPlaying = useStore(store, (state) => state.isPlaying);
  const [currentProgress, setCurrentProgress] = useState(0);

  const audioElem = useRef<HTMLAudioElement | null>(null);

  const handlePlayClick = () => {
    if (isPlaying) {
      audioElem.current?.pause();
      store.setState({ isPlaying: false });
    } else {
      audioElem.current?.play();
      store.setState({ isPlaying: true });
    }
  };

  useEffect(() => {
    if (isPlaying && audioElem.current) {
      audioElem.current.currentTime = 0;
      audioElem.current?.play();
    } else {
      audioElem.current?.pause();
    }

    if (!store.getState().isPlaying) return;

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
      return (event.returnValue = '');
    }
    window.addEventListener('beforeunload', handleBeforeUnload, { capture: true });
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true });
    };
  }, [isPlaying, currentlyPlaying]);

  const onPlaying = () => {
    // const duration = audioElem.current.
  };
  // onTimeUpdate={onplaying()}
  return (
    <Container>
      <audio
        src={currentlyPlaying?.file}
        ref={audioElem}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => {
          setCurrentProgress(e.currentTarget.currentTime);
        }}
      />
      <Button onClick={() => handlePlayClick()}>
        {isPlaying ? <PauseIcon fontSize='large' /> : <PlayIcon fontSize='large' />}
      </Button>
      <PlayerContainer>
        <Title>{currentlyPlaying?.title}</Title>
        <ProgressBar
          type='range'
          name='progress'
          min={0}
          max={duration}
          value={currentProgress}
          onChange={(e) => {
            if (!audioElem.current) return;

            audioElem.current.currentTime = e.currentTarget.valueAsNumber;

            setCurrentProgress(e.currentTarget.valueAsNumber);
          }}
        />
      </PlayerContainer>
      <VolumeContainer>slider</VolumeContainer>
    </Container>
  );
}
