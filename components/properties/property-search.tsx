import { SlidersHorizontal, Search } from "lucide-react";
import type { PropertyFilters } from "@/lib/properties/public-properties";

export function PropertySearch({ filters = {} }: { filters?: PropertyFilters }) {
  return (
    <form className="rounded-2xl border border-white/15 bg-[#201b1c] p-4 md:p-6">
      <div className="grid gap-3 lg:grid-cols-[1.35fr_repeat(5,1fr)_auto]">
        <label className="grid gap-1 text-sm font-semibold text-neutral-700">
          Zona
          <span className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <input className="h-12 w-full rounded-md border border-black/10 pl-9 pr-3" name="zone" placeholder="Municipio o barrio" defaultValue={filters.zone ?? ""} />
          </span>
        </label>
        <Select name="operation" label="Operacion" defaultValue={filters.operation ?? ""} options={[["", "Todas"], ["sale", "Venta"], ["rent", "Alquiler"]]} />
        <Select name="type" label="Tipo" defaultValue={filters.type ?? "all"} options={[["all", "Todos"], ["Piso", "Piso"], ["Casa", "Casa"], ["Atico", "Atico"], ["Chalet", "Chalet"], ["Local", "Local"]]} />
        <Select name="maxPrice" label="Precio" defaultValue={filters.maxPrice?.toString() ?? ""} options={[["", "Sin limite"], ["150000", "Hasta 150.000"], ["250000", "Hasta 250.000"], ["400000", "Hasta 400.000"], ["700000", "Hasta 700.000"]]} />
        <Select name="bedrooms" label="Habitaciones" defaultValue={filters.bedrooms?.toString() ?? ""} options={[["", "Todas"], ["1", "1+"], ["2", "2+"], ["3", "3+"], ["4", "4+"]]} />
        <Select name="sort" label="Orden" defaultValue={filters.sort ?? "recent"} options={[["recent", "Recientes"], ["price_asc", "Precio bajo"], ["price_desc", "Precio alto"]]} />
        <button className="origin-primary mt-auto inline-flex h-12 items-center justify-center gap-2 px-5 font-medium transition" type="submit">
          <SlidersHorizontal size={17} />
          Filtrar
        </button>
      </div>
      <fieldset className="mt-5 flex flex-wrap gap-2 border-0 p-0">
        <legend className="mb-2 text-sm font-semibold text-neutral-700">Caracteristicas</legend>
        <Checkbox name="feature" value="elevator" label="Ascensor" checked={filters.feature?.includes("elevator")} />
        <Checkbox name="feature" value="terrace" label="Terraza" checked={filters.feature?.includes("terrace")} />
        <Checkbox name="feature" value="garage" label="Garaje" checked={filters.feature?.includes("garage")} />
        <Checkbox name="feature" value="storage" label="Trastero" checked={filters.feature?.includes("storage")} />
        <Checkbox name="feature" value="pool" label="Piscina" checked={filters.feature?.includes("pool")} />
      </fieldset>
    </form>
  );
}

function Select({
  name,
  label,
  options,
  defaultValue
}: {
  name: string;
  label: string;
  options: [string, string][];
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-neutral-700">
      {label}
      <select className="h-12 rounded-lg border border-white/10 bg-black px-3 text-white" name={name} defaultValue={defaultValue}>
        {options.map(([value, option]) => (
          <option key={value} value={value}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Checkbox({ name, value, label, checked = false }: { name: string; value: string; label: string; checked?: boolean }) {
  return (
    <label className="flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 text-sm font-normal text-white/70 transition hover:border-white/40 hover:bg-white/10">
      <input name={name} type="checkbox" value={value} defaultChecked={checked} className="accent-brand-red" />
      {label}
    </label>
  );
}
