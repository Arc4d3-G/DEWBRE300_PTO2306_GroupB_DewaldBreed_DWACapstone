import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AccountCircle as AccountIcon } from '@mui/icons-material';

import { SupabaseClient, User } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  /* padding-top: 100px; */
  color: ${({ theme }) => theme.primary};

  /* height: 100vh; */
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
// const Flex = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding-top: 20px;
//   width: 300px;
//   gap: 10px;
// `;

// const InputField = styled.input`
//   color: ${({ theme }) => theme.text_primary};
//   background-color: ${({ theme }) => theme.bgLight};
//   width: 100%;
//   height: 2rem;
//   border: 2px solid ${({ theme }) => theme.primary};
//   padding: 8px 10px;
//   border-radius: 12px;
// `;

// const SubmitBtn = styled.button`
// margin-top: 20px;
// width: 80%;
// height: 2rem;
// background-color: ${({ theme }) => theme.primary};
// border: solid ${({ theme }) => theme.primary};
// color: ${({ theme }) => theme.text_primary};
// border-radius: 12px;
// cursor: pointer;
// `;

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: SupabaseClient<any, 'public', any>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function Login({ supabase, user, setUser }: Props) {
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };
  const handleLogout = () => {
    supabase.auth.signOut();
    setUser(null);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        supabase.auth.getUser().then((userData) => {
          const user = userData.data.user;
          if (user?.id === undefined) {
            setUser(null);
          } else {
            setUser({ id: user.id, email: user?.email });
          }
        });
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

      {/* <Flex>
        <AccountIcon style={{ fontSize: 50 }} />
        <Typography
          component='h1'
          variant='h5'
        >
          Sign in
        </Typography>
        <Form onSubmit={handleSubmit}>
          <InputField
            required
            id='email'
            name='email'
            type='text'
            placeholder='Email'
            autoFocus
          />
          <InputField
            required
            id='password'
            name='password'
            type='text'
            placeholder='Password'
          />
          <SubmitBtn type='submit'>Sign In</SubmitBtn>
        </Form>
      </Flex> */}
    </Container>
  );
}
