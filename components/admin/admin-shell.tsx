import Link from "next/link";
import { Building2, FileText, Home, Inbox, LayoutDashboard, LogOut } from "lucide-react";
import { signOutAction } from "@/app/admin/actions";

const navItems = [
  { href: "/admin/dashboard", label: "Panel", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Inmuebles", icon: Building2 },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/leads", label: "Leads", icon: Inbox }
];

export function AdminShell({ children, email }: { children: React.ReactNode; email?: string | null }) {
  return (
    <div className="container grid gap-6 py-8 lg:grid-cols-[240px_1fr]">
      <aside className="h-fit rounded-lg border border-black/10 bg-white p-4 shadow-soft">
        <Link href="/" className="mb-5 flex items-center gap-2 text-sm font-bold text-neutral-700">
          <Home size={17} />
          Volver a la web
        </Link>
        <nav className="grid gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex min-h-10 items-center gap-2 rounded-md px-3 text-sm font-bold text-neutral-700 hover:bg-neutral-100">
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-6 border-t border-black/10 pt-4">
          <p className="mb-3 break-all text-xs text-neutral-500">{email}</p>
          <form action={signOutAction}>
            <button className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-brand-dark px-3 text-sm font-bold text-white" type="submit">
              <LogOut size={16} />
              Salir
            </button>
          </form>
        </div>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
