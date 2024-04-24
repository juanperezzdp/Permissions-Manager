import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_cookie");

    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const res = await fetch(
      "https://gestordepermisos.vercel.app/api/auth/check",
      {
        headers: {
          token: token.value,
        },
      }
    );

    const data = await res.json();

    // @ts-ignore
    if (!data.isAuthorized) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const decodedToken = jwt.decode(token.value);
    const rol = (decodedToken as JwtPayload).data?.rol;

    // Verificar si el rol es user o admin
    if (rol !== "user" && rol !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Permitir acceso a las rutas /api/users y /api/permission solo para user y admin
    if (
      request.nextUrl.pathname.startsWith("/api/users") ||
      request.nextUrl.pathname.startsWith("/api/permission")
    ) {
      if (rol !== "user" && rol !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    if (rol === "user") {
      if (!request.nextUrl.pathname.startsWith("/homeUser")) {
        return NextResponse.redirect(new URL("/homeUser", request.url));
      }
    } else if (rol === "admin") {
      if (!request.nextUrl.pathname.startsWith("/homeAdmin")) {
        return NextResponse.redirect(new URL("/homeAdmin", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/homeUser/:path*",
    "/homeAdmin/:path*",
    "/api/users",
    "/api/permission",
  ],
};
