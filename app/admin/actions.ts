"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils/slugify";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const propertyFormSchema = z.object({
  internal_reference: z.string().min(1),
  title: z.string().min(3),
  description: z.string().optional(),
  property_type: z.string().min(1),
  operation: z.enum(["sale", "rent"]),
  price: z.coerce.number().nonnegative().optional(),
  public_address: z.string().optional(),
  province: z.string().optional(),
  municipality: z.string().optional(),
  neighborhood: z.string().optional(),
  built_area: z.coerce.number().nonnegative().optional(),
  bedrooms: z.coerce.number().int().nonnegative().optional(),
  bathrooms: z.coerce.number().int().nonnegative().optional(),
  has_elevator: z.coerce.boolean().default(false),
  has_terrace: z.coerce.boolean().default(false),
  has_garage: z.coerce.boolean().default(false),
  has_storage_room: z.coerce.boolean().default(false),
  has_pool: z.coerce.boolean().default(false),
  status: z.enum(["available", "reserved", "sold"]),
  is_featured: z.coerce.boolean().default(false),
  publish: z.coerce.boolean().default(false),
  tags: z.string().optional()
});

const blogPostFormSchema = z.object({
  title: z.string().min(3),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  status: z.enum(["draft", "published"]),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  tags: z.string().optional()
});

export async function signInAction(formData: FormData) {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    redirect("/login?error=invalid");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/dashboard");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function createPropertyAction(formData: FormData) {
  const parsed = propertyFormSchema.safeParse(Object.fromEntries(formData));
  const files = getImageFiles(formData);

  if (!parsed.success) {
    redirect("/admin/properties/new?error=invalid");
  }

  const values = parsed.data;
  const supabase = await createClient();
  const slug = slugify(`${values.title}-${values.internal_reference}`);
  const now = new Date().toISOString();

  const { data: property, error } = await supabase
    .from("properties")
    .insert({
      internal_reference: values.internal_reference,
      slug,
      title: values.title,
      description: emptyToNull(values.description),
      property_type: values.property_type,
      operation: values.operation,
      price: values.price || null,
      public_address: emptyToNull(values.public_address),
      province: emptyToNull(values.province),
      municipality: emptyToNull(values.municipality),
      neighborhood: emptyToNull(values.neighborhood),
      built_area: values.built_area || null,
      bedrooms: values.bedrooms || null,
      bathrooms: values.bathrooms || null,
      has_elevator: values.has_elevator,
      has_terrace: values.has_terrace,
      has_garage: values.has_garage,
      has_storage_room: values.has_storage_room,
      has_pool: values.has_pool,
      status: values.status,
      is_featured: values.is_featured,
      published_at: values.publish ? now : null,
      tags: splitTags(values.tags)
    })
    .select("id")
    .single();

  if (error) {
    redirect(`/admin/properties/new?error=${encodeURIComponent(error.message)}`);
  }

  if (files.length > 0 && property?.id) {
    const uploadError = await uploadImagesForProperty(property.id, files, 0);

    if (uploadError) {
      redirect(`/admin/properties/${property.id}/images?error=${encodeURIComponent(uploadError)}`);
    }
  }

  revalidatePath("/admin/properties");
  revalidatePath("/comprar");
  redirect(property?.id ? `/admin/properties/${property.id}/images?success=created` : "/admin/properties");
}

export async function createPropertyInlineAction(
  formData: FormData
): Promise<{ ok: true; propertyId: string } | { ok: false; error: string }> {
  const parsed = propertyFormSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { ok: false, error: "Revisa los campos obligatorios del inmueble." };
  }

  const values = parsed.data;
  const supabase = await createClient();
  const slug = slugify(`${values.title}-${values.internal_reference}`);
  const now = new Date().toISOString();

  const { data: property, error } = await supabase
    .from("properties")
    .insert({
      internal_reference: values.internal_reference,
      slug,
      title: values.title,
      description: emptyToNull(values.description),
      property_type: values.property_type,
      operation: values.operation,
      price: values.price || null,
      public_address: emptyToNull(values.public_address),
      province: emptyToNull(values.province),
      municipality: emptyToNull(values.municipality),
      neighborhood: emptyToNull(values.neighborhood),
      built_area: values.built_area || null,
      bedrooms: values.bedrooms || null,
      bathrooms: values.bathrooms || null,
      has_elevator: values.has_elevator,
      has_terrace: values.has_terrace,
      has_garage: values.has_garage,
      has_storage_room: values.has_storage_room,
      has_pool: values.has_pool,
      status: values.status,
      is_featured: values.is_featured,
      published_at: values.publish ? now : null,
      tags: splitTags(values.tags)
    })
    .select("id")
    .single();

  if (error || !property?.id) {
    return { ok: false, error: error?.message || "No se pudo crear el inmueble." };
  }

  revalidatePath("/admin/properties");
  revalidatePath("/comprar");

  return { ok: true, propertyId: property.id };
}

export async function updatePropertyAction(formData: FormData) {
  const propertyId = String(formData.get("property_id") ?? "");
  const parsed = propertyFormSchema.safeParse(Object.fromEntries(formData));

  if (!z.string().uuid().safeParse(propertyId).success) {
    redirect("/admin/properties?error=invalid-property");
  }

  if (!parsed.success) {
    redirect(`/admin/properties/${propertyId}/edit?error=invalid`);
  }

  const values = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase
    .from("properties")
    .update({
      internal_reference: values.internal_reference,
      slug: slugify(`${values.title}-${values.internal_reference}`),
      title: values.title,
      description: emptyToNull(values.description),
      property_type: values.property_type,
      operation: values.operation,
      price: values.price || null,
      public_address: emptyToNull(values.public_address),
      province: emptyToNull(values.province),
      municipality: emptyToNull(values.municipality),
      neighborhood: emptyToNull(values.neighborhood),
      built_area: values.built_area || null,
      bedrooms: values.bedrooms || null,
      bathrooms: values.bathrooms || null,
      has_elevator: values.has_elevator,
      has_terrace: values.has_terrace,
      has_garage: values.has_garage,
      has_storage_room: values.has_storage_room,
      has_pool: values.has_pool,
      status: values.status,
      is_featured: values.is_featured,
      published_at: values.publish ? new Date().toISOString() : null,
      tags: splitTags(values.tags),
      updated_at: new Date().toISOString()
    })
    .eq("id", propertyId);

  if (error) {
    redirect(`/admin/properties/${propertyId}/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/properties");
  revalidatePath("/comprar");
  redirect("/admin/properties");
}

export async function togglePropertyPublicationAction(formData: FormData) {
  const propertyId = String(formData.get("property_id") ?? "");
  const nextState = String(formData.get("next_state") ?? "");

  if (!z.string().uuid().safeParse(propertyId).success) {
    redirect("/admin/properties?error=invalid-property");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("properties")
    .update({
      published_at: nextState === "publish" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    })
    .eq("id", propertyId);

  if (error) {
    redirect(`/admin/properties?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/properties");
  revalidatePath("/comprar");
  redirect("/admin/properties");
}

export async function movePropertyOrderAction(formData: FormData) {
  const propertyId = String(formData.get("property_id") ?? "");
  const direction = String(formData.get("direction") ?? "");

  if (!z.string().uuid().safeParse(propertyId).success || !["up", "down"].includes(direction)) {
    redirect("/admin/properties?error=invalid-property-order");
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const admin = createAdminClient();
  const { data: properties, error } = await admin
    .from("properties")
    .select("id, published_at")
    .in("status", ["available", "reserved"])
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    redirect(`/admin/properties?error=${encodeURIComponent(error.message)}`);
  }

  const ordered = properties ?? [];
  const currentIndex = ordered.findIndex((property) => property.id === propertyId);
  const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

  if (currentIndex < 0) {
    redirect(`/admin/properties?error=${encodeURIComponent("Solo puedes ordenar inmuebles publicados y disponibles.")}`);
  }

  if (targetIndex < 0 || targetIndex >= ordered.length) {
    redirect("/admin/properties");
  }

  const [current] = ordered.splice(currentIndex, 1);
  ordered.splice(targetIndex, 0, current);

  const now = Date.now();
  const updates = await Promise.all(
    ordered.map((property, index) =>
      admin
        .from("properties")
        .update({ published_at: new Date(now - index * 1000).toISOString(), updated_at: new Date().toISOString() })
        .eq("id", property.id)
    )
  );
  const updateError = updates.find((result) => result.error)?.error;

  if (updateError) {
    redirect(`/admin/properties?error=${encodeURIComponent(updateError.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/comprar");
  revalidatePath("/admin/properties");
  redirect("/admin/properties");
}
export async function deletePropertyAction(formData: FormData) {
  const propertyId = String(formData.get("property_id") ?? "");

  if (!z.string().uuid().safeParse(propertyId).success) {
    redirect("/admin/properties?error=invalid-property");
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const admin = createAdminClient();
  const { data: images } = await admin.from("property_images").select("storage_path").eq("property_id", propertyId);

  if (images?.length) {
    await admin.storage.from("property-images").remove(images.map((image) => image.storage_path));
  }

  const { error } = await admin.from("properties").delete().eq("id", propertyId);

  if (error) {
    redirect(`/admin/properties?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/properties");
  revalidatePath("/comprar");
  redirect("/admin/properties");
}

export async function createBlogPostAction(formData: FormData) {
  const parsed = blogPostFormSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    redirect("/admin/blog/new?error=invalid");
  }

  const values = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase.from("blog_posts").insert({
    slug: slugify(values.title),
    title: values.title,
    excerpt: emptyToNull(values.excerpt),
    content: emptyToNull(values.content),
    status: values.status,
    seo_title: emptyToNull(values.seo_title),
    seo_description: emptyToNull(values.seo_description),
    published_at: values.status === "published" ? new Date().toISOString() : null
  });

  if (error) {
    redirect(`/admin/blog/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function uploadPropertyImagesAction(formData: FormData) {
  const propertyId = String(formData.get("property_id") ?? "");
  const files = getImageFiles(formData);

  if (!z.string().uuid().safeParse(propertyId).success) {
    redirect("/admin/properties?error=invalid-property");
  }

  if (files.length === 0) {
    redirect(`/admin/properties/${propertyId}/images?error=${encodeURIComponent("Selecciona al menos una imagen.")}`);
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const admin = createAdminClient();
  const sortOrder = await getNextImageSortOrder(admin, propertyId);
  const uploadError = await uploadImagesForProperty(propertyId, files, sortOrder);

  if (uploadError) {
    redirect(`/admin/properties/${propertyId}/images?error=${encodeURIComponent(uploadError)}`);
  }

  revalidatePath(`/admin/properties/${propertyId}/images`);
  revalidatePath("/admin/properties");
  revalidatePath("/comprar");
  redirect(`/admin/properties/${propertyId}/images?success=uploaded`);
}

export async function uploadPropertyImageInlineAction(
  formData: FormData
): Promise<{ ok: true; uploaded: number } | { ok: false; error: string }> {
  const propertyId = String(formData.get("property_id") ?? "");
  const files = getImageFiles(formData);

  if (!z.string().uuid().safeParse(propertyId).success) {
    return { ok: false, error: "Inmueble no valido." };
  }

  if (files.length === 0) {
    return { ok: false, error: "Selecciona al menos una imagen." };
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, error: "Sesion caducada. Vuelve a iniciar sesion." };
  }

  const admin = createAdminClient();
  const sortOrder = await getNextImageSortOrder(admin, propertyId);
  const uploadError = await uploadImagesForProperty(propertyId, files, sortOrder);

  if (uploadError) {
    return { ok: false, error: uploadError };
  }

  revalidatePath(`/admin/properties/${propertyId}/images`);
  revalidatePath("/admin/properties");
  revalidatePath("/comprar");

  return { ok: true, uploaded: files.length };
}

export async function movePropertyImageAction(formData: FormData) {
  const propertyId = String(formData.get("property_id") ?? "");
  const imageId = String(formData.get("image_id") ?? "");
  const direction = String(formData.get("direction") ?? "");

  if (!z.string().uuid().safeParse(propertyId).success || !z.string().uuid().safeParse(imageId).success) {
    redirect("/admin/properties?error=invalid-image");
  }

  if (direction !== "up" && direction !== "down") {
    redirect(`/admin/properties/${propertyId}/images?error=${encodeURIComponent("Direccion no valida.")}`);
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const admin = createAdminClient();
  const { data: images, error } = await admin
    .from("property_images")
    .select("id, sort_order")
    .eq("property_id", propertyId)
    .order("sort_order", { ascending: true });

  if (error || !images?.length) {
    redirect(`/admin/properties/${propertyId}/images?error=${encodeURIComponent(error?.message || "No se pudieron leer las fotos.")}`);
  }

  const currentIndex = images.findIndex((image) => image.id === imageId);
  const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

  if (currentIndex < 0 || targetIndex < 0 || targetIndex >= images.length) {
    redirect(`/admin/properties/${propertyId}/images`);
  }

  const current = images[currentIndex];
  const target = images[targetIndex];

  const [currentUpdate, targetUpdate] = await Promise.all([
    admin.from("property_images").update({ sort_order: target.sort_order }).eq("id", current.id),
    admin.from("property_images").update({ sort_order: current.sort_order }).eq("id", target.id)
  ]);

  const updateError = currentUpdate.error || targetUpdate.error;

  if (updateError) {
    redirect(`/admin/properties/${propertyId}/images?error=${encodeURIComponent(updateError.message)}`);
  }

  const reordered = [...images];
  reordered[currentIndex] = target;
  reordered[targetIndex] = current;
  const coverError = await setCoverImage(admin, propertyId, reordered[0].id);

  if (coverError) {
    redirect(`/admin/properties/${propertyId}/images?error=${encodeURIComponent(coverError)}`);
  }

  revalidatePath(`/admin/properties/${propertyId}/images`);
  revalidatePath("/admin/properties");
  revalidatePath("/comprar");
  redirect(`/admin/properties/${propertyId}/images?success=ordered`);
}

export async function setPropertyImageCoverAction(formData: FormData) {
  const propertyId = String(formData.get("property_id") ?? "");
  const imageId = String(formData.get("image_id") ?? "");

  if (!z.string().uuid().safeParse(propertyId).success || !z.string().uuid().safeParse(imageId).success) {
    redirect("/admin/properties?error=invalid-image");
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const admin = createAdminClient();
  const { data: image, error } = await admin.from("property_images").select("id").eq("property_id", propertyId).eq("id", imageId).single();

  if (error || !image) {
    redirect(`/admin/properties/${propertyId}/images?error=${encodeURIComponent(error?.message || "Foto no encontrada.")}`);
  }

  const coverError = await setCoverImage(admin, propertyId, imageId);

  if (coverError) {
    redirect(`/admin/properties/${propertyId}/images?error=${encodeURIComponent(coverError)}`);
  }

  revalidatePath(`/admin/properties/${propertyId}/images`);
  revalidatePath("/admin/properties");
  revalidatePath("/comprar");
  redirect(`/admin/properties/${propertyId}/images?success=cover`);
}

export async function deletePropertyImageAction(formData: FormData) {
  const propertyId = String(formData.get("property_id") ?? "");
  const imageId = String(formData.get("image_id") ?? "");

  if (!z.string().uuid().safeParse(propertyId).success || !z.string().uuid().safeParse(imageId).success) {
    redirect("/admin/properties?error=invalid-image");
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const admin = createAdminClient();
  const { data: image, error: imageError } = await admin
    .from("property_images")
    .select("id, storage_path, is_cover")
    .eq("property_id", propertyId)
    .eq("id", imageId)
    .single();

  if (imageError || !image) {
    redirect(`/admin/properties/${propertyId}/images?error=${encodeURIComponent(imageError?.message || "Foto no encontrada.")}`);
  }

  const { error: storageError } = await admin.storage.from("property-images").remove([image.storage_path]);

  if (storageError) {
    redirect(`/admin/properties/${propertyId}/images?error=${encodeURIComponent(storageError.message)}`);
  }

  const { error: deleteError } = await admin.from("property_images").delete().eq("id", imageId).eq("property_id", propertyId);

  if (deleteError) {
    redirect(`/admin/properties/${propertyId}/images?error=${encodeURIComponent(deleteError.message)}`);
  }

  await normalizePropertyImageOrder(admin, propertyId);

  if (image.is_cover) {
    const { data: nextCover } = await admin
      .from("property_images")
      .select("id")
      .eq("property_id", propertyId)
      .order("sort_order", { ascending: true })
      .limit(1);

    if (nextCover?.[0]?.id) {
      const coverError = await setCoverImage(admin, propertyId, nextCover[0].id);

      if (coverError) {
        redirect(`/admin/properties/${propertyId}/images?error=${encodeURIComponent(coverError)}`);
      }
    }
  }

  revalidatePath(`/admin/properties/${propertyId}/images`);
  revalidatePath("/admin/properties");
  revalidatePath("/comprar");
  redirect(`/admin/properties/${propertyId}/images?success=deleted`);
}

function getImageFiles(formData: FormData) {
  return formData.getAll("images").filter((item): item is File => item instanceof File && item.size > 0);
}

async function uploadImagesForProperty(propertyId: string, files: File[], initialSortOrder: number) {
  const admin = createAdminClient();
  let sortOrder = initialSortOrder;

  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      return "Solo se pueden subir archivos de imagen.";
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeName = slugify(file.name.replace(/\.[^.]+$/, "")) || "foto";
    const storagePath = `${propertyId}/${Date.now()}-${sortOrder}-${safeName}.${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await admin.storage.from("property-images").upload(storagePath, buffer, {
      contentType: file.type,
      upsert: false
    });

    if (uploadError) {
      return uploadError.message;
    }

    const { error: insertError } = await admin.from("property_images").insert({
      property_id: propertyId,
      storage_path: storagePath,
      alt_text: file.name,
      sort_order: sortOrder,
      is_cover: sortOrder === 0
    });

    if (insertError) {
      return insertError.message;
    }

    sortOrder += 1;
  }

  return null;
}

async function getNextImageSortOrder(admin: ReturnType<typeof createAdminClient>, propertyId: string) {
  const { data } = await admin
    .from("property_images")
    .select("sort_order")
    .eq("property_id", propertyId)
    .order("sort_order", { ascending: false })
    .limit(1);

  return Number(data?.[0]?.sort_order ?? -1) + 1;
}

async function normalizePropertyImageOrder(admin: ReturnType<typeof createAdminClient>, propertyId: string) {
  const { data: images } = await admin
    .from("property_images")
    .select("id")
    .eq("property_id", propertyId)
    .order("sort_order", { ascending: true });

  await Promise.all(
    (images ?? []).map((image, index) => admin.from("property_images").update({ sort_order: index }).eq("id", image.id))
  );
}

async function setCoverImage(admin: ReturnType<typeof createAdminClient>, propertyId: string, imageId: string) {
  const { error: clearError } = await admin.from("property_images").update({ is_cover: false }).eq("property_id", propertyId);

  if (clearError) {
    return clearError.message;
  }

  const { error: coverError } = await admin.from("property_images").update({ is_cover: true }).eq("property_id", propertyId).eq("id", imageId);

  return coverError?.message ?? null;
}

function emptyToNull(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function splitTags(value?: string) {
  return (
    value
      ?.split(",")
      .map((tag) => tag.trim())
      .filter(Boolean) ?? []
  );
}
