import { NextResponse } from "next/server"

// export default withAuth(
// `withAuth` augments your `Request` with the user's token.
export default function middleware() {
  // const token = req.nextauth.token
  // const authorized = Boolean(token) ? true : Boolean(token?.access)

  // const signInURL = new URL("/auth/signin", req.nextUrl.origin)
  // if (!authorized) return NextResponse.redirect(signInURL)
  return NextResponse.next()
}
// )

export const config = { matcher: ["/app/:path*"] }
