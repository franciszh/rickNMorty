import { z } from "zod";

// Type the session payload
export type SessionPayload = {
  userName?: string;
  jobTitle?: string;
};

// A very simple zod schema nullish validation
export const SignupFormSchema = z.object({
  userName: z.string({ required_error: "Name is required" }),
  jobTitle: z.string({ required_error: "Universe is required" }),
});

export const UpleteFormSchema = z.object({
  userName: z.string(),
  jobTitle: z.string(),
});

// The type of form state for the user profile form
export type FormState = {
  errors?: {
    userName?: string[];
    jobTitle?: string[];
  };
  message?: string;
};
