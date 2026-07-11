import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard admin"
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const [{ count: propertiesCount }, { count: postsCount }, { count: leadsCount }] = await Promise.all([
    supabase.from("properties").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true })
  ]);

  const modules = [
    { label: "Inmuebles", value: propertiesCount ?? 0, href: "/admin/properties" },
    { label: "Entradas blog", value: postsCount ?? 0, href: "/admin/blog" },
    { label: "Leads", value: leadsCount ?? 0, href: "/admin/leads" }
  ];

  return (
    <section>
      <p className="text-sm font-bold uppercase text-brand-red">Admin</p>
      <h1 className="mt-2 text-4xl font-black">Dashboard</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {modules.map((module) => (
          <Link key={module.href} href={module.href} className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
            <p className="text-sm font-bold text-neutral-500">{module.label}</p>
            <strong className="mt-2 block text-4xl">{module.value}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}
