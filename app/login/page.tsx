import type { Metadata } from "next";
import { signInAction } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Acceso"
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  return (
    <section className="container flex min-h-[60vh] items-center py-10">
      <div className="w-full max-w-md rounded-lg border border-black/10 bg-white p-6 shadow-soft">
        <p className="text-sm font-bold uppercase text-brand-red">Acceso privado</p>
        <h1 className="mt-2 text-3xl font-black">Entrar al panel</h1>
        <p className="mt-3 text-sm leading-6 text-neutral-600">Usa el usuario que has creado en Supabase Authentication.</p>
        {error ? (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
            No se pudo iniciar sesion: {decodeURIComponent(error)}
          </div>
        ) : null}
        <form action={signInAction} className="mt-5 grid gap-3">
          <label className="grid gap-1 text-sm font-semibold text-neutral-700">
            Email
            <input className="h-11 rounded-md border border-black/10 px-3" name="email" type="email" required />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-neutral-700">
            Contraseña
            <input className="h-11 rounded-md border border-black/10 px-3" name="password" type="password" required />
          </label>
          <button className="mt-2 h-11 rounded-md bg-brand-red px-4 font-bold text-white" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
}
