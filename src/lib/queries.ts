import { gql } from "@apollo/client";

export const GET_PAGINATED_POPULAR_ANIMES = gql`
  query GetPopularAnimes($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(sort: POPULARITY_DESC, type: ANIME) {
        id
        title {
          english
          native
        }
        startDate {
          year
        }
        siteUrl
        favourites
        description
        episodes
        genres
        coverImage {
          large
          extraLarge
        }
        bannerImage
        averageScore
      }
    }
  }
`;

export const GET_PAGINATED_UPCOMING_ANIMES = gql`
  query GetUpcomingAnimes($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(sort: POPULARITY_DESC, type: ANIME, status: NOT_YET_RELEASED) {
        id
        title {
          english
          native
        }
        startDate {
          year
          month
          day
        }
        siteUrl
        favourites
        description
        episodes
        genres
        coverImage {
          extraLarge
        }
        bannerImage
      }
    }
  }
`;

export const GET_HERO_SECTION_ANIMES = gql`
  query GetHeroSectionAnimes {
    Page(page: 1, perPage: 100) {
      media(
        sort: POPULARITY_DESC
        type: ANIME
        status_in: [RELEASING, FINISHED]
        averageScore_greater: 90
      ) {
        id
        title {
          english
          native
        }
        averageScore
        bannerImage
        coverImage {
          extraLarge
        }
        description
        startDate {
          year
          month
          day
        }
      }
    }
  }
`;

export const GET_PAGINATED_RECENT_ANIMES = gql`
  query GetUpcomingAnimesFrom2024($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(sort: START_DATE_DESC, type: ANIME, startDate_greater: 20240101) {
        id
        title {
          english
          native
        }
        startDate {
          year
          month
          day
        }
        coverImage {
          extraLarge
        }
        bannerImage
        description
        averageScore
      }
    }
  }
`;

export const GET_ANIME_BY_ID = gql`
  query GetAnimeById($id: Int!) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      description
      episodes
      duration
      genres
      averageScore
      popularity
      coverImage {
        extraLarge
      }
      bannerImage
      siteUrl
    }
  }
`;

export const GET_ANIMES_BY_IDS = gql`
  query GetAnimesByIds($ids: [Int!]!) {
    Page {
      media(id_in: $ids, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        description
        episodes
        duration
        genres
        averageScore
        popularity
        startDate {
          year
          month
          day
        }
        coverImage {
          extraLarge
        }
        bannerImage
        siteUrl
      }
    }
  }
`;

export const SEARCH_ANIMES_BY_TITLE = gql`
  query ($search: String, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(search: $search, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        description
        episodes
        genres
        averageScore
        popularity
        coverImage {
          extraLarge
        }
        bannerImage
        siteUrl
      }
    }
  }
`;

export const GET_ANIMES_WITH_FILTERS = gql`
  query GET_ANIMES_WITH_FILTERS(
    $genders: [String!]
    $ratingMin: Int
    $ratingMax: Int
    $statuses: [MediaStatus]
    $page: Int
    $perPage: Int
  ) {
    Page(page: $page, perPage: $perPage) {
      media(
        genre_in: $genders
        averageScore_greater: $ratingMin
        averageScore_lesser: $ratingMax
        status_in: $statuses
      ) {
        id
        title {
          english
          native
        }
        genres
        averageScore
        status
        bannerImage
        coverImage {
          extraLarge
        }
      }
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
    }
  }
`;
