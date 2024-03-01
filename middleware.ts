// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(request: NextRequestWithAuth) {
        // console.log(request.nextUrl.pathname)
        console.log('TOKEN MIDDLE WARE =', request.nextauth.token)

        if (request.nextUrl.pathname.startsWith("/admin")
            && request.nextauth.token?.role !== "admin") {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }
        if (request.nextUrl.pathname.startsWith("/admin")
            && request.nextauth.token?.role !== "admin") {
            console.log(request.nextUrl.pathname.startsWith("/app"))
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }
        // if (request.nextUrl.pathname.startsWith("/app")
        //     && request.nextauth.token?.role !== "student"
        //     || request.nextauth.token?.status !== "super admin") {
        //     return NextResponse.rewrite(
        //         new URL("/denied", request.url)
        //     )
        // }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)
export const config = {
    matcher: [
        '/app',
        "/app/courses",
        "/app/upcoming-courses",
        "/app/live-courses",
        "/app/chat",
        "/app/assignment",
        '/admin',
        "/admin/chat",
        "/admin/upload",
        "/admin/upload-meet",
        "/admin/upload-assignment",
        "/admin/upload-project",
        "/admin/add-new",
        "/admin/my-students",
        "/admin/students",
        "/admin/admins"]
}

