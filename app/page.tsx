import React from "react";
import { Field } from "@/components/ui/field";
import { Input, Stack, Heading, Image } from "@chakra-ui/react";

const page = () => {
  return (
    <section className="information-container">
      <div className="flex-center information-image-container">
        <Image src="morty-headshot.png" alt="morty headshot" className="information-image"/>
      </div>
      <div className="input-container">
        <Heading as="h1" size="4xl" fontWeight="bold" className="information-heading">Rick told me not to talk with strangers!!!</Heading>
        <Stack className="mt-10">
          <Field orientation="vertical" label="Username" className="input-wrapper">
            <Input placeholder="Enter your username" flex={1} className="input-field"/>
          </Field>
          <Field orientation="vertical" label="Job Title" className="input-wrapper">
            <Input placeholder="Enter your job title" flex={1} className="input-field"/>
          </Field>
        </Stack>
      </div>
    </section>
  );
};

export default page;
