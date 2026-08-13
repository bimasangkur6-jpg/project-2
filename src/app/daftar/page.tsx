import type { Metadata } from "next";
import { Suspense } from "react";
import { DaftarClient } from "./daftar-client";

export const metadata: Metadata = { title: "Daftar Pasien Baru | RS Sehat Sejahtera" };

export default function DaftarPage() {
  return (
    <Suspense>
      <DaftarClient />
    </Suspense>
  );
}
