"use client";

import { useActionState } from "react";
import { Field } from "@/components/ui/field";
import { Input, Stack } from "@chakra-ui/react";
import { signup, uplete } from "@/app/actions/auth";
import { Alert } from "@/components/ui/alert";
import { FormState } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";

interface InformationFormProps {
  defaultUserName?: string;
  defaultJobTitle?: string;
}

export const InformationForm = (props: InformationFormProps) => {
  const { defaultJobTitle, defaultUserName } = props;
  const isToEditInformationForm = !!(defaultJobTitle && defaultUserName);
  const formServerAction = isToEditInformationForm ? uplete : signup;
  const [state, action, isPending] = useActionState<FormState, FormData>(
    formServerAction,
    {}
  );

  return (
    <form
      action={action}
      onSubmit={(e) => {
        e.stopPropagation();
      }}
    >
      <Stack className="mt-10">
        {state?.message && (
          <Alert
            role="alert"
            aria-live="polite"
            status="success"
            title={state.message}
          />
        )}
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
            colorPalette="teal"
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
            colorPalette="teal"
          />
        </Field>
        <Button
          type="submit"
          size="md"
          variant="solid"
          className="information-button"
          aria-label="hit the button to submit the username and job title"
          tabIndex={0}
          loading={isPending}
          loadingText="Submitting"
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
};
