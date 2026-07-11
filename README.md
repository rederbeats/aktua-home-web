# AKTUA HOME Web

Web inmobiliaria de AKTUA HOME preparada para Next.js, TypeScript, Tailwind CSS, Supabase, Vercel y GitHub.

El repositorio conserva la version previa del CRM local (`index.html`, `styles.css`, `app.js` y `apps-script/`) y añade la nueva app web modular.

## Estado actual

Primera estructura del proyecto creada:

- App Router de Next.js con TypeScript.
- Tailwind CSS configurado.
- Supabase preparado para base de datos, Auth y Storage.
- Paginas iniciales: inicio, comprar, vender mi vivienda, hipotecas, servicios, blog, sobre AKTUA HOME, contacto y legales.
- Panel privado inicial en `/admin`, preparado para Supabase Auth.
- Portal inmobiliario con listado, buscador visual, ficha, formulario, WhatsApp, relacionados y URLs SEO.
- Blog con listado, ficha, metadatos y Schema.org inicial.
- Migracion SQL con tablas, relaciones, indices, restricciones y RLS.
- Arquitectura desacoplada de importacion con adaptadores CSV, XML, API y manual.

## Arquitectura propuesta

```text
app/
  comprar/                 Portal inmobiliario publico
  blog/                    Blog SEO
  admin/                   Panel privado
  contacto/                Captacion de leads
components/
  forms/                   Formularios publicos
  layout/                  Header y footer
  properties/              Buscador y tarjetas
lib/
  domain/                  Validaciones Zod y tipos de negocio
  importers/               Adaptadores de importacion
  supabase/                Clientes Supabase y tipos
  utils/                   Utilidades compartidas
supabase/
  migrations/              Migraciones SQL
```

La importacion de inmuebles no depende de Idealista directamente. El sistema usa una interfaz comun `PropertyImporter` y adaptadores:

- `CsvPropertyImporter`
- `XmlPropertyImporter`
- `ApiPropertyImporter`
- `ManualPropertyImporter`

El servicio `planPropertyImport` compara datos entrantes con datos existentes y genera cambios revisables: crear, actualizar, marcar como retirado o mantener sin cambios. No borra datos automaticamente.

## Tablas de Supabase

La migracion inicial esta en `supabase/migrations/20260710190000_initial_schema.sql` e incluye:

- `profiles`
- `properties`
- `property_images`
- `property_features`
- `property_imports`
- `property_import_logs`
- `blog_posts`
- `blog_categories`
- `blog_tags`
- `blog_post_tags`
- `leads`
- `viewing_requests`
- `site_settings`

Incluye tipos enum, claves foraneas, indices principales y politicas Row Level Security.

## Variables de entorno

Copia `.env.example` a `.env.local` y completa:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAILS=
NEXT_PUBLIC_WHATSAPP_PHONE=
LEAD_SPAM_HONEYPOT_FIELD=company_name
```

Importante: `SUPABASE_SERVICE_ROLE_KEY` nunca debe exponerse en componentes cliente ni en el navegador.

## Instalacion local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

Comandos utiles:

```bash
npm run typecheck
npm run build
npm run lint
```

## Migraciones

Con Supabase CLI:

```bash
supabase db push
```

O copia el contenido de la migracion inicial en el SQL editor del proyecto Supabase.

## Fases de desarrollo

### Fase 1

- Configuracion completa de Next.js, Supabase y Tailwind.
- Aplicar migraciones.
- Conectar Supabase Auth.
- Crear login real y proteccion de `/admin`.
- Maquetacion base final.

### Fase 2

- Portal inmobiliario conectado a Supabase.
- Filtros reales por precio, zona, habitaciones, baños, tipo y caracteristicas.
- Ficha completa con galeria, video, tour virtual y formularios persistidos.

### Fase 3

- Blog conectado a Supabase.
- Editor en panel privado.
- SEO dinamico, categorias, etiquetas, Open Graph y Twitter Cards.

### Fase 4

- Importador CSV funcional desde panel.
- Revision de cambios antes de aplicar.
- Historial de sincronizaciones y logs.

### Fase 5

- Integracion real con Idealista o CRM cuando exista metodo de acceso: API, feed, CSV, XML, exportacion programada o webhook.

## Datos necesarios para importar desde Idealista

No se asume acceso directo a una API de Idealista. Para la integracion real haran falta:

- Metodo permitido por Idealista o por el CRM: API, feed XML, CSV, FTP, exportacion o webhook.
- Credenciales, tokens o claves si aplica.
- Contrato de datos: campos, tipos, imagenes, estados y periodicidad.
- Identificador externo estable por inmueble.
- Reglas de sincronizacion: que hacer con retirados, vendidos, reservas, imagenes y cambios manuales.
- Limites de uso, condiciones legales y permisos de publicacion.

## Riesgos tecnicos

- Idealista puede no ofrecer API directa para este caso o requerir condiciones comerciales concretas.
- Los feeds inmobiliarios suelen variar por proveedor; habra que mapear campos y estados.
- Imagenes externas pueden tener restricciones, caducidad o necesidad de descarga a Supabase Storage.
- Duplicados si no existe referencia externa estable.
- SEO duplicado si se publican textos identicos a portales externos.
- RGPD: formularios, cookies, trazabilidad de consentimientos y politicas deben revisarse legalmente.
- RLS debe endurecerse antes de produccion segun roles reales.

## Despliegue en Vercel

1. Conectar el repositorio de GitHub a Vercel.
2. Añadir variables de entorno.
3. Ejecutar migraciones en Supabase.
4. Configurar dominio.
5. Revisar `NEXT_PUBLIC_SITE_URL` con la URL final.
6. Ejecutar build de produccion.

## Siguiente paso recomendado

Completar fase 1: instalar dependencias, aplicar migracion en Supabase, configurar Auth y convertir el login/admin en flujo real.
