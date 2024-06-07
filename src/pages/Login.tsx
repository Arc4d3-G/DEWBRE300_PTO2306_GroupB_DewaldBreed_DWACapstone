import { useEffect } from 'react';
import styled from 'styled-components';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import { store } from '../main';
import supabase from '../utils/supabase';
import { User } from '../model/useStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;

  color: ${({ theme }) => theme.primary};
`;

const AuthBox = styled.div`
  width: 300px;
  padding: 20px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.bg};
  align-items: center;
`;

const AccountDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogOutBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100px;
  height: 2rem;
  background-color: ${({ theme }) => theme.primary};

  color: ${({ theme }) => theme.bg};
  border-radius: 12px;
  cursor: pointer;
`;

type Props = {
  user: User | null;
};

export default function Login({ user }: Props) {
  const handleLogout = () => {
    supabase.auth.signOut();
    store.getState().setUser();
  };
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        store.getState().setUser();
        navigate('/Home');
      }
    });

    return () => subscription.unsubscribe();
  });

  const viewAuth = (
    <Auth
      supabaseClient={supabase}
      providers={[]}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: '#55cc88',
              inputText: '#55cc88',
            },
          },
        },
      }}
      localization={{
        variables: {
          sign_in: {
            button_label: 'Login',
          },
        },
      }}
      redirectTo=''
    />
  );

  const viewAccount = (
    <>
      <AccountDetails>
        Logged in as "{user?.email}"<LogOutBtn onClick={() => handleLogout()}>Logout</LogOutBtn>
      </AccountDetails>
    </>
  );

  return (
    <Container>
      <AuthBox>{user === null ? viewAuth : viewAccount}</AuthBox>
    </Container>
  );
}
