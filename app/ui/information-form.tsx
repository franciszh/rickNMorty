"use client";

import { useActionState } from "react";
import { Field } from "@/components/ui/field";
import { Input, Stack, Button } from "@chakra-ui/react";
import { signup } from "@/app/actions/auth";
import { Alert } from "@/components/ui/alert";

export const InformationForm = () => {
  const [state, action] = useActionState(signup, {});
  return (
    <form action={action}>
      <Stack className="mt-10">
        <Field
          orientation="vertical"
          label="Username"
          className="input-wrapper"
          required
          invalid={!!state?.errors?.userName}
          errorText={state?.errors?.userName}
        >
          <Input
            name="userName"
            placeholder="Enter your username"
            flex={1}
            className="input-field"
          />
        </Field>
        <Field
          orientation="vertical"
          label="Job Title"
          className="input-wrapper"
          required
          invalid={!!state?.errors?.jobTitle}
          errorText={state?.errors?.jobTitle}
        >
          <Input
            name="jobTitle"
            placeholder="Enter your job title"
            flex={1}
            className="input-field"
          />
        </Field>
        <Button
          type="submit"
          size="md"
          variant="solid"
          className="information-button"
        >
          Submit
        </Button>
        {state?.message && <Alert status="success" title={state.message} />}
      </Stack>
    </form>
  );
};
