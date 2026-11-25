import type { NextAuthConfig } from 'next-auth';

const protectedRoutes = ['/dashboard', '/sales', '/expenses'];

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);
      const isProtected = protectedRoutes.some(
        (route) => nextUrl.pathname === route || nextUrl.pathname.startsWith(`${route}/`)
      );

      if (isProtected) {
        // Returning false sends the visitor to the /login page
        return isLoggedIn;
      }

      if (isLoggedIn && (nextUrl.pathname === '/login' || nextUrl.pathname === '/signup')) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && typeof token.id === 'string') {
        session.user.id = token.id;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
