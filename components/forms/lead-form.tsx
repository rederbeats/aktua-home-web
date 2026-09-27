import { submitLeadAction } from "@/app/actions";

export function LeadForm({
  type = "contact",
  propertyId,
  sourcePath = "/contacto",
  status
}: {
  type?: "information" | "viewing" | "seller" | "mortgage" | "contact";
  propertyId?: string;
  sourcePath?: string;
  status?: string;
}) {
  return (
    <form action={submitLeadAction} className="grid gap-3">
      {status === "sent" ? (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800">
          Solicitud enviada correctamente.
        </div>
      ) : null}
      {status === "error" || status === "invalid" ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          No se pudo enviar la solicitud. Revisa los datos e intentalo de nuevo.
        </div>
      ) : null}
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="property_id" value={propertyId ?? ""} />
      <input type="hidden" name="source_path" value={sourcePath} />
      <input name="company_name" className="hidden" tabIndex={-1} autoComplete="off" />
      <input className="h-12 rounded-lg border border-white/10 bg-black px-4 text-white" name="name" placeholder="Nombre" required />
      <input className="h-12 rounded-lg border border-white/10 bg-black px-4 text-white" name="email" placeholder="Email" type="email" />
      <input className="h-12 rounded-lg border border-white/10 bg-black px-4 text-white" name="phone" placeholder="Teléfono" />
      {type === "viewing" ? (
        <div className="grid gap-3 md:grid-cols-2">
          <input className="h-12 rounded-lg border border-white/10 bg-black px-4 text-white" name="preferred_date" type="date" />
          <input className="h-12 rounded-lg border border-white/10 bg-black px-4 text-white" name="preferred_time" placeholder="Hora preferida" />
        </div>
      ) : null}
      <textarea className="min-h-28 rounded-lg border border-white/10 bg-black p-4 text-white" name="message" placeholder="Cuéntanos qué necesitas" />
      <label className="flex gap-2 text-sm text-neutral-600">
        <input name="consent_privacy" type="checkbox" required className="mt-1 size-4" />
        Acepto la política de privacidad.
      </label>
      <button className="origin-primary flex h-12 items-center justify-between px-4 font-medium transition" type="submit">
        Enviar solicitud <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
