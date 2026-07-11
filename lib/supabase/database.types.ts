export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type PropertyStatus = "available" | "reserved" | "sold";
export type PropertyOperation = "sale" | "rent";
export type BlogPostStatus = "draft" | "published";
export type LeadType = "information" | "viewing" | "seller" | "mortgage" | "contact";
export type ImportStatus = "draft" | "review" | "applied" | "failed";

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string;
          internal_reference: string;
          external_reference: string | null;
          source: string | null;
          slug: string;
          title: string;
          description: string | null;
          property_type: string;
          operation: PropertyOperation;
          price: number | null;
          public_address: string | null;
          province: string | null;
          municipality: string | null;
          neighborhood: string | null;
          built_area: number | null;
          usable_area: number | null;
          bedrooms: number | null;
          bathrooms: number | null;
          floor: string | null;
          has_elevator: boolean;
          has_terrace: boolean;
          has_garage: boolean;
          has_storage_room: boolean;
          has_pool: boolean;
          property_condition: string | null;
          energy_certificate: string | null;
          latitude: number | null;
          longitude: number | null;
          video_url: string | null;
          virtual_tour_url: string | null;
          status: PropertyStatus;
          published_at: string | null;
          tags: string[];
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["properties"]["Row"]> & {
          internal_reference: string;
          slug: string;
          title: string;
          property_type: string;
          operation: PropertyOperation;
        };
        Update: Partial<Database["public"]["Tables"]["properties"]["Row"]>;
      };
      property_images: {
        Row: {
          id: string;
          property_id: string;
          storage_path: string;
          alt_text: string | null;
          sort_order: number;
          is_cover: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["property_images"]["Row"]> & {
          property_id: string;
          storage_path: string;
        };
        Update: Partial<Database["public"]["Tables"]["property_images"]["Row"]>;
      };
      blog_posts: {
        Row: {
          id: string;
          category_id: string | null;
          slug: string;
          title: string;
          excerpt: string | null;
          content: string | null;
          featured_image: string | null;
          author_id: string | null;
          published_at: string | null;
          status: BlogPostStatus;
          seo_title: string | null;
          seo_description: string | null;
          social_image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["blog_posts"]["Row"]> & {
          slug: string;
          title: string;
        };
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Row"]>;
      };
      leads: {
        Row: {
          id: string;
          property_id: string | null;
          type: LeadType;
          name: string;
          email: string | null;
          phone: string | null;
          message: string | null;
          consent_privacy: boolean;
          source_path: string | null;
          user_agent: string | null;
          ip_hash: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["leads"]["Row"]> & {
          type: LeadType;
          name: string;
          consent_privacy: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Row"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
