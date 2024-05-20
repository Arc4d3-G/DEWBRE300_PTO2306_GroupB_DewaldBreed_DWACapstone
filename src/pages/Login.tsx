import React from 'react';
import styled from 'styled-components';
import { AccountCircle as AccountIcon } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding-top: 100px;
  color: ${({ theme }) => theme.primary};
  height: 100vh;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const SubmitBtn = styled.button`
  margin-top: 20px;
  width: 80%;
  height: 2rem;
  background-color: ${({ theme }) => theme.primary};
  border: solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  cursor: pointer;
`;

export default function Login() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container>
      <Flex>
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
      </Flex>
    </Container>
  );
}
