"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const publicLeadSchema = z.object({
  property_id: z.string().uuid().optional().or(z.literal("")),
  type: z.enum(["information", "viewing", "seller", "mortgage", "contact"]),
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(6).optional().or(z.literal("")),
  message: z.string().max(2000).optional(),
  consent_privacy: z.literal("on"),
  source_path: z.string().optional(),
  preferred_date: z.string().optional(),
  preferred_time: z.string().optional(),
  company_name: z.string().max(0).optional()
});

export async function submitLeadAction(formData: FormData) {
  const fallbackPath = String(formData.get("source_path") ?? "/contacto");
  const parsed = publicLeadSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    redirect(`${fallbackPath}?lead=invalid`);
  }

  const values = parsed.data;
  const supabase = createAdminClient();
  const propertyId = values.property_id || null;

  const { data: lead, error } = await supabase
    .from("leads")
    .insert({
      property_id: propertyId,
      type: values.type,
      name: values.name,
      email: emptyToNull(values.email),
      phone: emptyToNull(values.phone),
      message: emptyToNull(values.message),
      consent_privacy: true,
      source_path: emptyToNull(values.source_path)
    })
    .select("id")
    .single();

  if (error || !lead) {
    redirect(`${fallbackPath}?lead=error`);
  }

  if (values.type === "viewing" && propertyId) {
    await supabase.from("viewing_requests").insert({
      lead_id: lead.id,
      property_id: propertyId,
      preferred_date: emptyToNull(values.preferred_date),
      preferred_time: emptyToNull(values.preferred_time)
    });
  }

  redirect(`${fallbackPath}?lead=sent`);
}

function emptyToNull(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}
