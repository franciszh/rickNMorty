import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/sessions";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/information-page", "/edit-profile"];
const publicRoutes = ["/"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // 4. Redirect to / if the user is not authenticated
  const isUserAuthenticated = session?.userName && session?.jobTitle;
  if (isProtectedRoute && !isUserAuthenticated) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // 5. Redirect to /information-page if the user is authenticated
  if (
    isPublicRoute &&
    isUserAuthenticated &&
    !req.nextUrl.pathname.startsWith("/information-page")
  ) {
    return NextResponse.redirect(new URL("/information-page", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
