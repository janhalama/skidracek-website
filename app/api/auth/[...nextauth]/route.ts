/**
 * NextAuth route for App Router (v4 style handler).
 * Mounted at /api/auth/[...nextauth]. Node runtime.
 */

export const runtime = 'nodejs';

import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth-options';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


