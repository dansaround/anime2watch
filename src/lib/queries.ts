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
          large
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
          large
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
          large
        }
        bannerImage
        description
        averageScore
      }
    }
  }
`;
