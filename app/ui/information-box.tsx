"use client";

import { Box, HStack, Badge, Text, Center } from "@chakra-ui/react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export interface InformationBoxProps {
  name: string;
  species: string;
  gender: string;
  image: string;
  id: string;
}

export const InformationBox = (props: InformationBoxProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { name, species, gender, image, id } = props;

  const createPageURL = (charId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("charId", charId);
    return `${pathname}?${params.toString()}`;
  };
  return (
    <Center width="100%">
      <Link href={createPageURL(id)} tabIndex={0}>
        <Box width="300px" borderWidth="1px">
          <Image
            src={image}
            alt={`${name}'s character image`}
            width={300}
            height={300}
            priority={true}
          />
          <Box backgroundColor="#e4a788" p="4" spaceY="2">
            <HStack gap="1">
              <Text>Name:</Text>
              <Badge colorPalette="teal" variant="solid">
                {name}
              </Badge>
            </HStack>
            <HStack gap="1">
              <Text>Species:</Text>
              <Badge colorPalette="teal" variant="solid">
                {species}
              </Badge>
            </HStack>
            <HStack gap="1">
              <Text>Gender:</Text>
              <Badge colorPalette="teal" variant="solid">
                {gender}
              </Badge>
            </HStack>
          </Box>
        </Box>
      </Link>
    </Center>
  );
};
