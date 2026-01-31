import type { SVGProps } from "react";
import {
  Factory,
  CircleDot,
  Flame,
  Scissors,
  Wrench,
  Cog,
  ClipboardCheck,
  FileText,
  Hammer,
  ShieldCheck,
  PackageCheck,
  Award,
  Cpu,
  Headset,
} from "lucide-react";

/**
 * Map of icon names used in siteData.ts to their components.
 * Only icons listed here are included in the bundle.
 *
 * To add a new icon:
 * 1. Import it from lucide-react above
 * 2. Add it to this map
 * 3. Use the key name in siteData.ts
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, React.ComponentType<any>> = {
  Factory,
  CircleDot,
  Flame,
  Scissors,
  Wrench,
  Cog,
  ClipboardCheck,
  FileText,
  Hammer,
  ShieldCheck,
  PackageCheck,
  Award,
  Cpu,
  Headset,
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
  size?: number | string;
}

export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = iconMap[name];

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon {...props} />;
}
