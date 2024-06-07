import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  PlayCircleOutline as PlayIcon,
  PauseCircleOutlineOutlined as PauseIcon,
  VolumeUp as VolumeIcon,
} from '@mui/icons-material';
import { store } from '../main';
import { useStore } from 'zustand';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  position: fixed;
  bottom: 0;
  background: ${({ theme }) => theme.bg};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transition: 0.5s;
  padding: 20px 0px;
  color: ${({ theme }) => theme.primary};
`;

const PlayerContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonContainer = styled.div`
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 500px;
  min-width: 100px;
  /* max-width: 500px; */
  gap: 5px;
`;

const ProgressBar = styled.input`
  width: 80%;
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

const Timer = styled.div`
  font-size: 10px;
`;

const VolumeContainer = styled.div`
  width: 100px;
`;

const VolumeDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 750px) {
    display: none;
  }
`;

const VolumeSlider = styled.input`
  width: 80%;
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 3px;
    position: relative;
  }
  &::-webkit-slider-thumb {
    position: relative;
    appearance: none;
    height: 3px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Title = styled.div`
  margin: 0;
`;

const Button = styled.div`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

export default function AudioPlayer() {
  const [duration, setDuration] = React.useState(0);
  const currentlyPlaying = useStore(store, (state) => state.currentlyPlaying);
  const isPlaying = useStore(store, (state) => state.isPlaying);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [volume, setVolume] = useState(0.2);

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

  const handleVolumeChange = (volumeValue: number) => {
    if (!audioElem.current) return;
    audioElem.current.volume = volumeValue;
    setVolume(volumeValue);
  };

  const formatDurationDisplay = (duration: number) => {
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration - min * 60);
    const formatted = [min, sec].map((n) => (n < 10 ? '0' + n : n)).join(':'); // format - mm:ss
    return formatted;
  };

  const durationDisplay = formatDurationDisplay(duration);
  const elapsedDisplay = formatDurationDisplay(currentProgress);

  useEffect(() => {
    console.log('use Effect');
    if (isPlaying && audioElem.current) {
      audioElem.current.volume = volume;
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

  // const onPlaying = () => {
  // const duration = audioElem.current.
  // };
  // onTimeUpdate={onplaying()}
  return (
    <Container>
      <Title>{currentlyPlaying?.title}</Title>
      <PlayerContainer>
        <audio
          src={currentlyPlaying?.file}
          ref={audioElem}
          onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) => {
            setCurrentProgress(e.currentTarget.currentTime);
          }}
        />
        <ButtonContainer>
          <Button onClick={() => handlePlayClick()}>
            {isPlaying ? <PauseIcon fontSize='large' /> : <PlayIcon fontSize='large' />}
          </Button>
        </ButtonContainer>

        <ProgressBarContainer>
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
          <Timer>
            {elapsedDisplay} / {durationDisplay}
          </Timer>
        </ProgressBarContainer>
        <VolumeContainer>
          <VolumeDiv>
            <VolumeIcon fontSize='medium' />
            <VolumeSlider
              aria-label='volume'
              name='volume'
              type='range'
              min={0}
              step={0.05}
              max={1}
              value={volume}
              onChange={(e) => {
                handleVolumeChange(e.currentTarget.valueAsNumber);
              }}
            />
          </VolumeDiv>
        </VolumeContainer>
      </PlayerContainer>
    </Container>
  );
}
