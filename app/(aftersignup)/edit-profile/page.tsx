import React from "react";
import { Heading, Image } from "@chakra-ui/react";
import { InformationForm } from "@/app/ui/information-form";

const page = () => {
  return (
    <div className="flex-center">
      <section className="information-container">
        <div className="flex-center information-image-container">
          <Image
            src="rick-headshot.png"
            alt="rick headshot"
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
            Look, everyone deserves a second chance, you might also want to
            erase yourself from this universe.
          </Heading>
          <InformationForm />
        </div>
      </section>
    </div>
  );
};

export default page;
