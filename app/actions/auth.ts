"use server";

import { redirect } from "next/navigation";
import { createSession } from "@/app/lib/sessions";
import { SignupFormSchema } from "@/app/lib/definitions";

// create the session
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function signup(formData: any): Promise<any> {
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

  try {
    await createSession(
      validatedFields.data.userName,
      validatedFields.data.jobTitle
    );
  } catch {
    return {
      message: "Sorry something went wrong on our end",
    };
  }
  redirect("./information-page");
}
// update or delete the session
// export async function uplete(state: FormState, formData: FormData) {}
