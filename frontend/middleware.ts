import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("sb-access-token")?.value;
  const url = req.nextUrl.clone();

  if (!token && url.pathname.startsWith("/")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
