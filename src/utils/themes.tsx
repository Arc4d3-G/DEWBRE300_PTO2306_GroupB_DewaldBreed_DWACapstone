export type Theme = {
  bg: string;
  bgLight: string;
  primary: string;
  text_primary: string;
  text_secondary: string;
  card: string;
  button: string;
};

export const darkTheme: Theme = {
  bg: '#15171E',
  bgLight: '#1C1E27',
  primary: '#55cc88',
  text_primary: '#F2F3F4',
  text_secondary: '#b1b2b3',
  card: '#121212',
  button: '#5c5b5b',
};

export const lightTheme: Theme = {
  bg: '#FFFFFF',
  bgLight: '#f0f0f0',
  primary: '#55cc88',
  text_primary: '#111111',
  text_secondary: '#48494a',
  card: '#FFFFFF',
  button: '#b1b2b3',
};
