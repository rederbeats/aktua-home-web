import type { ImporterContext, ImporterResult, PropertyImporter } from "@/lib/importers/types";

export class XmlPropertyImporter implements PropertyImporter {
  readonly source = "xml" as const;

  async parse(_input: unknown, _context: ImporterContext): Promise<ImporterResult> {
    return {
      source: this.source,
      records: [],
      errors: [
        {
          message: "XML importer placeholder. Define the provider feed contract before enabling parsing."
        }
      ]
    };
  }
}
