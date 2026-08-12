import Link from "next/link";
import { hospital, hospitalStats, whyUs, poliList, doctors, testimonials, getPoliCrowd } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";
import { Icon } from "@/components/icons";
import { CrowdBadge } from "@/components/CrowdBadge";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="border-b border-zinc-200 bg-gradient-to-b from-teal-50 to-white dark:border-zinc-800 dark:from-teal-950/40 dark:to-zinc-950">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-6 py-16 sm:py-20">
          <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-800 dark:bg-teal-900 dark:text-teal-200">
            Pendaftaran online 24 jam
          </span>
          <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            {hospital.tagline}
          </h1>
          <p className="max-w-xl text-base text-zinc-600 dark:text-zinc-400">
            Daftar sebagai pasien baru, pilih dokter dan jadwal yang kamu mau, langsung dapat nomor
            pendaftaran. Tidak perlu antre di loket sejak pagi.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/daftar"
              className="cursor-pointer rounded-md bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-800"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/status"
              className="cursor-pointer rounded-md border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              Cek Status Pendaftaran
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-amber-50/60 px-6 py-10 dark:border-zinc-800 dark:bg-amber-950/10">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Tingkat keramaian poli hari ini</h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Banyak orang datang langsung ke RS tanpa tahu ternyata sedang ramai. Cek dulu di sini, lalu daftar
                online supaya tidak menunggu lama di tempat.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {poliList.map((poli) => {
              const crowd = getPoliCrowd(poli.code);
              return (
                <div key={poli.code} className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200">{poli.name}</p>
                  {crowd && (
                    <>
                      <div className="mt-2">
                        <CrowdBadge level={crowd.level} />
                      </div>
                      <p className="mt-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                        Estimasi tunggu ~{crowd.estimatedWaitMinutes} menit
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4">
          {hospitalStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-semibold text-teal-700 dark:text-teal-400 sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Kenapa memilih kami</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Pelayanan yang dirancang supaya kamu tidak perlu repot.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item) => (
              <div key={item.title} className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300">
                  <Icon name={item.icon} />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</h3>
                <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="layanan" className="scroll-mt-20 border-t border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Layanan poli</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Pilih layanan sesuai kebutuhanmu.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {poliList.map((poli) => {
              const crowd = getPoliCrowd(poli.code);
              return (
                <div key={poli.code} className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{poli.name}</h3>
                    {crowd && <CrowdBadge level={crowd.level} />}
                  </div>
                  <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                    {poli.doctorCount} dokter tersedia
                  </p>
                  <Link
                    href={`/daftar?poli=${encodeURIComponent(poli.name)}`}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-teal-700 hover:underline dark:text-teal-400"
                  >
                    Daftar ke poli ini <Icon name="chevronRight" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="dokter" className="scroll-mt-20 px-6 py-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Dokter kami</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Tim dokter spesialis berpengalaman.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="flex flex-col rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white">
                    {doctor.name.replace(/[^A-Z]/g, "").slice(0, 2) || "DR"}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{doctor.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{doctor.specialty}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400">{doctor.bio}</p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                  <span>{doctor.yearsExperience} tahun pengalaman</span>
                  <span>·</span>
                  <span>Praktik: {doctor.practiceDays}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(doctor.consultationFee)}</span>
                  <Link
                    href={`/daftar?doctor=${doctor.id}`}
                    className="cursor-pointer rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    Daftar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Kata pasien kami</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" className={`h-3.5 w-3.5 ${i < t.rating ? "fill-current" : "text-zinc-300 dark:text-zinc-700"}`} />
                  ))}
                </div>
                <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">&quot;{t.quote}&quot;</p>
                <p className="mt-4 text-xs font-medium text-zinc-900 dark:text-zinc-50">{t.name}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 rounded-2xl bg-teal-700 px-6 py-12 text-center text-white">
          <h2 className="text-2xl font-semibold">Siap untuk konsultasi?</h2>
          <p className="max-w-md text-sm text-teal-50">Daftar sekarang, pilih dokter dan jadwal yang paling pas buat kamu.</p>
          <Link
            href="/daftar"
            className="cursor-pointer rounded-md bg-white px-5 py-2.5 text-sm font-medium text-teal-800 transition-colors hover:bg-teal-50"
          >
            Daftar Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}
