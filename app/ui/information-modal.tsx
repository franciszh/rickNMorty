"use client";
import {
  Box,
  HStack,
  Badge,
  Text,
  Center,
  Heading,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface InformationModalProps {
  name: string;
  species: string;
  gender: string;
  image: string;
  id: string;
  status: string;
  type: string;
  location: {
    name: string;
  };
  origin: {
    name: string;
  };
}

export const InformationModal = (props: InformationModalProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const characterId = searchParams.get("charId");

  const createPageURL = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("charId");
    return `${pathname}?${params.toString()}`;
  };

  if (!characterId) {
    return null;
  }

  const { name, species, gender, image, status, type, location, origin } =
    props;
  const { name: locationName } = location;
  const { name: originName } = origin;

  return (
    <div className="information-modal-overlay">
      <div className="information-modal-container">
        <div className="text-center">
          <Heading
            as="h1"
            fontWeight="bold"
            className="information-modal-heading"
          >
            {name}
          </Heading>
        </div>
        <Center>
          <Box width="100%">
            <Image src={image} alt={name} width={400} height={400} />
            <Box backgroundColor="#e4a788" p="4" spaceY="2">
              <HStack gap="2">
                <Text>Gender:</Text>
                <Badge colorPalette="teal" variant="solid">
                  {gender}
                </Badge>
              </HStack>
              <HStack gap="2">
                <Text>Species:</Text>
                <Badge colorPalette="teal" variant="solid">
                  {species}
                </Badge>
              </HStack>
              <HStack gap="2">
                <Text>Status:</Text>
                <Badge colorPalette="teal" variant="solid">
                  {status}
                </Badge>
              </HStack>
              <HStack gap="2">
                <Text>Live:</Text>
                <Badge colorPalette="teal" variant="solid">
                  {locationName}
                </Badge>
              </HStack>
              <HStack gap="2">
                <Text>Origin:</Text>
                <Badge colorPalette="teal" variant="solid">
                  {originName}
                </Badge>
              </HStack>
              <HStack gap="2">
                <Text>Type:</Text>
                <Badge colorPalette="teal" variant="solid">
                  {type || "unknown"}
                </Badge>
              </HStack>
            </Box>
          </Box>
        </Center>
        <div className="flex justify-center mt-4">
          <Button
            type="button"
            size="md"
            variant="solid"
            className="information-modal-button"
            onClick={() => router.push(createPageURL())}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
