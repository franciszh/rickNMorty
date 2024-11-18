"use server";

import { redirect } from "next/navigation";
import {
  createSession,
  updateSession,
  deleteSession,
} from "@/app/lib/sessions";
import {
  SignupFormSchema,
  UpleteFormSchema,
  FormState,
} from "@/app/lib/definitions";

// create the session
export async function signup(_: FormState, formData: FormData) {
  // simple non-null service end validation
  const validatedFields = SignupFormSchema.safeParse({
    userName: formData.get("userName"),
    jobTitle: formData.get("jobTitle"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await createSession(
    validatedFields.data.userName,
    validatedFields.data.jobTitle
  );

  redirect("./information-page");
}
// update or delete the session
export async function uplete(_: FormState, formData: FormData) {
  // Empty strings are allowed to test session removal
  const validatedFields = UpleteFormSchema.safeParse({
    userName: formData.get("userName"),
    jobTitle: formData.get("jobTitle"),
  });
  const { userName, jobTitle } = validatedFields.data!;

  if (!userName || !jobTitle) {
    await deleteSession();
    redirect("/");
  }

  await updateSession(userName, jobTitle);

  return {
    message: "Well you've got a new identity in this world.",
  };
}
