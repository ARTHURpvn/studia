import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  const protectedRoutes = ["/", "/folders", "/calendar", "/materias"];
  const isProtected = protectedRoutes.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route),
  );

  if (!token && isProtected) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
