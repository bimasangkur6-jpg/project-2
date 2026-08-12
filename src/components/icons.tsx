import type { ReactNode } from "react";

export type IconName =
  | "calendar"
  | "clock"
  | "shield"
  | "heart"
  | "phone"
  | "mapPin"
  | "star"
  | "check"
  | "chevronRight"
  | "stethoscope"
  | "search";

const PATHS: Record<IconName, ReactNode> = {
  calendar: (
    <path d="M8 2v3M16 2v3M3.5 8h17M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
  ),
  clock: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v5l3.5 2" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-9 2 2 4-4" />,
  heart: <path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 2.5 4.5 6.5 4.5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 4 0 6 4 4 8-2.5 4.15-9.5 8.5-9.5 8.5Z" />,
  phone: (
    <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.6 21 3 14.4 3 6a2 2 0 0 1 1-2Z" />
  ),
  mapPin: <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
  star: <path d="m12 2 2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2Z" />,
  check: <path d="M4 12.5 9.5 18 20 6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  stethoscope: (
    <path d="M6 3v6a4 4 0 0 0 8 0V3M6 3H4.5M14 3h1.5M10 13v3a5 5 0 0 0 10 0v-1M20 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
  ),
  search: <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35" />,
};

export function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}
