import type { Metadata } from "next";
import { RegistrationWizard } from "@/components/registration/RegistrationWizard";

export const metadata: Metadata = { title: "Daftar Pasien Baru | RS Sehat Sejahtera" };

export default async function DaftarPage({
  searchParams,
}: {
  searchParams: Promise<{ poli?: string; doctor?: string }>;
}) {
  const { poli, doctor } = await searchParams;
  return <RegistrationWizard initialPoli={poli} initialDoctorId={doctor} />;
}
