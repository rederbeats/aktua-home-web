import { createClient } from "@/lib/supabase/server";

export type PublicPropertyCard = {
  id: string;
  slug: string;
  title: string;
  operation: "sale" | "rent";
  propertyType: string;
  price: number | null;
  municipality: string;
  neighborhood?: string;
  bedrooms?: number;
  bathrooms?: number;
  builtArea?: number;
  hasElevator?: boolean;
  hasTerrace?: boolean;
  hasGarage?: boolean;
  hasStorageRoom?: boolean;
  hasPool?: boolean;
  imageUrl: string;
  isFeatured?: boolean;
};

export type PublicPropertyDetail = PublicPropertyCard & {
  description?: string;
  publicAddress?: string;
  status: string;
  images: { id: string; url: string; alt: string; isCover: boolean; sortOrder: number }[];
};

const fallbackImage = "/assets/aktua-home-logo.png";

type RawPropertyImage = {
  id: string;
  storage_path: string;
  alt_text: string | null;
  sort_order: number;
  is_cover: boolean;
};

type RawProperty = {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  operation: "sale" | "rent";
  property_type: string;
  price: number | string | null;
  public_address?: string | null;
  municipality: string | null;
  neighborhood: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  built_area: number | string | null;
  status?: string;
  is_featured: boolean;
  property_images?: RawPropertyImage[];
  has_elevator?: boolean;
  has_terrace?: boolean;
  has_garage?: boolean;
  has_storage_room?: boolean;
  has_pool?: boolean;
};

export type PropertyFilters = {
  zone?: string;
  type?: string;
  operation?: "sale" | "rent";
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  feature?: string[];
  sort?: "recent" | "price_asc" | "price_desc";
};

export async function getPublishedProperties(filters: PropertyFilters = {}): Promise<PublicPropertyCard[]> {
  const supabase = await createClient();
  let query = supabase
    .from("properties")
    .select(
      "id, slug, title, operation, property_type, price, public_address, municipality, neighborhood, bedrooms, bathrooms, built_area, has_elevator, has_terrace, has_garage, has_storage_room, has_pool, is_featured, published_at, property_images(id, storage_path, alt_text, sort_order, is_cover)"
    )
    .in("status", ["available", "reserved"])
    .not("published_at", "is", null);

  if (filters.zone) {
    const zone = `%${filters.zone}%`;
    query = query.or(`municipality.ilike.${zone},neighborhood.ilike.${zone},public_address.ilike.${zone}`);
  }

  if (filters.type && filters.type !== "all") query = query.eq("property_type", filters.type);
  if (filters.operation) query = query.eq("operation", filters.operation);
  if (filters.minPrice !== undefined) query = query.gte("price", filters.minPrice);
  if (filters.maxPrice !== undefined) query = query.lte("price", filters.maxPrice);
  if (filters.bedrooms !== undefined) query = query.gte("bedrooms", filters.bedrooms);
  if (filters.bathrooms !== undefined) query = query.gte("bathrooms", filters.bathrooms);

  for (const feature of filters.feature ?? []) {
    const column = featureToColumn(feature);
    if (column) query = query.eq(column, true);
  }

  if (filters.sort === "price_asc") query = query.order("price", { ascending: true, nullsFirst: false });
  else if (filters.sort === "price_desc") query = query.order("price", { ascending: false, nullsFirst: false });
  else query = query.order("published_at", { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).map((property) => mapPropertyCard(property));
}

export async function getPublishedPropertyBySlug(slug: string): Promise<PublicPropertyDetail | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select(
      "id, slug, title, description, operation, property_type, price, public_address, municipality, neighborhood, bedrooms, bathrooms, built_area, has_elevator, has_terrace, has_garage, has_storage_room, has_pool, status, is_featured, property_images(id, storage_path, alt_text, sort_order, is_cover)"
    )
    .eq("slug", slug)
    .in("status", ["available", "reserved"])
    .not("published_at", "is", null)
    .single();

  if (error || !data) {
    return null;
  }

  const card = mapPropertyCard(data);
  const images = getPropertyImages(data).map((image) => ({
    id: image.id,
    url: publicImageUrl(image.storage_path),
    alt: image.alt_text || data.title,
    isCover: image.is_cover,
    sortOrder: image.sort_order
  }));

  return {
    ...card,
    description: data.description ?? undefined,
    publicAddress: data.public_address ?? undefined,
    status: data.status,
    images
  };
}

function mapPropertyCard(property: RawProperty): PublicPropertyCard {
  const cover = getPropertyImages(property).find((image) => image.is_cover) ?? getPropertyImages(property)[0];
  const location = getDisplayLocation(property);

  return {
    id: property.id,
    slug: property.slug,
    title: property.title,
    operation: property.operation,
    propertyType: property.property_type,
    price: property.price === null ? null : Number(property.price),
    municipality: location.municipality,
    neighborhood: location.neighborhood,
    bedrooms: property.bedrooms ?? undefined,
    bathrooms: property.bathrooms ?? undefined,
    builtArea: property.built_area ? Number(property.built_area) : undefined,
    hasElevator: property.has_elevator,
    hasTerrace: property.has_terrace,
    hasGarage: property.has_garage,
    hasStorageRoom: property.has_storage_room,
    hasPool: property.has_pool,
    imageUrl: cover ? publicImageUrl(cover.storage_path) : fallbackImage,
    isFeatured: property.is_featured
  };
}

function getDisplayLocation(property: RawProperty) {
  const municipality = property.municipality?.trim();
  const neighborhood = property.neighborhood?.trim();
  const publicAddress = property.public_address?.trim();
  const primary = municipality || neighborhood || publicAddress || "Zona no indicada";
  const secondary =
    municipality && neighborhood && normalizeLocation(municipality) !== normalizeLocation(neighborhood)
      ? neighborhood
      : undefined;

  return { municipality: primary, neighborhood: secondary };
}

function normalizeLocation(value: string) {
  return value.trim().toLocaleLowerCase("es-ES");
}

function featureToColumn(feature: string) {
  return {
    elevator: "has_elevator",
    terrace: "has_terrace",
    garage: "has_garage",
    storage: "has_storage_room",
    pool: "has_pool"
  }[feature];
}

function getPropertyImages(property: RawProperty) {
  return [...(property.property_images ?? [])].sort((a, b) => Number(a.sort_order) - Number(b.sort_order));
}

function publicImageUrl(path: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url ? `${url}/storage/v1/object/public/property-images/${path}` : fallbackImage;
}
