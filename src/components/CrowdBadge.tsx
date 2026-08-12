import type { CrowdLevel } from "@/lib/mock-data";

const LEVEL_STYLE: Record<CrowdLevel, string> = {
  Sepi: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  Sedang: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  Ramai: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
};

const LEVEL_DOT: Record<CrowdLevel, string> = {
  Sepi: "bg-emerald-500",
  Sedang: "bg-amber-500",
  Ramai: "bg-red-500",
};

export function CrowdBadge({ level, waitingCount }: { level: CrowdLevel; waitingCount?: number }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${LEVEL_STYLE[level]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${LEVEL_DOT[level]}`} />
      {level}
      {typeof waitingCount === "number" && ` · ${waitingCount} menunggu`}
    </span>
  );
}
