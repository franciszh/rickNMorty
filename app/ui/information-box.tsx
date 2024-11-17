import { Box, HStack, Badge, Text, Center } from "@chakra-ui/react";
import Image from "next/image";

export interface InformationBoxProps {
  name: string;
  species: string;
  gender: string;
  image: string;
  id: string;
}

export const InformationBox = (props: InformationBoxProps) => {
  const { name, species, gender, image } = props;
  return (
    <Center width="100%">
      <Box width="300px" borderWidth="1px">
        <Image src={image} alt={name} width={300} height={300} />
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
    </Center>
  );
};
