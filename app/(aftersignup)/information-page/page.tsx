import React from "react";
import type { Metadata } from "next";
import { query } from "@/app/lib/ApolloClient";
import { gql } from "@apollo/client";
import { InformationGrid } from "@/app/ui/information-grid";
import { Pagination } from "@/app/ui/pagination";
import { Heading } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Information Page",
  description: "You are viewing the amazing gallery of Rick and Morty",
};

const getCharacters = gql`
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

interface InformationPageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

const page = async (props: InformationPageProps) => {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  const { data, error } = await query({
    query: getCharacters,
    variables: { currentPage },
  });

  // throw the error and let the closed error page to catch it
  if (error) {
    throw new Error("fetch characters failed");
  }

  const { characters } = data;
  const charList = characters.results;
  const { count } = characters.info;
  return (
    <section>
      <Heading as="h1" size="4xl" className="information-heading ml-5 py-10">
        Welcome to the family of Rick and Morty
      </Heading>
      <InformationGrid charList={charList} />
      <Pagination count={count} pageSize={20} />
    </section>
  );
};

export default page;
