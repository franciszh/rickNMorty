import { z } from "zod";

export type SessionPayload = {
  userName?: string;
  jobTitle?: string;
};

export const SignupFormSchema = z.object({
  userName: z.string({ required_error: "User Name is required" }),
  jobTitle: z.string({ required_error: "Job Title is required" }),
});

export type FormState = {
  errors?: {
    userName?: string[];
    jobTitle?: string[];
  };
  message?: string;
};
