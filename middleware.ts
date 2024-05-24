import NextAuth from "next-auth"
import authConfig from "./service/auth.config"
// import { NextRequest } from "next/server";
// import { NextApiRequest } from "next";
// import { NextAuthRequest } from "next-auth/internals/utils";
// import { NextAuthOptions } from "next-auth";
// import NextAuth from "next-auth";
import { type NextRequest } from "next/server";

 
// export const { auth as middleware } = NextAuth(authConfig)

const publicRoutes = [
  "/",
  "/docs"
];

const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password"
];

const apiAuthPrefix = "/api/auth";
const DEFAULT_LOGIN_REDIRECT = "/apps";


const { auth } = NextAuth(authConfig);

interface AuthMiddlewareRequest {
  auth?: any;
  nextUrl: URL;
}

interface AuthMiddlewareOptions {
  publicRoutes: string[];
  authRoutes: string[];
  apiAuthPrefix: string;
  DEFAULT_LOGIN_REDIRECT: string;
}

export default function authMiddleware(
  req: AuthMiddlewareRequest,
  options: AuthMiddlewareOptions
): Response | null {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/api/auth/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return null;
}

// const publicRoutes: string[] = [
//   "/",
//   "/docs"
// ];
// const authRoutes: string[] = [
//   "/auth/login",
//   "/auth/register",
//   "/auth/error",
//   "/auth/reset",
//   "/auth/new-password"
// ];
// const apiAuthPrefix: string = "/api/auth";
// const DEFAULT_LOGIN_REDIRECT: string = "/apps";
// const authConfig: NextAuthOptions = {}; // Replace with your actual auth config
// const { auth } = NextAuth(authConfig);

// export default authMiddleware;

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
// export const config = {
//   matcher: '/apps/:path*',
// }
