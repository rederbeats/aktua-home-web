import type { ImporterContext, ImporterResult, PropertyImporter } from "@/lib/importers/types";

export class ApiPropertyImporter implements PropertyImporter {
  readonly source = "api" as const;

  async parse(_input: unknown, _context: ImporterContext): Promise<ImporterResult> {
    return {
      source: this.source,
      records: [],
      errors: [
        {
          message: "API importer placeholder. Add OAuth/API credentials and mapping once the provider access method is confirmed."
        }
      ]
    };
  }
}
