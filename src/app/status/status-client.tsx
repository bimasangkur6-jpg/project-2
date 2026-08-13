"use client";

import { useSearchParams } from "next/navigation";
import { StatusChecker } from "@/components/registration/StatusChecker";

export function StatusClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? undefined;
  return <StatusChecker initialId={id} />;
}
