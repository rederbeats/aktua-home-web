import { z } from "zod";

export const leadSchema = z.object({
  propertyId: z.string().uuid().optional(),
  type: z.enum(["information", "viewing", "seller", "mortgage", "contact"]),
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(6).optional().or(z.literal("")),
  message: z.string().max(2000).optional(),
  consentPrivacy: z.literal(true),
  sourcePath: z.string().optional(),
  company_name: z.string().max(0).optional()
});

export type LeadInput = z.infer<typeof leadSchema>;
