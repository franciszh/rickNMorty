import React from "react";
import { Heading } from "@chakra-ui/react";
import { InformationForm } from "@/app/ui/information-form";
import { getPayload } from "@/app/lib/sessions";
import type { Metadata } from "next";
import Image from "next/image";
import rickHead from "@/public/rick-headshot.png";

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "You can change your profile information on the page",
};

const page = async () => {
  // get profile information from session
  const payload = await getPayload();

  return (
    <div className="flex-center">
      <section className="information-container">
        <div className="flex-center information-image-container">
          <Image
            src={rickHead}
            alt="rick headshot"
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
            Look, everyone deserves a second chance, you might also want to
            erase yourself from this universe.
          </Heading>
          <InformationForm
            defaultJobTitle={payload?.jobTitle}
            defaultUserName={payload?.userName}
          />
        </div>
      </section>
    </div>
  );
};

export default page;
