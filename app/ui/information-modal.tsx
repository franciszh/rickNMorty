"use client";

import { useRef, useEffect } from "react";
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
import { loading } from "./base64Images";

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
  const { name, species, gender, image, status, type, location, origin, id } =
    props;
  const { name: locationName } = location;
  const { name: originName } = origin;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createPageURL = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("charId");
    return `${pathname}?${params.toString()}`;
  };
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLAnchorElement | null>(null);

  // refocus on the source when the modal is dismissed
  useEffect(() => {
    if (!previousFocusRef?.current) {
      previousFocusRef.current = document.activeElement as HTMLAnchorElement;
    }
    return () => {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, []);

  // focus on the modal when it pops up
  useEffect(() => {
    if (previousFocusRef?.current && modalRef?.current) {
      modalRef.current.focus();
    }
  }, [id]);

  // lock the focus in the modal
  useEffect(() => {
    if (modalRef.current) {
      const modalElement = modalRef.current;
      //add any focusable HTML element you want to include to this string
      const focusableElements = modalElement.parentElement!.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLInputElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLInputElement;

      const handleTabKeyPress = (event: {
        key: string;
        shiftKey: unknown;
        preventDefault: () => void;
      }) => {
        if (event.key === "Tab") {
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
          ) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };

      const handleEscapeKeyPress = (event: { key: string }) => {
        if (event.key === "Escape") {
          router.push(createPageURL());
        }
      };

      modalElement.addEventListener("keydown", handleTabKeyPress);
      modalElement.addEventListener("keydown", handleEscapeKeyPress);

      return () => {
        modalElement.removeEventListener("keydown", handleTabKeyPress);
        modalElement.removeEventListener("keydown", handleEscapeKeyPress);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="information-modal-overlay">
      <div
        className="information-modal-container"
        role="dialog"
        aria-modal="true"
        aria-label={`Information of ${name}`}
        tabIndex={0}
        ref={modalRef}
      >
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
            <Image
              src={image}
              alt={name}
              width={400}
              height={400}
              priority
              placeholder={loading}
            />
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
            aria-label="dismiss the modal"
            onClick={() => router.push(createPageURL())}
            tabIndex={0}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
