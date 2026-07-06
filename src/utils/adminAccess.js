import { supabase } from '../supabaseClient';

export async function isAuthorizedAdmin(email) {
  if (!email) return false;

  const normalizedEmail = String(email).toLowerCase();

  try {
    const { data, error } = await supabase
      .from('admins')
      .select('email')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (error) {
      console.error('Error checking admin authorization:', error);
      return false;
    }

    return Boolean(data);
  } catch (error) {
    console.error('Unexpected error during admin check:', error);
    return false;
  }
}
