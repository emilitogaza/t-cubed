import OIcon from "../assets/icons/OIcon";
import XIcon from "../assets/icons/XIcon";

type IconName = "XIcon" | "OIcon";

type IconProps = {
  name: IconName;
  strokeWidth?: number;
  color?: string;
  className?: string;
};

export function Icon({
  name,
  strokeWidth = 1,
  color = "currentColor",
  className,
}: IconProps) {
  const icons: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
    XIcon,
    OIcon,
  };

  const SvgIcon: React.FC<React.SVGProps<SVGSVGElement>> | undefined =
    icons[name as keyof typeof icons];

  if (!SvgIcon) {
    console.warn(`Icon with name "${name}" does not exist.`);
    return null;
  }

  return (
    <SvgIcon
      style={{ fill: "none", color }}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
}
