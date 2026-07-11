import { propertySchema } from "@/lib/domain/properties";
import type { ExternalProperty, ImporterContext, ImporterResult, PropertyImporter } from "@/lib/importers/types";
import { slugify } from "@/lib/utils/slugify";

export class CsvPropertyImporter implements PropertyImporter {
  readonly source = "csv" as const;

  async parse(input: unknown, _context: ImporterContext): Promise<ImporterResult> {
    if (typeof input !== "string") {
      return { source: this.source, records: [], errors: [{ message: "CSV input must be a string." }] };
    }

    const [headerLine, ...lines] = input.trim().split(/\r?\n/);
    const headers = splitCsvLine(headerLine).map((header) => header.trim());
    const records: ExternalProperty[] = [];
    const errors: ImporterResult["errors"] = [];

    lines.forEach((line, index) => {
      const row = index + 2;
      const values = splitCsvLine(line);
      const raw = Object.fromEntries(headers.map((header, headerIndex) => [header, values[headerIndex] ?? ""]));

      const candidate = {
        internalReference: raw.internal_reference || raw.reference || raw.ref,
        externalReference: raw.external_reference || raw.idealista_id || raw.reference || raw.ref,
        source: raw.source || "csv",
        slug: raw.slug || slugify(raw.title || raw.internal_reference || raw.reference || `inmueble-${row}`),
        title: raw.title,
        description: raw.description,
        propertyType: raw.property_type || raw.type || "Vivienda",
        operation: raw.operation === "rent" || raw.operation === "alquiler" ? "rent" : "sale",
        price: numberOrUndefined(raw.price),
        publicAddress: raw.public_address || raw.address,
        province: raw.province,
        municipality: raw.municipality,
        neighborhood: raw.neighborhood,
        builtArea: numberOrUndefined(raw.built_area),
        usableArea: numberOrUndefined(raw.usable_area),
        bedrooms: numberOrUndefined(raw.bedrooms),
        bathrooms: numberOrUndefined(raw.bathrooms),
        floor: raw.floor,
        hasElevator: booleanFromCsv(raw.has_elevator),
        hasTerrace: booleanFromCsv(raw.has_terrace),
        hasGarage: booleanFromCsv(raw.has_garage),
        hasStorageRoom: booleanFromCsv(raw.has_storage_room),
        hasPool: booleanFromCsv(raw.has_pool),
        propertyCondition: raw.property_condition,
        energyCertificate: raw.energy_certificate,
        status: raw.status === "reserved" || raw.status === "sold" ? raw.status : "available",
        tags: raw.tags ? raw.tags.split("|").map((tag) => tag.trim()).filter(Boolean) : [],
        isFeatured: booleanFromCsv(raw.is_featured)
      };

      const parsed = propertySchema.safeParse(candidate);

      if (!candidate.externalReference) {
        errors.push({ row, message: "Missing external reference.", raw });
        return;
      }

      if (!parsed.success) {
        errors.push({ row, externalReference: candidate.externalReference, message: parsed.error.message, raw });
        return;
      }

      records.push(parsed.data as ExternalProperty);
    });

    return { source: this.source, records, errors };
  }
}

function splitCsvLine(line = "") {
  return line.match(/("([^"]|"")*"|[^,;]+)/g)?.map((value) => value.replace(/^"|"$/g, "").replaceAll('""', '"')) ?? [];
}

function numberOrUndefined(value?: string) {
  if (!value) return undefined;
  const number = Number(String(value).replace(",", "."));
  return Number.isFinite(number) ? number : undefined;
}

function booleanFromCsv(value?: string) {
  return ["1", "true", "yes", "si", "sí"].includes(String(value ?? "").toLowerCase());
}
