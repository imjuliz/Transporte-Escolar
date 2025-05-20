// // middleware.js
// import { NextResponse } from "next/server";

// export function authMiddleware(request) {
//   const token = request.cookies.get("sessionId"); // ou outro nome do cookie

//   const url = request.nextUrl.clone();

//   if (!token) {
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// // rotas que serão protegidas 
// export const config = {
//   matcher: [
//     "/administrador/:path*",
//     "/motorista/:path*",
//     "/aluno/:path*",
//     "/responsavel/:path*"
//   ],
// };
