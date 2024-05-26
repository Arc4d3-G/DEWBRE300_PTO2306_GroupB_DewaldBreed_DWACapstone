export const GENRES: { [key: number]: string } = {
  1: 'Personal Growth',
  2: 'True Crime and Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family',
};

export type genreIds = Array<number>;

export type Preview = {
  id: string;
  title: string;
  description: string;
  seasons: number;
  image: string;
  genres: genreIds;
  updated: string;
};

export type Episode = {
  title: string;
  description: string;
  episode: number;
  file: string;
};

export type Season = {
  season: number;
  title: string;
  image: string;
  episodes: Array<Episode>;
};
export type Show = {
  id: string;
  title: string;
  description: string;
  seasons: Array<Season>;
  image: string;
  updated: string;
  genres: Array<string>;
};

export type Api = {
  getPreviewsList: () => Promise<Array<Preview>>;
  getShowDetails: (id: string) => Promise<Show>;
};

const URL = 'https://podcast-api.netlify.app/';

export const getPreviewsList: Api['getPreviewsList'] = () => {
  const result = fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Something went wrong connecting to the API');
      }
      return response;
    })
    .then((response) => response.json())
    .then((data) => {
      const result = data.map((item: Preview) => ({
        ...item,
        updated: new Date(item.updated).toLocaleDateString('en-gb', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      }));
      return result;
    });
  return result;
};

export const getShowDetails: Api['getShowDetails'] = (id) => {
  const result = fetch(`${URL}id/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Something went wrong connecting to the API');
      }
      return response;
    })
    .then((response) => response.json());
  return result;
};

export const createApi = (): Api => {
  return {
    getPreviewsList,
    getShowDetails,
  };
};
