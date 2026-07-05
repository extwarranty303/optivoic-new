import { supabase } from '../supabaseClient';

export const ALLOWED_ADMIN_EMAILS = ['admin@optivoic.com', 'connect@optivoic.com'];

export async function isAuthorizedAdmin(email) {
  if (!email) return false;

  const normalizedEmail = String(email).toLowerCase();
  if (ALLOWED_ADMIN_EMAILS.includes(normalizedEmail)) return true;

  try {
    const { data } = await supabase
      .from('admins')
      .select('email')
      .eq('email', normalizedEmail)
      .maybeSingle();

    return Boolean(data);
  } catch (error) {
    return false;
  }
}
