import imagotipoHorizontal from "../../assets/logos/imagotipo-horizontal.svg";
import imagotipoHorizontalDark from "../../assets/logos/imagotipo-horizontal-dark.svg";
import imagotipoVertical from "../../assets/logos/imagotipo-vertical.svg";
import imagotipoVerticalDark from "../../assets/logos/imagotipo-vertical-dark.svg";
import isotipo from "../../assets/logos/isotipo.svg";
import isotipoDark from "../../assets/logos/isotipo-dark.svg";

type LogoContext = "header-desktop" | "header-mobile" | "footer";

interface LogoProps {
  context: LogoContext;
  isDark: boolean;
  className?: string;
}

const logoMap: Record<LogoContext, { light: string; dark: string }> = {
  "header-desktop": {
    light: imagotipoVertical,
    dark: imagotipoVerticalDark,
  },
  "header-mobile": {
    light: isotipo,
    dark: isotipoDark,
  },
  footer: {
    light: imagotipoHorizontal,
    dark: imagotipoHorizontalDark,
  },
};

export function Logo({ context, isDark, className = "" }: LogoProps) {
  const { light, dark } = logoMap[context];
  const src = isDark ? dark : light;

  return (
    <img
      src={src}
      alt="Gonzalez Industrial"
      className={className}
    />
  );
}
