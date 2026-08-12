"use client";

import { useEffect, useMemo, useState } from "react";
import {
  listAllRegistrations,
  updateRegistrationStatus,
  type Registration,
  type RegistrationStatus,
} from "@/lib/registration-store";
import { poliCrowdToday } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/format";
import { CrowdBadge } from "@/components/CrowdBadge";

const STATUS_META: Record<RegistrationStatus, { label: string; className: string }> = {
  MENUNGGU_KONFIRMASI: { label: "Menunggu konfirmasi", className: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" },
  TERKONFIRMASI: { label: "Dikonfirmasi", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" },
  SELESAI: { label: "Selesai", className: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" },
  DIBATALKAN: { label: "Dibatalkan", className: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300" },
};

const FILTERS = ["SEMUA", "MENUNGGU_KONFIRMASI", "TERKONFIRMASI", "SELESAI", "DIBATALKAN"] as const;
const FILTER_LABEL: Record<(typeof FILTERS)[number], string> = {
  SEMUA: "Semua",
  MENUNGGU_KONFIRMASI: "Menunggu konfirmasi",
  TERKONFIRMASI: "Dikonfirmasi",
  SELESAI: "Selesai",
  DIBATALKAN: "Dibatalkan",
};

export function StaffDashboard() {
  const [registrations, setRegistrations] = useState<Registration[] | null>(null);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("SEMUA");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRegistrations(listAllRegistrations());
  }, []);

  function refresh() {
    setRegistrations(listAllRegistrations());
  }

  function act(id: string, status: RegistrationStatus) {
    updateRegistrationStatus(id, status);
    refresh();
  }

  const filtered = useMemo(() => {
    if (!registrations) return [];
    if (filter === "SEMUA") return registrations;
    return registrations.filter((r) => r.status === filter);
  }, [registrations, filter]);

  const waitingCount = registrations?.filter((r) => r.status === "MENUNGGU_KONFIRMASI").length ?? 0;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Portal petugas</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Lihat dan kelola pendaftaran pasien yang masuk.</p>
        <p className="mt-2 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          Halaman demo. Di dunia nyata halaman ini butuh login staf, tapi di portofolio ini sengaja dibuka supaya bisa
          dicoba tanpa akun, sama seperti halaman Cek Status.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Menunggu konfirmasi</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{waitingCount}</p>
        </div>
        <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Total pendaftaran</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{registrations?.length ?? "-"}</p>
        </div>
        <div className="col-span-2 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
          <p className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">Keramaian poli hari ini</p>
          <div className="flex flex-wrap gap-1.5">
            {poliCrowdToday.map((c) => (
              <CrowdBadge key={c.poliCode} level={c.level} waitingCount={c.waitingCount} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 rounded-md bg-zinc-100 p-1 dark:bg-zinc-800">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`cursor-pointer rounded px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-950 dark:text-zinc-50"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {FILTER_LABEL[f]}
          </button>
        ))}
      </div>

      {registrations === null ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Memuat…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Tidak ada pendaftaran untuk filter ini.</p>
      ) : (
        <div className="max-h-[32rem] overflow-y-auto overflow-x-auto overscroll-contain rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 border-b border-zinc-200 bg-white text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-2 font-medium">No. pendaftaran</th>
                <th className="px-4 py-2 font-medium">Pasien</th>
                <th className="px-4 py-2 font-medium">Poli / dokter</th>
                <th className="px-4 py-2 font-medium">Jadwal</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-mono text-xs text-zinc-700 dark:text-zinc-300">{r.id}</td>
                  <td className="px-4 py-2 text-zinc-900 dark:text-zinc-50">{r.patientName}</td>
                  <td className="px-4 py-2 text-zinc-600 dark:text-zinc-400">
                    {r.poli}
                    <br />
                    <span className="text-xs">{r.doctorName}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-zinc-600 dark:text-zinc-400">{formatDateTime(r.slotStartAt)}</td>
                  <td className="px-4 py-2">
                    <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_META[r.status].className}`}>
                      {STATUS_META[r.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-1.5">
                      {r.status === "MENUNGGU_KONFIRMASI" && (
                        <button
                          type="button"
                          onClick={() => act(r.id, "TERKONFIRMASI")}
                          className="cursor-pointer rounded-md border border-zinc-300 px-2.5 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                        >
                          Konfirmasi
                        </button>
                      )}
                      {r.status === "TERKONFIRMASI" && (
                        <button
                          type="button"
                          onClick={() => act(r.id, "SELESAI")}
                          className="cursor-pointer rounded-md border border-zinc-300 px-2.5 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                        >
                          Selesai
                        </button>
                      )}
                      {r.status !== "DIBATALKAN" && r.status !== "SELESAI" && (
                        <button
                          type="button"
                          onClick={() => act(r.id, "DIBATALKAN")}
                          className="cursor-pointer rounded-md border border-zinc-300 px-2.5 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-zinc-700 dark:text-red-400 dark:hover:bg-red-950"
                        >
                          Batalkan
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
