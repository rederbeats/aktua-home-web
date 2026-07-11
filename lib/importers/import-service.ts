import type { ExternalProperty, PropertyImportChange } from "@/lib/importers/types";

type ExistingProperty = {
  id: string;
  external_reference: string | null;
  source: string | null;
  title: string;
  price: number | null;
  status: string;
};

export function planPropertyImport(incoming: ExternalProperty[], existing: ExistingProperty[]): PropertyImportChange[] {
  const existingByExternalReference = new Map(
    existing
      .filter((property) => property.external_reference)
      .map((property) => [`${property.source}:${property.external_reference}`, property])
  );
  const incomingKeys = new Set(incoming.map((property) => `${property.source}:${property.externalReference}`));
  const changes: PropertyImportChange[] = [];

  incoming.forEach((property) => {
    const key = `${property.source}:${property.externalReference}`;
    const match = existingByExternalReference.get(key);

    if (!match) {
      changes.push({ action: "create", incoming: property });
      return;
    }

    const changedFields = changedPropertyFields(property, match);
    changes.push(
      changedFields.length
        ? { action: "update", existingId: match.id, incoming: property, changedFields }
        : { action: "unchanged", existingId: match.id, externalReference: property.externalReference }
    );
  });

  existing.forEach((property) => {
    if (!property.external_reference || !property.source) return;
    const key = `${property.source}:${property.external_reference}`;
    if (!incomingKeys.has(key)) {
      changes.push({
        action: "mark_withdrawn",
        existingId: property.id,
        externalReference: property.external_reference
      });
    }
  });

  return changes;
}

function changedPropertyFields(incoming: ExternalProperty, existing: ExistingProperty) {
  const changedFields: string[] = [];

  if (incoming.title !== existing.title) changedFields.push("title");
  if ((incoming.price ?? null) !== existing.price) changedFields.push("price");
  if (incoming.status !== existing.status) changedFields.push("status");

  return changedFields;
}
