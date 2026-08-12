"use client";

import { useState } from "react";
import { findRegistration, demoRegistrationIds, type Registration, type RegistrationStatus } from "@/lib/registration-store";
import { formatDateTime, formatDate } from "@/lib/format";
import { Icon } from "@/components/icons";

const STATUS_META: Record<RegistrationStatus, { label: string; className: string }> = {
  MENUNGGU_KONFIRMASI: { label: "Menunggu konfirmasi", className: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" },
  TERKONFIRMASI: { label: "Dikonfirmasi", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" },
  SELESAI: { label: "Selesai", className: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" },
  DIBATALKAN: { label: "Dibatalkan", className: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300" },
};

export function StatusChecker({ initialId }: { initialId?: string }) {
  const [query, setQuery] = useState(initialId ?? "");
  const [result, setResult] = useState<Registration | null | undefined>(initialId ? findRegistration(initialId) : undefined);
  const [searched, setSearched] = useState(Boolean(initialId));

  function handleSearch() {
    setResult(findRegistration(query));
    setSearched(true);
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Cek status pendaftaran</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Masukkan nomor pendaftaran yang kamu dapat setelah mendaftar.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Contoh: REG-UMU-20260810-104"
          className="min-w-0 flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-teal-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="flex cursor-pointer items-center gap-1.5 rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
        >
          <Icon name="search" className="h-4 w-4" /> Cek
        </button>
      </div>

      {searched && !result && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          Nomor pendaftaran tidak ditemukan. Periksa kembali nomornya, atau daftar dulu lewat halaman Daftar.
        </p>
      )}

      {result && (
        <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 p-5 dark:border-zinc-800">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-50">{result.id}</p>
            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_META[result.status].className}`}>
              {STATUS_META[result.status].label}
            </span>
          </div>
          <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-zinc-500 dark:text-zinc-400">Nama pasien</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-50">{result.patientName}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500 dark:text-zinc-400">Poli</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-50">{result.poli}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500 dark:text-zinc-400">Dokter</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-50">{result.doctorName}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500 dark:text-zinc-400">Jadwal</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-50">{formatDateTime(result.slotStartAt)}</dd>
            </div>
          </dl>
          <p className="text-xs text-zinc-400 dark:text-zinc-600">Terdaftar {formatDate(result.createdAt)}</p>
        </div>
      )}

      {!searched && (
        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          Belum pernah daftar? Coba nomor contoh:{" "}
          {demoRegistrationIds.map((id, i) => (
            <span key={id}>
              <button
                type="button"
                onClick={() => {
                  setQuery(id);
                  setResult(findRegistration(id));
                  setSearched(true);
                }}
                className="cursor-pointer font-mono text-teal-700 hover:underline dark:text-teal-400"
              >
                {id}
              </button>
              {i < demoRegistrationIds.length - 1 && ", "}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
