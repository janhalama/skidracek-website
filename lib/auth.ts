/**
 * Minimal auth scaffolding and admin allowlist helper.
 * Integrates with content block 'admin-allowlist' and falls back to env while Auth is not wired.
 */

import { fetchContentBlock } from './content-service';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth-options';

/*
  Returns current user email once Auth.js is configured. Throws until then.
*/
export async function getCurrentUserEmail(): Promise<string> {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? null;
  if (!email) throw new Error('Not authenticated');
  return email;
}

/*
  Resolves the admin allowlist from content or environment.
*/
export async function resolveAllowedAdmins(): Promise<string[]> {
  const block = await fetchContentBlock('admin-allowlist');
  if (block && block.data && Array.isArray((block.data as any).emails)) {
    return ((block.data as any).emails as string[]).map((e) => e.toLowerCase());
  }

  const envList = process.env.ALLOWED_ADMINS;
  if (!envList) throw new Error('Admin allowlist not configured');
  return envList
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 0);
}

/*
  Returns true when the given email is present in the allowlist.
*/
export async function isEmailAllowed(email: string): Promise<boolean> {
  const list = await resolveAllowedAdmins();
  return list.includes(email.toLowerCase());
}

/*
  Requires that the current user is an allowed admin. Throws otherwise.
*/
export async function requireAdmin(): Promise<string> {
  const email = await getCurrentUserEmail();
  const allowed = await isEmailAllowed(email);
  if (!allowed) throw new Error('Access denied');
  return email;
}



