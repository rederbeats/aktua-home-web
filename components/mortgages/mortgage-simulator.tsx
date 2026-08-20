"use client";

import { ArrowRight, Zap } from "lucide-react";
import { useMemo, useState } from "react";

const numberFormatter = new Intl.NumberFormat("es-ES");
const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
});

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function parseValue(value: string, fallback: number) {
  const parsed = Number(value.replace(/\./g, "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function formatCurrency(value: number) {
  return currencyFormatter.format(Math.max(0, Math.round(value)));
}

function formatPercent(value: number) {
  return new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 }).format(value) + "%";
}

export function MortgageSimulator() {
  const [price, setPrice] = useState(250000);
  const [savings, setSavings] = useState(15000);
  const [years, setYears] = useState(30);
  const [interest, setInterest] = useState(2.8);

  const result = useMemo(() => {
    const safePrice = Math.max(price, 0);
    const safeSavings = clamp(savings, 0, safePrice);
    const principal = Math.max(safePrice - safeSavings, 0);
    const months = Math.max(years * 12, 1);
    const monthlyRate = Math.max(interest, 0) / 100 / 12;
    const monthlyPayment = monthlyRate === 0 ? principal / months : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    const totalPaid = monthlyPayment * months;
    const totalInterest = Math.max(totalPaid - principal, 0);
    const financingRatio = safePrice > 0 ? (principal / safePrice) * 100 : 0;
    const recommendedIncome = monthlyPayment / 0.35;

    return {
      principal,
      monthlyPayment,
      totalInterest,
      totalPaid,
      financingRatio,
      recommendedIncome,
      isHighFinancing: financingRatio > 95
    };
  }, [price, savings, years, interest]);

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="container overflow-hidden rounded-lg border border-black/10 bg-paper shadow-soft">
        <div className="grid lg:grid-cols-[1.22fr_0.78fr]">
          <div className="p-5 md:p-8 lg:p-10">
            <div className="flex items-start gap-4 border-b border-black/10 pb-6">
              <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-md bg-brand-red text-sm font-black text-white">01</span>
              <div>
                <p className="section-kicker">Simulador hipotecario</p>
                <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl">Calcula una cuota orientativa</h2>
                <p className="mt-3 max-w-2xl leading-7 text-neutral-600">
                  Ajusta las cifras de tu operación y consulta una estimación antes de pedir un estudio personalizado.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <NumberField label="Precio de la vivienda" value={price} suffix="€" min={30000} max={1500000} step={5000} onChange={setPrice} />
              <NumberField label="Ahorros aportados" value={savings} suffix="€" min={0} max={price} step={1000} onChange={setSavings} />
              <NumberField label="Plazo" value={years} suffix="años" min={5} max={40} step={1} onChange={setYears} />
              <NumberField label="Tipo de interés" value={interest} suffix="%" min={0.5} max={8} step={0.1} decimals={1} onChange={setInterest} />
            </div>

            <div className="mt-8 border-t border-black/10 pt-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-neutral-500">Financiación solicitada</p>
                  <p className="mt-1 text-sm text-neutral-500">{formatPercent(result.financingRatio)} del precio de compra</p>
                </div>
                <strong className="text-3xl font-black md:text-4xl">{formatCurrency(result.principal)}</strong>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/10">
                <div
                  className="h-full rounded-full bg-brand-red transition-all duration-300"
                  style={{ width: `${clamp(result.financingRatio, 0, 100)}%` }}
                />
              </div>
              {result.isHighFinancing ? (
                <p className="mt-3 rounded-md bg-brand-red/10 px-3 py-2 text-sm font-semibold text-brand-red">
                  Supera el 95%. Podemos estudiar tu caso, pero la viabilidad dependerá del perfil y de la entidad.
                </p>
              ) : null}
            </div>
          </div>

          <aside className="bg-brand-dark p-5 text-white md:p-8 lg:p-10">
            <p className="section-kicker text-red-300">Cuota mensual estimada</p>
            <div className="mt-6 flex flex-wrap items-end gap-x-2 gap-y-1">
              <strong className="text-5xl font-black leading-none md:text-6xl">{numberFormatter.format(Math.round(result.monthlyPayment))} €</strong>
              <span className="pb-1 text-lg text-white/70">/mes</span>
            </div>
            <p className="mt-4 text-white/70">Préstamo de {formatCurrency(result.principal)} a {years} años</p>

            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              <ResultRow label="Capital solicitado" value={formatCurrency(result.principal)} />
              <ResultRow label="Intereses totales" value={formatCurrency(result.totalInterest)} />
              <ResultRow label="Importe total" value={formatCurrency(result.totalPaid)} />
            </div>

            <div className="mt-8 border-l-4 border-brand-red bg-white/10 p-5">
              <div className="flex items-center gap-2 text-sm font-black">
                <Zap size={16} className="text-red-300" />
                Ingresos recomendados
              </div>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Para no superar un 35% de esfuerzo financiero: <strong className="text-white">{formatCurrency(result.recommendedIncome)}/mes</strong>
              </p>
            </div>

            <a
              href="#consulta-hipoteca"
              className="mt-8 flex min-h-14 items-center justify-between rounded-md bg-brand-red px-5 font-black text-white shadow-[0_18px_40px_rgba(200,16,34,0.28)] transition hover:-translate-y-0.5 hover:bg-red-700"
            >
              Solicitar estudio personalizado
              <ArrowRight size={20} />
            </a>
            <p className="mt-3 text-center text-xs text-white/50">Estimación orientativa. Sin compromiso.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

type NumberFieldProps = {
  label: string;
  value: number;
  suffix: string;
  min: number;
  max: number;
  step: number;
  decimals?: number;
  onChange: (value: number) => void;
};

function NumberField({ label, value, suffix, min, max, step, decimals = 0, onChange }: NumberFieldProps) {
  const displayValue = decimals ? value.toFixed(decimals).replace(".", ",") : String(Math.round(value));

  return (
    <label className="grid gap-3">
      <span className="text-xs font-black uppercase tracking-[0.12em] text-neutral-500">{label}</span>
      <span className="grid grid-cols-[1fr_auto] items-center rounded-md border border-black/10 bg-white focus-within:border-brand-red focus-within:shadow-[0_0_0_4px_rgba(200,16,34,0.12)]">
        <input
          value={displayValue}
          inputMode="decimal"
          onChange={(event) => onChange(clamp(parseValue(event.target.value, value), min, max))}
          className="h-16 min-w-0 border-0 bg-transparent px-4 text-2xl font-black outline-none focus:shadow-none"
        />
        <span className="px-4 text-sm font-black text-brand-red">{suffix}</span>
      </span>
      <input
        aria-label={label + " slider"}
        type="range"
        min={min}
        max={max}
        step={step}
        value={clamp(value, min, max)}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 cursor-pointer accent-brand-red"
      />
    </label>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 text-sm">
      <span className="text-white/70">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
