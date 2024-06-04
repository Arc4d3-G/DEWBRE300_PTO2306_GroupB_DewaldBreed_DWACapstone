import React, { useEffect, useState } from 'react';
import { Episode, Season, Show } from '../api/createApi';
import styled from 'styled-components';
import {
  PlayCircleOutline as PlayIcon,
  FavoriteBorder as FavHollowIcon,
  Favorite as FavSolidIcon,
} from '@mui/icons-material';
import { store } from '../main';
import supabase from '../utils/supabase';
import { UserData } from '../model/useStore';
import { useStore } from 'zustand';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.bgLight};
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  overflow: hidden;
`;

const Details = styled.div`
  margin: 10px;
  width: 80%;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  font-size: 15px;
`;
const Description = styled.div`
  font-size: 12px;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_secondary};
`;

const Buttons = styled.div`
  display: flex;
  padding: 15px;
  gap: 10px;
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  cursor: pointer;
`;

type Props = {
  episode: Episode;
  selectedSeason: number;
  selectedShow: string;
  isAlreadyFavorite: boolean;
};

export default function EpisodeCard({
  episode,
  selectedSeason,
  selectedShow,
  isAlreadyFavorite,
}: Props) {
  const user = store.getState().user;
  const [isFavorite, setIsFavorite] = useState(false);
  const { title, description, episode: episodeNum } = episode;
  const currentlyPlaying = useStore(store, (state) => state.currentlyPlaying);

  useEffect(() => {
    setIsFavorite(isAlreadyFavorite);
  }, [isAlreadyFavorite]);

  const handlePlayClick = () => {
    if (currentlyPlaying === episode) {
      return;
    } else {
      store.setState({ currentlyPlaying: episode });
      store.setState({ isPlaying: true });
    }
  };

  const handleFavClick = async () => {
    const userData = {
      user_id: user?.id,
      show_id: selectedShow,
      season_num: selectedSeason,
      episode_num: episodeNum,
    };

    if (!user) return;

    if (!isFavorite) {
      const { data } = await supabase.from('UserData').insert(userData);
      setIsFavorite(true);
      store.getState().updateUserFavorites();
    } else {
      const { data } = await supabase.from('UserData').delete().match(userData);
      setIsFavorite(false);
      store.getState().updateUserFavorites();
    }
  };

  return (
    <Container>
      <Details>
        <Title>{`S${selectedSeason}E${episodeNum} - ${title}`}</Title>
        <Description>{description ? description : 'No description found'}</Description>
      </Details>
      <Buttons>
        <Button onClick={() => handlePlayClick()}>
          <PlayIcon fontSize='large' />
        </Button>
        {user && (
          <Button onClick={() => handleFavClick()}>
            {isFavorite ? <FavSolidIcon fontSize='large' /> : <FavHollowIcon fontSize='large' />}
          </Button>
        )}
      </Buttons>
    </Container>
  );
}
