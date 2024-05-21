import { auth } from "@/service/auth"
 
export default auth((req) => {
  if (!req.auth) {
    const url = req.url.replace(req.nextUrl.pathname, "/api/auth/signin")
    return Response.redirect(url)
  }
})
export const config = {
  matcher: '/apps/:path*',
}
