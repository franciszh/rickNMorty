import { z } from "zod";

// Type the session payload
export type SessionPayload = {
  userName?: string;
  jobTitle?: string;
};

// A very simple zod schema nullish validation
export const SignupFormSchema = z.object({
  userName: z.string({ required_error: "User Name is required" }),
  jobTitle: z.string({ required_error: "Job Title is required" }),
});

// The type of form state for the user profile form
export type FormState = {
  errors?: {
    userName?: string[];
    jobTitle?: string[];
  };
  message?: string;
};
