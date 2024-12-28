export interface Anime {
  id: number;
  title: {
    english: string | null;
    native: string | null;
  };
  startDate: {
    year: number | null;
  };
  siteUrl: string;
  favourites: number;
  description: string;
  episodes: number | null;
  genres: string[];
  coverImage: {
    extraLarge: string;
  };
  bannerImage: string | null;
  averageScore?: number;
}

export type PageInfo = {
  total: number;
  currentPage: number;
  hasNextPage: boolean;
  lastPage: number;
};

export interface GetPaginatedPopularAnimesInterface {
  Page: {
    pageInfo: PageInfo;
    media: (Anime & { averageScore: number })[];
  };
}

export interface GetPaginatedUpcomingAnimesInterface {
  Page: {
    pageInfo: PageInfo;
    media: Anime[];
  };
}

export interface GetPaginatedRecentAnimesInterface {
  Page: {
    pageInfo: PageInfo;
    media: Anime[];
  };
}

export type ChartData = {
  rates: string;
  points: number;
  fill: string;
};
