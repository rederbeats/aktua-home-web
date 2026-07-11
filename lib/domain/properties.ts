import { z } from "zod";

export const propertyStatusSchema = z.enum(["available", "reserved", "sold"]);
export const propertyOperationSchema = z.enum(["sale", "rent"]);

export const propertySchema = z.object({
  internalReference: z.string().min(1),
  externalReference: z.string().optional(),
  source: z.string().optional(),
  slug: z.string().min(1),
  title: z.string().min(3),
  description: z.string().optional(),
  propertyType: z.string().min(1),
  operation: propertyOperationSchema,
  price: z.number().nonnegative().optional(),
  publicAddress: z.string().optional(),
  province: z.string().optional(),
  municipality: z.string().optional(),
  neighborhood: z.string().optional(),
  builtArea: z.number().nonnegative().optional(),
  usableArea: z.number().nonnegative().optional(),
  bedrooms: z.number().int().nonnegative().optional(),
  bathrooms: z.number().int().nonnegative().optional(),
  floor: z.string().optional(),
  hasElevator: z.boolean().default(false),
  hasTerrace: z.boolean().default(false),
  hasGarage: z.boolean().default(false),
  hasStorageRoom: z.boolean().default(false),
  hasPool: z.boolean().default(false),
  propertyCondition: z.string().optional(),
  energyCertificate: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  videoUrl: z.string().url().optional(),
  virtualTourUrl: z.string().url().optional(),
  status: propertyStatusSchema.default("available"),
  publishedAt: z.string().datetime().optional(),
  tags: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false)
});

export type PropertyInput = z.infer<typeof propertySchema>;

export type PropertyCard = {
  id: string;
  slug: string;
  title: string;
  operation: "sale" | "rent";
  propertyType: string;
  price: number;
  municipality: string;
  neighborhood?: string;
  bedrooms?: number;
  bathrooms?: number;
  builtArea?: number;
  imageUrl: string;
  isFeatured?: boolean;
};

export const sampleProperties: PropertyCard[] = [
  {
    id: "sample-1",
    slug: "piso-luminoso-centro",
    title: "Piso luminoso en el centro",
    operation: "sale",
    propertyType: "Piso",
    price: 220000,
    municipality: "Alicante",
    neighborhood: "Centro",
    bedrooms: 2,
    bathrooms: 1,
    builtArea: 82,
    imageUrl: "/assets/aktua-home-logo.png",
    isFeatured: true
  },
  {
    id: "sample-2",
    slug: "atico-terraza-garaje",
    title: "Atico con terraza y garaje",
    operation: "sale",
    propertyType: "Atico",
    price: 315000,
    municipality: "San Vicente",
    neighborhood: "Norte",
    bedrooms: 3,
    bathrooms: 2,
    builtArea: 118,
    imageUrl: "/assets/aktua-home-logo.png"
  }
];
