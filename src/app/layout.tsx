import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";
import { hospital } from "@/lib/mock-data";
import { Icon } from "@/components/icons";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${hospital.name} | Pendaftaran pasien online`,
  description: `Website resmi ${hospital.name} (portofolio demo): informasi layanan, dokter, dan pendaftaran pasien online tanpa antre.`,
  authors: [{ name: "Bima Sangkur" }],
};

const NAV_LINKS = [
  { href: "/#layanan", label: "Layanan" },
  { href: "/#dokter", label: "Dokter" },
  { href: "/status", label: "Cek Status" },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="h-full overflow-hidden bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <div className="app-scroll flex h-full flex-col">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-teal-900 px-6 py-1.5 text-center text-xs text-teal-50">
          <span className="flex items-center gap-1">
            <Icon name="phone" className="h-3.5 w-3.5" /> {hospital.phone}
          </span>
          <span className="flex items-center gap-1 font-medium text-amber-300">
            <Icon name="shield" className="h-3.5 w-3.5" /> Darurat: {hospital.emergencyPhone}
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <Icon name="clock" className="h-3.5 w-3.5" /> {hospital.operatingHours}
          </span>
        </div>

        <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-white/95 px-6 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-white">
              <Icon name="stethoscope" className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{hospital.name}</span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400">{hospital.tagline}</span>
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-5 text-sm">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-zinc-600 transition-colors hover:text-teal-700 dark:text-zinc-400 dark:hover:text-teal-400"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/daftar"
              className="cursor-pointer rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
            >
              Daftar Sekarang
            </Link>
          </nav>
        </header>

        <main className="flex flex-1 flex-col">{children}</main>

        <footer className="border-t border-zinc-200 bg-zinc-50 px-6 py-10 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 sm:flex-row sm:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-700 text-white">
                  <Icon name="stethoscope" className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{hospital.name}</span>
              </div>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{hospital.tagline}</p>
              <p className="mt-3 flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0" /> {hospital.address}
              </p>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">Untuk pasien</span>
              <Link href="/daftar" className="text-zinc-600 hover:text-teal-700 dark:text-zinc-400 dark:hover:text-teal-400">
                Daftar pasien baru
              </Link>
              <Link href="/status" className="text-zinc-600 hover:text-teal-700 dark:text-zinc-400 dark:hover:text-teal-400">
                Cek status pendaftaran
              </Link>
              <Link href="/#dokter" className="text-zinc-600 hover:text-teal-700 dark:text-zinc-400 dark:hover:text-teal-400">
                Jadwal dokter
              </Link>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">Untuk petugas RS</span>
              <Link href="/petugas" className="text-zinc-600 hover:text-teal-700 dark:text-zinc-400 dark:hover:text-teal-400">
                Portal petugas: kelola pendaftaran
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-8 flex w-full max-w-5xl flex-wrap items-center justify-between gap-2 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            <span>© {new Date().getFullYear()} Bima Sangkur. Semua data pada situs ini adalah data contoh.</span>
            <span className="rounded-full bg-zinc-200 px-3 py-1 font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              Demo portofolio
            </span>
          </div>
        </footer>
        </div>
      </body>
    </html>
  );
}
