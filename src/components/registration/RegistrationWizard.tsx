"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { doctors, poliList, mockOpenSlots, getPoliCrowd, type SlotOption } from "@/lib/mock-data";
import { generateRegistrationId, saveRegistration } from "@/lib/registration-store";
import { formatDateTime } from "@/lib/format";
import { Icon } from "@/components/icons";
import { CrowdBadge } from "@/components/CrowdBadge";

interface FormState {
  patientName: string;
  dob: string;
  gender: "L" | "P" | "";
  nik: string;
  phone: string;
  address: string;
  poli: string;
  doctorId: string;
  slot: SlotOption | null;
}

const STEPS = ["Data diri", "Pilih layanan", "Pilih jadwal", "Konfirmasi"] as const;

const fieldClass =
  "rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-teal-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";
const labelClass = "text-sm font-medium text-zinc-800 dark:text-zinc-200";

function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs">
      {STEPS.map((label, i) => (
        <li key={label} className="flex items-center gap-2">
          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-medium ${
              i < current
                ? "bg-teal-700 text-white"
                : i === current
                  ? "border-2 border-teal-700 text-teal-700 dark:text-teal-400"
                  : "border border-zinc-300 text-zinc-400 dark:border-zinc-700 dark:text-zinc-600"
            }`}
          >
            {i < current ? <Icon name="check" className="h-3 w-3" /> : i + 1}
          </span>
          <span className={i === current ? "font-medium text-zinc-900 dark:text-zinc-50" : "text-zinc-500 dark:text-zinc-400"}>
            {label}
          </span>
          {i < STEPS.length - 1 && <span className="mx-1 h-px w-6 bg-zinc-300 dark:bg-zinc-700" />}
        </li>
      ))}
    </ol>
  );
}

export function RegistrationWizard({ initialPoli, initialDoctorId }: { initialPoli?: string; initialDoctorId?: string }) {
  const preselectedDoctor = initialDoctorId ? doctors.find((d) => d.id === initialDoctorId) : undefined;

  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    patientName: "",
    dob: "",
    gender: "",
    nik: "",
    phone: "",
    address: "",
    poli: preselectedDoctor?.poli ?? initialPoli ?? "",
    doctorId: preselectedDoctor?.id ?? "",
    slot: null,
  });

  const doctorsInPoli = useMemo(() => doctors.filter((d) => d.poli === form.poli), [form.poli]);
  const selectedDoctor = doctors.find((d) => d.id === form.doctorId);
  const slots = useMemo(() => (form.doctorId ? mockOpenSlots(form.doctorId) : []), [form.doctorId]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validateStep(): string | null {
    if (step === 0) {
      if (!form.patientName.trim()) return "Nama lengkap wajib diisi.";
      if (!form.dob) return "Tanggal lahir wajib diisi.";
      if (!form.gender) return "Jenis kelamin wajib dipilih.";
      if (!/^\d{16}$/.test(form.nik)) return "NIK harus 16 digit angka.";
      if (!form.phone.trim()) return "Nomor HP wajib diisi.";
      if (!form.address.trim()) return "Alamat wajib diisi.";
    }
    if (step === 1) {
      if (!form.poli) return "Pilih poli terlebih dahulu.";
      if (!form.doctorId) return "Pilih dokter terlebih dahulu.";
    }
    if (step === 2) {
      if (!form.slot) return "Pilih jadwal terlebih dahulu.";
    }
    return null;
  }

  function goNext() {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleSubmit() {
    if (!selectedDoctor || !form.slot) return;
    const id = generateRegistrationId(selectedDoctor.poliCode);
    saveRegistration({
      id,
      patientName: form.patientName,
      dob: form.dob,
      gender: form.gender as "L" | "P",
      nik: form.nik,
      phone: form.phone,
      address: form.address,
      poli: form.poli,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      slotStartAt: form.slot.startAt,
      status: "MENUNGGU_KONFIRMASI",
      createdAt: new Date().toISOString(),
    });
    setSubmittedId(id);
  }

  if (submittedId) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center gap-4 px-6 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
          <Icon name="check" className="h-7 w-7" />
        </span>
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Pendaftaran berhasil</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Simpan nomor pendaftaranmu untuk mengecek status nanti.
        </p>
        <p className="rounded-lg border border-dashed border-teal-300 bg-teal-50 px-6 py-3 text-lg font-semibold tabular-nums text-teal-800 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-200">
          {submittedId}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link
            href={`/status?id=${encodeURIComponent(submittedId)}`}
            className="cursor-pointer rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
          >
            Cek status pendaftaran
          </Link>
          <Link
            href="/"
            className="cursor-pointer rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Kembali ke beranda
          </Link>
        </div>
        <p className="mt-4 max-w-sm text-xs text-zinc-400 dark:text-zinc-600">
          Ini data contoh: nomor pendaftaran tersimpan di browser kamu sendiri (localStorage), bukan di server sungguhan.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Daftar pasien baru</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Isi data berikut untuk mendapatkan nomor pendaftaran.</p>
      </div>

      <Stepper current={step} />

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}

      {step === 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="patientName">Nama lengkap</label>
            <input id="patientName" className={fieldClass} value={form.patientName} onChange={(e) => update("patientName", e.target.value)} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="dob">Tanggal lahir</label>
              <input id="dob" type="date" className={fieldClass} value={form.dob} onChange={(e) => update("dob", e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="gender">Jenis kelamin</label>
              <select id="gender" className={fieldClass} value={form.gender} onChange={(e) => update("gender", e.target.value as FormState["gender"])}>
                <option value="">Pilih</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="nik">NIK (16 digit)</label>
            <input id="nik" inputMode="numeric" maxLength={16} className={fieldClass} value={form.nik} onChange={(e) => update("nik", e.target.value.replace(/\D/g, ""))} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="phone">Nomor HP</label>
            <input id="phone" className={fieldClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="address">Alamat</label>
            <textarea id="address" rows={2} className={fieldClass} value={form.address} onChange={(e) => update("address", e.target.value)} />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-5">
          <div>
            <p className={`${labelClass} mb-2`}>Pilih poli</p>
            <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
              Tingkat keramaian ditampilkan supaya kamu bisa pertimbangkan waktu terbaik untuk datang.
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {poliList.map((p) => {
                const crowd = getPoliCrowd(p.code);
                const active = form.poli === p.name;
                return (
                  <button
                    key={p.code}
                    type="button"
                    onClick={() => {
                      update("poli", p.name);
                      update("doctorId", "");
                    }}
                    className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg border p-3 text-left transition-colors ${
                      active
                        ? "border-teal-700 bg-teal-50 dark:bg-teal-950"
                        : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{p.name}</span>
                    {crowd && <CrowdBadge level={crowd.level} />}
                  </button>
                );
              })}
            </div>
          </div>

          {form.poli && (
            <div>
              <p className={`${labelClass} mb-2`}>Pilih dokter</p>
              <div className="flex flex-col gap-2">
                {doctorsInPoli.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => update("doctorId", d.id)}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3 text-left transition-colors ${
                      form.doctorId === d.id
                        ? "border-teal-700 bg-teal-50 dark:bg-teal-950"
                        : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{d.name}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{d.room} · Praktik: {d.practiceDays}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-3">
          {slots.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Pilih dokter dulu di langkah sebelumnya.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {slots.slice(0, 24).map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => update("slot", slot)}
                  className={`cursor-pointer rounded-md border px-3 py-1.5 text-sm transition-colors ${
                    form.slot?.id === slot.id
                      ? "border-teal-700 bg-teal-700 text-white"
                      : "border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                  }`}
                >
                  {formatDateTime(slot.startAt)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-5 text-sm dark:border-zinc-800">
          <div className="flex justify-between gap-3"><span className="text-zinc-500 dark:text-zinc-400">Nama</span><span className="font-medium text-zinc-900 dark:text-zinc-50">{form.patientName}</span></div>
          <div className="flex justify-between gap-3"><span className="text-zinc-500 dark:text-zinc-400">Tanggal lahir</span><span className="font-medium text-zinc-900 dark:text-zinc-50">{form.dob}</span></div>
          <div className="flex justify-between gap-3"><span className="text-zinc-500 dark:text-zinc-400">Poli</span><span className="font-medium text-zinc-900 dark:text-zinc-50">{form.poli}</span></div>
          <div className="flex justify-between gap-3"><span className="text-zinc-500 dark:text-zinc-400">Dokter</span><span className="font-medium text-zinc-900 dark:text-zinc-50">{selectedDoctor?.name}</span></div>
          <div className="flex justify-between gap-3"><span className="text-zinc-500 dark:text-zinc-400">Jadwal</span><span className="font-medium text-zinc-900 dark:text-zinc-50">{form.slot ? formatDateTime(form.slot.startAt) : "-"}</span></div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="cursor-pointer rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          Kembali
        </button>
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="cursor-pointer rounded-md bg-teal-700 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
          >
            Lanjut
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="cursor-pointer rounded-md bg-teal-700 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
          >
            Daftar Sekarang
          </button>
        )}
      </div>
    </div>
  );
}
