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
      <input className="h-11 rounded-md border border-black/10 px-3" name="name" placeholder="Nombre" required />
      <input className="h-11 rounded-md border border-black/10 px-3" name="email" placeholder="Email" type="email" />
      <input className="h-11 rounded-md border border-black/10 px-3" name="phone" placeholder="Telefono" />
      {type === "viewing" ? (
        <div className="grid gap-3 md:grid-cols-2">
          <input className="h-11 rounded-md border border-black/10 px-3" name="preferred_date" type="date" />
          <input className="h-11 rounded-md border border-black/10 px-3" name="preferred_time" placeholder="Hora preferida" />
        </div>
      ) : null}
      <textarea className="min-h-28 rounded-md border border-black/10 p-3" name="message" placeholder="Cuentanos que necesitas" />
      <label className="flex gap-2 text-sm text-neutral-600">
        <input name="consent_privacy" type="checkbox" required className="mt-1 size-4" />
        Acepto la politica de privacidad.
      </label>
      <button className="h-11 rounded-md bg-brand-red px-4 font-bold text-white" type="submit">
        Enviar solicitud
      </button>
    </form>
  );
}
