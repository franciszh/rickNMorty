import React from "react";
import { Heading, Image } from "@chakra-ui/react";
import { InformationForm } from "@/app/ui/information-form";

const page = () => {
  return (
    <section className="information-container">
      <div className="flex-center information-image-container">
        <Image
          src="morty-headshot.png"
          alt="morty headshot"
          className="information-image"
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
  );
};

export default page;
