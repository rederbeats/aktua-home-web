import { slugify } from "@/lib/utils/slugify";

export type IdealistaManualRecord = {
  externalReference: string;
  sourceUrl?: string;
  title: string;
  description?: string;
  propertyType: string;
  operation: "sale" | "rent";
  price?: number;
  publicAddress?: string;
  municipality?: string;
  neighborhood?: string;
  builtArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  hasElevator: boolean;
  hasGarage: boolean;
  hasTerrace: boolean;
  tags: string[];
};

const propertyTypeWords = [
  "Piso",
  "Casa rústica",
  "Casa",
  "Chalet",
  "Ático",
  "Atico",
  "Dúplex",
  "Duplex",
  "Apartamento",
  "Estudio",
  "Finca",
  "Terreno",
  "Local",
  "Garaje"
];

export function parseIdealistaManualInput(input: string): { records: IdealistaManualRecord[]; errors: string[] } {
  const text = normalizeText(input);
  const urls = extractIdealistaUrls(text);
  const blocks = splitPropertyBlocks(text);
  const records = blocks.map((block, index) => parseBlock(block, urls[index], index)).filter(Boolean) as IdealistaManualRecord[];

  if (!records.length && urls.length) {
    return {
      records: urls.map((url, index) => parseUrlOnly(url, index)),
      errors: []
    };
  }

  return {
    records,
    errors: records.length ? [] : ["No he encontrado inmuebles reconocibles. Copia el texto del listado de idealista o pega URLs de anuncios."]
  };
}

function normalizeText(input: string) {
  return input.replace(/\r/g, "").replace(/\u00a0/g, " ").trim();
}

function extractIdealistaUrls(text: string) {
  return Array.from(text.matchAll(/https?:\/\/(?:www\.)?idealista\.com\/[^\s]+/gi)).map((match) => match[0].replace(/[),.;]+$/, ""));
}

function splitPropertyBlocks(text: string) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const titleIndexes = lines
    .map((line, index) => (isTitleLine(line) ? index : -1))
    .filter((index) => index >= 0);

  return titleIndexes.map((start, index) => {
    const end = titleIndexes[index + 1] ?? lines.length;
    return lines.slice(start, end).join("\n");
  });
}

function isTitleLine(line: string) {
  return propertyTypeWords.some((word) => line.toLocaleLowerCase("es-ES").startsWith(word.toLocaleLowerCase("es-ES") + " en "));
}

function parseBlock(block: string, sourceUrl: string | undefined, index: number) {
  const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
  const title = lines.find(isTitleLine);

  if (!title) return null;

  const price = parsePrice(block);
  const builtArea = parseBuiltArea(block);
  const bedrooms = parseIntegerBefore(block, /hab\./i);
  const bathrooms = parseIntegerBefore(block, /baño|bano/i);
  const propertyType = inferPropertyType(title);
  const location = parseLocation(title);
  const description = lines
    .filter((line) => line !== title && !/^\d+\/\d+$/.test(line) && !/Contactar|Llamar|Guardar|Descartar|Ver teléfono/i.test(line))
    .slice(2)
    .join(" ")
    .trim();

  return {
    externalReference: extractIdealistaReference(sourceUrl) || slugify([title, price, builtArea, index + 1].filter(Boolean).join("-")),
    sourceUrl,
    title,
    description: buildDescription(description, sourceUrl),
    propertyType,
    operation: "sale" as const,
    price,
    publicAddress: location.publicAddress,
    municipality: location.municipality,
    neighborhood: location.neighborhood,
    builtArea,
    bedrooms,
    bathrooms,
    hasElevator: /ascensor/i.test(block),
    hasGarage: /garaje/i.test(block),
    hasTerrace: /terraza|balcón|balcon/i.test(block),
    tags: ["idealista", "importado"]
  };
}

function parseUrlOnly(url: string, index: number): IdealistaManualRecord {
  const reference = extractIdealistaReference(url) || `url-${index + 1}`;

  return {
    externalReference: reference,
    sourceUrl: url,
    title: `Inmueble idealista ${reference}`,
    description: buildDescription("Borrador creado desde enlace de idealista. Revisa y completa los datos antes de publicar.", url),
    propertyType: "Vivienda",
    operation: "sale",
    hasElevator: false,
    hasGarage: false,
    hasTerrace: false,
    tags: ["idealista", "importado", "pendiente-revision"]
  };
}

function extractIdealistaReference(url?: string) {
  return url?.match(/\/inmueble\/(\d+)/i)?.[1];
}

function parsePrice(text: string) {
  const match = text.match(/(\d{1,3}(?:\.\d{3})*)\s*€/);
  return match ? Number(match[1].replace(/\./g, "")) : undefined;
}

function parseBuiltArea(text: string) {
  const match = text.match(/(\d{1,4})\s*m²/i);
  return match ? Number(match[1]) : undefined;
}

function parseIntegerBefore(text: string, suffix: RegExp) {
  const match = text.match(new RegExp(`(\\d+)\\s*${suffix.source}`, "i"));
  return match ? Number(match[1]) : undefined;
}

function inferPropertyType(title: string) {
  return propertyTypeWords.find((word) => title.toLocaleLowerCase("es-ES").startsWith(word.toLocaleLowerCase("es-ES"))) || "Vivienda";
}

function parseLocation(title: string) {
  const raw = title.replace(/^.+? en /i, "");
  const parts = raw.split(",").map((part) => part.trim()).filter(Boolean);
  const municipality = parts.at(-1);
  const neighborhood = parts.length > 1 ? parts.at(-2) : undefined;
  const publicAddress = parts.length > 2 ? parts.slice(0, -2).join(", ") : parts[0];

  return { publicAddress, municipality, neighborhood };
}

function buildDescription(description: string, sourceUrl?: string) {
  const chunks = [description.trim(), sourceUrl ? `Fuente idealista: ${sourceUrl}` : ""].filter(Boolean);
  return chunks.join("\n\n");
}
