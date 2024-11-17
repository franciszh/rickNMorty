"use server";

import { redirect } from "next/navigation";
import { createSession, updateSession, deleteSession } from "@/app/lib/sessions";
import { SignupFormSchema, FormState } from "@/app/lib/definitions";

// create the session
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function signup(_: FormState, formData: any): Promise<any> {
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function uplete(_: FormState, formData: any): Promise<any> {
    const userName = formData.get("userName");
    const jobTitle = formData.get("jobTitle");
  
    if (!userName || !jobTitle) {
        await deleteSession();
        redirect("/");
    }

    await updateSession(userName, jobTitle);

    return {
        message: "Well you've got a new identity in this world."
    };
  }