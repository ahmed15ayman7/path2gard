
export { default } from "next-auth/middleware"
export const config = {
    matcher: [
        "/admin/:path*",
        "/doctor/:path*",
        "/student/:path*",
        "/cv/:path*",
        "/dashboard/:path*",
        "/profile/:path*",
        "/graduation-project/:path*",
        "/internship/:path*",
        "/recommendation/:path*",
        "/ta/:path*",
        "/track/:path*",
    ],
};