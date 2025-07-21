import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const protectedRoutes = ["/folders", "/calendar", "/materias"];
  const url = req.nextUrl.clone();

  if (
    !token &&
    protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
