"use client";

import { useSearchParams } from "next/navigation";
import { RegistrationWizard } from "@/components/registration/RegistrationWizard";

export function DaftarClient() {
  const searchParams = useSearchParams();
  const poli = searchParams.get("poli") ?? undefined;
  const doctor = searchParams.get("doctor") ?? undefined;
  return <RegistrationWizard initialPoli={poli} initialDoctorId={doctor} />;
}
