# Plantilla inmobiliaria reutilizable

Esta web funciona como proyecto real de AKTUA HOME y como base para vender webs a otras inmobiliarias.

## Que se cambia para una nueva inmobiliaria

1. Edita `lib/site-config.ts`:
   - `brandName`
   - `legalName`
   - `ownerName`
   - `taxId`
   - `location`
   - `shortDescription`
   - `publicSiteUrl`
   - `contact.email`
   - `contact.phone`
   - `contact.address`
   - rutas de logos e imagen principal en `assets`

2. Cambia los logos en `public/assets/`:
   - logo de header
   - logo de footer
   - imagen hero de inicio

3. Crea un proyecto nuevo en Supabase:
   - ejecuta las migraciones de `supabase/migrations/`
   - crea el usuario admin en Authentication
   - crea/configura el bucket de imagenes si hace falta
   - configura las politicas RLS necesarias

4. Configura variables de entorno en `.env.local` y en Vercel:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAILS`
   - `NEXT_PUBLIC_WHATSAPP_PHONE`

5. Revisa textos legales:
   - `app/politica-privacidad/page.tsx` ya toma datos desde `siteConfig`
   - `app/politica-cookies/page.tsx`
   - `app/aviso-legal/page.tsx`

6. Publica en Vercel:
   - nuevo repositorio GitHub
   - nuevo proyecto Vercel
   - variables de entorno propias del cliente
   - dominio del cliente

## Importante

No reutilices nunca claves de Supabase de AKTUA HOME para otro cliente.

No vendas una copia con el mismo `SUPABASE_SERVICE_ROLE_KEY`, usuarios admin o buckets compartidos.

Para cada cliente: Supabase nuevo, Vercel nuevo y dominio nuevo.

## Partes ya preparadas para vender como producto

- Web publica inmobiliaria responsive.
- Listado de viviendas con filtros.
- Ficha de inmueble con galeria.
- Panel admin oculto del menu publico.
- Creacion, edicion, activacion, eliminacion y reordenacion de inmuebles.
- Subida, eliminacion y ordenacion de fotos.
- Blog base.
- Formularios de leads.
- Politicas legales configurables.
- Configuracion central de marca en `lib/site-config.ts`.
