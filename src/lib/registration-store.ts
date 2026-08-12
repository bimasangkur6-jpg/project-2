export type RegistrationStatus = "MENUNGGU_KONFIRMASI" | "TERKONFIRMASI" | "SELESAI" | "DIBATALKAN";

export interface Registration {
  id: string;
  patientName: string;
  dob: string;
  gender: "L" | "P";
  nik: string;
  phone: string;
  address: string;
  poli: string;
  doctorId: string;
  doctorName: string;
  slotStartAt: string;
  status: RegistrationStatus;
  createdAt: string;
}

const STORAGE_KEY = "rs_registrations";

export function generateRegistrationId(poliCode: string): string {
  const now = new Date();
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const seq = String(Math.floor(Math.random() * 900) + 100);
  return `REG-${poliCode}-${datePart}-${seq}`;
}

function readLocal(): Registration[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Registration[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(all: Registration[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

function upsertLocal(reg: Registration): void {
  const all = readLocal();
  const idx = all.findIndex((r) => r.id === reg.id);
  if (idx >= 0) all[idx] = reg;
  else all.push(reg);
  writeLocal(all);
}

export function saveRegistration(reg: Registration): void {
  upsertLocal(reg);
}

const SEED_REGISTRATIONS: Registration[] = [
  {
    id: "REG-UMU-20260810-104",
    patientName: "Contoh Pasien (demo)",
    dob: "1990-05-12",
    gender: "L",
    nik: "3171xxxxxxxxxxxx",
    phone: "0812xxxxxxx",
    address: "Jakarta",
    poli: "Poli Umum",
    doctorId: "dr-1",
    doctorName: "dr. A. P.",
    slotStartAt: new Date(Date.now() + 2 * 86400000).toISOString(),
    status: "TERKONFIRMASI",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: "REG-ANA-20260805-231",
    patientName: "Contoh Pasien Lain (demo)",
    dob: "2018-02-03",
    gender: "P",
    nik: "3171xxxxxxxxxxxx",
    phone: "0813xxxxxxx",
    address: "Jakarta",
    poli: "Poli Anak",
    doctorId: "dr-2",
    doctorName: "dr. B. S., Sp.A",
    slotStartAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    status: "SELESAI",
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
  },
  {
    id: "REG-PDL-20260812-057",
    patientName: "Contoh Pasien 3 (demo)",
    dob: "1975-11-20",
    gender: "L",
    nik: "3171xxxxxxxxxxxx",
    phone: "0814xxxxxxx",
    address: "Bekasi",
    poli: "Poli Penyakit Dalam",
    doctorId: "dr-5",
    doctorName: "dr. E. F., Sp.PD",
    slotStartAt: new Date(Date.now() + 1 * 86400000).toISOString(),
    status: "MENUNGGU_KONFIRMASI",
    createdAt: new Date(Date.now() - 3 * 3600000).toISOString(),
  },
  {
    id: "REG-MAT-20260811-089",
    patientName: "Contoh Pasien 4 (demo)",
    dob: "2001-03-08",
    gender: "P",
    nik: "3171xxxxxxxxxxxx",
    phone: "0815xxxxxxx",
    address: "Depok",
    poli: "Poli Mata",
    doctorId: "dr-4",
    doctorName: "dr. D. R., Sp.M",
    slotStartAt: new Date(Date.now() + 4 * 3600000).toISOString(),
    status: "MENUNGGU_KONFIRMASI",
    createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
  },
];

export function listAllRegistrations(): Registration[] {
  const local = readLocal();
  const byId = new Map<string, Registration>();
  for (const r of SEED_REGISTRATIONS) byId.set(r.id, r);
  for (const r of local) byId.set(r.id, r);
  return Array.from(byId.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function findRegistration(id: string): Registration | undefined {
  const needle = id.trim().toUpperCase();
  return listAllRegistrations().find((r) => r.id.toUpperCase() === needle);
}

export function updateRegistrationStatus(id: string, status: RegistrationStatus): void {
  const current = findRegistration(id);
  if (!current) return;
  upsertLocal({ ...current, status });
}

export const demoRegistrationIds = SEED_REGISTRATIONS.map((r) => r.id);
