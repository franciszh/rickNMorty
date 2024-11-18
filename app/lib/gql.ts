import { gql } from "@apollo/client";

export const getCharacters = gql`
  query getCharacters($currentPage: Int!) {
    characters(page: $currentPage) {
      info {
        count
        pages
      }
      results {
        id
        name
        species
        gender
        image
      }
    }
  }
`;

export const getCharacter = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      type
      status
      origin {
        name
      }
      location {
        name
      }
      species
      gender
      image
    }
  }
`;
