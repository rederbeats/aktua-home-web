import type { PropertyInput } from "@/lib/domain/properties";

export type ImportSource = "csv" | "xml" | "api" | "manual";

export type ExternalProperty = PropertyInput & {
  externalReference: string;
  source: string;
};

export type ImporterContext = {
  importId: string;
  dryRun: boolean;
};

export type ImporterResult = {
  source: ImportSource;
  records: ExternalProperty[];
  errors: ImportError[];
};

export type ImportError = {
  externalReference?: string;
  row?: number;
  message: string;
  raw?: unknown;
};

export interface PropertyImporter {
  readonly source: ImportSource;
  parse(input: unknown, context: ImporterContext): Promise<ImporterResult>;
}

export type PropertyImportChange =
  | { action: "create"; incoming: ExternalProperty }
  | { action: "update"; existingId: string; incoming: ExternalProperty; changedFields: string[] }
  | { action: "mark_withdrawn"; existingId: string; externalReference: string }
  | { action: "unchanged"; existingId: string; externalReference: string };
