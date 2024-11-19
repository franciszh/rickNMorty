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
            placeholder="data:image/jpeg;base64,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"
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
