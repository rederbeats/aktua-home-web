import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const hasSupabaseEnv = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  let email: string | null | undefined;

  if (hasSupabaseEnv) {
    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const allowedEmails = process.env.ADMIN_EMAILS?.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean) ?? [];
    email = user.email;

    if (allowedEmails.length > 0 && (!user.email || !allowedEmails.includes(user.email.toLowerCase()))) {
      redirect("/login?error=unauthorized");
    }
  }

  return <AdminShell email={email}>{children}</AdminShell>;
}
