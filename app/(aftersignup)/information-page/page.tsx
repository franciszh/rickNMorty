import React from "react";
import type { Metadata } from "next";
import { query } from "@/app/lib/ApolloClient";
import { InformationGrid } from "@/app/ui/information-grid";
import { getCharacters, getCharacter } from "@/app/lib/gql";
import { Pagination } from "../../ui/pagination";
import { InformationModal } from "../../ui/information-modal";
import { Heading } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Information Page",
  description: "You are viewing the amazing gallery of Rick and Morty",
};

// This API is very unlikely to change
export const revalidate = 3600;

interface InformationPageProps {
  searchParams?: Promise<{
    page?: string;
    charId?: string;
  }>;
}

const page = async (props: InformationPageProps) => {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const charId = searchParams?.charId;

  // fetch the entire char list, it is a must to have for the page
  const { data: charListData, error: charListError } = await query({
    query: getCharacters,
    variables: { currentPage },
  });

  let charData = null;
  // fetch one character if the charId is in url params
  if (charId) {
    const { data, error: charError } = await query({
      query: getCharacter,
      variables: { id: charId },
    });

    // throw the error and let the closed error page to catch it
    if (charError) {
      throw new Error("fetch character failed");
    }
    charData = data?.character;
  }

  // throw the error and let the closed error page to catch it
  if (charListError) {
    throw new Error("fetch characters failed");
  }

  const { characters } = charListData;
  const charList = characters.results;
  const { count } = characters.info;
  return (
    <section>
      <Heading as="h1" size="4xl" className="information-heading ml-5 py-10">
        Welcome to the family of Rick and Morty
      </Heading>
      <InformationGrid charList={charList} />
      <Pagination count={count} pageSize={20} />
      {charData && <InformationModal {...charData} />}
    </section>
  );
};

export default page;
