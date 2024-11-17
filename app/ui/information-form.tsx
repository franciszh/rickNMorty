"use client";

import { useActionState } from "react";
import { Field } from "@/components/ui/field";
import { Input, Stack, Button } from "@chakra-ui/react";
import { signup, uplete } from "@/app/actions/auth";
import { Alert } from "@/components/ui/alert";

interface InformationFormProps {
  defaultUserName?: string;
  defaultJobTitle?: string;
}

export const InformationForm = (props: InformationFormProps) => {
  const { defaultJobTitle, defaultUserName } = props;
  const isToEditInformationForm = !!(defaultJobTitle && defaultUserName);
  const formServerAction = isToEditInformationForm ? uplete : signup;
  const [state, action] = useActionState(formServerAction, {});

  return (
    <form action={action}>
      <Stack className="mt-10">
        <Field
          orientation="vertical"
          label="Username"
          className="input-wrapper"
          required={!isToEditInformationForm}
          invalid={!!state?.errors?.userName}
          errorText={state?.errors?.userName}
        >
          <Input
            name="userName"
            placeholder="Enter your username"
            flex={1}
            className="input-field"
            defaultValue={defaultUserName}
          />
        </Field>
        <Field
          orientation="vertical"
          label="Job Title"
          className="input-wrapper"
          required={!isToEditInformationForm}
          invalid={!!state?.errors?.jobTitle}
          errorText={state?.errors?.jobTitle}
        >
          <Input
            name="jobTitle"
            placeholder="Enter your job title"
            flex={1}
            className="input-field"
            defaultValue={defaultJobTitle}
          />
        </Field>
        {state?.message && <Alert status="success" title={state.message} />}
        <Button
          type="submit"
          size="md"
          variant="solid"
          className="information-button"
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
};
