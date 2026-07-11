import { propertySchema } from "@/lib/domain/properties";
import type { ImporterContext, ImporterResult, PropertyImporter } from "@/lib/importers/types";

export class ManualPropertyImporter implements PropertyImporter {
  readonly source = "manual" as const;

  async parse(input: unknown, _context: ImporterContext): Promise<ImporterResult> {
    const parsed = propertySchema.safeParse(input);

    if (!parsed.success) {
      return {
        source: this.source,
        records: [],
        errors: [{ message: parsed.error.message, raw: input }]
      };
    }

    return {
      source: this.source,
      records: [
        {
          ...parsed.data,
          externalReference: parsed.data.externalReference || parsed.data.internalReference,
          source: "manual"
        }
      ],
      errors: []
    };
  }
}
