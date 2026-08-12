export interface Hospital {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  emergencyPhone: string;
  operatingHours: string;
  foundedYear: number;
}

export const hospital: Hospital = {
  name: "RS Sehat Sejahtera",
  tagline: "Perawatan terpercaya, pendaftaran tanpa antre.",
  address: "Jl. Melati Raya No. 45, Jakarta",
  phone: "(021) 555-0192",
  emergencyPhone: "119",
  operatingHours: "IGD 24 jam · Poli rawat jalan 07.00–20.00 WIB",
  foundedYear: 1998,
};

export const hospitalStats = [
  { label: "Tahun pengalaman", value: `${new Date().getFullYear() - hospital.foundedYear}+` },
  { label: "Dokter spesialis", value: "5" },
  { label: "Pasien dilayani/tahun", value: "12.000+" },
  { label: "Rating kepuasan pasien", value: "4.8/5" },
];

export interface WhyUsItem {
  title: string;
  description: string;
  icon: "clock" | "shield" | "heart" | "calendar";
}

export const whyUs: WhyUsItem[] = [
  {
    title: "Pendaftaran online",
    description: "Daftar dari rumah, pilih dokter dan jadwal sendiri, tanpa antre di loket.",
    icon: "calendar",
  },
  {
    title: "IGD 24 jam",
    description: "Layanan gawat darurat siaga setiap saat, setiap hari.",
    icon: "clock",
  },
  {
    title: "Dokter berpengalaman",
    description: "Tim dokter spesialis dengan bertahun-tahun pengalaman klinis.",
    icon: "shield",
  },
  {
    title: "Perawatan yang peduli",
    description: "Setiap pasien ditangani dengan perhatian penuh, bukan sekadar nomor antrean.",
    icon: "heart",
  },
];

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  poli: string;
  poliCode: string;
  room: string;
  practiceDays: string;
  consultationFee: number;
  bio: string;
  yearsExperience: number;
}

export const doctors: Doctor[] = [
  {
    id: "dr-1",
    name: "dr. A. P.",
    specialty: "Dokter Umum",
    poli: "Poli Umum",
    poliCode: "UMU",
    room: "Ruang 101",
    practiceDays: "Senin–Jumat",
    consultationFee: 75000,
    bio: "Melayani pemeriksaan umum, keluhan harian, dan surat rujukan.",
    yearsExperience: 12,
  },
  {
    id: "dr-2",
    name: "dr. B. S., Sp.A",
    specialty: "Spesialis Anak",
    poli: "Poli Anak",
    poliCode: "ANA",
    room: "Ruang 203",
    practiceDays: "Senin, Rabu, Jumat",
    consultationFee: 150000,
    bio: "Fokus pada tumbuh kembang anak dan imunisasi.",
    yearsExperience: 9,
  },
  {
    id: "dr-3",
    name: "dr. C. W., Sp.KK",
    specialty: "Spesialis Kulit & Kelamin",
    poli: "Poli Kulit & Kelamin",
    poliCode: "KUL",
    room: "Ruang 305",
    practiceDays: "Selasa, Kamis",
    consultationFee: 175000,
    bio: "Menangani masalah kulit, alergi, dan perawatan estetik dasar.",
    yearsExperience: 7,
  },
  {
    id: "dr-4",
    name: "dr. D. R., Sp.M",
    specialty: "Spesialis Mata",
    poli: "Poli Mata",
    poliCode: "MAT",
    room: "Ruang 210",
    practiceDays: "Senin, Kamis",
    consultationFee: 160000,
    bio: "Pemeriksaan mata umum, kacamata, dan katarak.",
    yearsExperience: 15,
  },
  {
    id: "dr-5",
    name: "dr. E. F., Sp.PD",
    specialty: "Spesialis Penyakit Dalam",
    poli: "Poli Penyakit Dalam",
    poliCode: "PDL",
    room: "Ruang 402",
    practiceDays: "Selasa, Rabu, Sabtu",
    consultationFee: 180000,
    bio: "Menangani penyakit dalam, kontrol rutin diabetes dan hipertensi.",
    yearsExperience: 11,
  },
];

export function getDoctor(id: string): Doctor | undefined {
  return doctors.find((d) => d.id === id);
}

export const poliList = Array.from(new Set(doctors.map((d) => d.poli))).map((poli) => {
  const sample = doctors.find((d) => d.poli === poli)!;
  return { name: poli, code: sample.poliCode, doctorCount: doctors.filter((d) => d.poli === poli).length };
});

export type CrowdLevel = "Sepi" | "Sedang" | "Ramai";

export interface PoliCrowd {
  poliCode: string;
  waitingCount: number;
  estimatedWaitMinutes: number;
  level: CrowdLevel;
}

export const poliCrowdToday: PoliCrowd[] = [
  { poliCode: "UMU", waitingCount: 28, estimatedWaitMinutes: 65, level: "Ramai" },
  { poliCode: "ANA", waitingCount: 9, estimatedWaitMinutes: 20, level: "Sedang" },
  { poliCode: "KUL", waitingCount: 3, estimatedWaitMinutes: 10, level: "Sepi" },
  { poliCode: "MAT", waitingCount: 14, estimatedWaitMinutes: 35, level: "Sedang" },
  { poliCode: "PDL", waitingCount: 22, estimatedWaitMinutes: 50, level: "Ramai" },
];

export function getPoliCrowd(poliCode: string): PoliCrowd | undefined {
  return poliCrowdToday.find((p) => p.poliCode === poliCode);
}

export interface SlotOption {
  id: string;
  startAt: string;
  endAt: string;
}

export function mockOpenSlots(doctorId: string): SlotOption[] {
  const slots: SlotOption[] = [];
  const now = new Date();
  const hours = [9, 10, 11, 13, 14, 15];
  for (let dayOffset = 1; dayOffset <= 5; dayOffset++) {
    for (const hour of hours) {
      const start = new Date(now);
      start.setDate(start.getDate() + dayOffset);
      start.setHours(hour, 0, 0, 0);
      const end = new Date(start.getTime() + 30 * 60 * 1000);
      slots.push({ id: `${doctorId}-slot-${dayOffset}-${hour}`, startAt: start.toISOString(), endAt: end.toISOString() });
    }
  }
  return slots;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Rina W.",
    role: "Pasien Poli Umum",
    quote: "Daftar online-nya gampang banget, dari HP langsung dapat nomor antrean. Tidak perlu datang pagi-pagi buat ambil nomor.",
    rating: 5,
  },
  {
    name: "Bambang S.",
    role: "Pasien Poli Penyakit Dalam",
    quote: "Dokternya sabar jelasin, dan jadwal kontrol rutin gampang diatur lewat website.",
    rating: 5,
  },
  {
    name: "Dewi A.",
    role: "Orang tua pasien Poli Anak",
    quote: "Suasana ruang tunggu nyaman untuk anak-anak, dan prosesnya cepat.",
    rating: 4,
  },
];
