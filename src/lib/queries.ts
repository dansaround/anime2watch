import { gql } from "@apollo/client";

export const GET_EXAMPLE_DATA = gql`
  query GetAnimes {
    Page {
      media {
        siteUrl
        title {
          english
          native
        }
        description
      }
    }
  }
`;
