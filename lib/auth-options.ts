/**
 * Central NextAuth options used by both the API route and server helpers.
 */

import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { resolveAllowedAdmins } from '@/lib/auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user }) {
      try {
        const email = user?.email?.toLowerCase();
        if (!email) return false;
        const allowed = await resolveAllowedAdmins();
        return allowed.includes(email);
      } catch {
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      try {
        if (url.startsWith('/')) return `${baseUrl}${url}`;
        const target = new URL(url);
        if (target.origin === baseUrl) return url;
      } catch {}
      return baseUrl;
    },
  },
};


