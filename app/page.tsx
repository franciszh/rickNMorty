import React from "react";
import { Heading } from "@chakra-ui/react";
import { InformationForm } from "@/app/ui/information-form";
import Image from "next/image";
import type { Metadata } from "next";
import mortyHead from "@/public/morty-headshot.png";

export const metadata: Metadata = {
  title: "Can you let us know you at first?",
};

const page = () => {
  return (
    <div className="flex-center">
      <section className="information-container">
        <div className="flex-center information-image-container">
          <Image
            src={mortyHead}
            alt="morty headshot"
            height={300}
            width={300}
            priority
          />
        </div>
        <div className="input-container">
          <Heading
            as="h1"
            size="4xl"
            fontWeight="bold"
            className="information-heading"
          >
            Rick told me not to talk with strangers!!!
          </Heading>
          <InformationForm />
        </div>
      </section>
    </div>
  );
};

export default page;
