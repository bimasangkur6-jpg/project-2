import type { Metadata } from "next";
import { StatusChecker } from "@/components/registration/StatusChecker";

export const metadata: Metadata = { title: "Cek Status Pendaftaran | RS Sehat Sejahtera" };

export default async function StatusPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  return <StatusChecker initialId={id} />;
}
