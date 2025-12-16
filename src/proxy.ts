// proxy file acts as a middleware. Valid for api's and pages
// proxy must runs before any route

import { NextResponse, NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  // get token from headers
  const jwtToken = request.cookies.get("token");
  const token = jwtToken?.value as string;

  // check if user has no token
  if (!token && request.method === "DELETE") {
    return NextResponse.json(
      { message: "no token provided ACCESS DENIED" },
      { status: 401 }
    );
  }
}

// config is an object where developers add proxy to their routes
export const config = {
  matcher: ["/api/users/profile/:path*"],
};
