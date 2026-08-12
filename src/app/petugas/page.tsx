import type { Metadata } from "next";
import { StaffDashboard } from "@/components/staff/StaffDashboard";

export const metadata: Metadata = { title: "Portal Petugas | RS Sehat Sejahtera" };

export default function PetugasPage() {
  return <StaffDashboard />;
}
