import type { Metadata } from "next";
import { Suspense } from "react";
import { StatusClient } from "./status-client";

export const metadata: Metadata = { title: "Cek Status Pendaftaran | RS Sehat Sejahtera" };

export default function StatusPage() {
  return (
    <Suspense>
      <StatusClient />
    </Suspense>
  );
}
