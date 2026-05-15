/** Server-side admin email from ADMIN_EMAIL env */
export function getAdminEmail(): string | undefined {
  return process.env.ADMIN_EMAIL?.trim() || undefined;
}

export function isAdminEmail(email: string | undefined | null): boolean {
  const admin = getAdminEmail();
  if (!admin || !email) return false;
  return email.trim().toLowerCase() === admin.toLowerCase();
}
