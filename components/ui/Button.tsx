import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "outline-light";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,color,box-shadow,scale] duration-200 ease-out active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.09),0_10px_24px_-12px_rgb(20_20_22/0.7)] hover:bg-[#2c2c31] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.09),0_14px_32px_-12px_rgb(20_20_22/0.8)]",
  secondary: "bg-surface text-ink ring-1 ring-inset ring-line-2 hover:ring-ink/40",
  light: "bg-white text-ink hover:bg-white/90",
  "outline-light": "text-white ring-1 ring-inset ring-white/25 hover:bg-white/10 hover:ring-white/45",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base sm:h-13 sm:px-7",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href" | "className" | "children" | "ref">;

/** A link styled as a button. External and mailto links render a plain anchor. */
export function ButtonLink({ href, variant, size, className, children, ...rest }: ButtonLinkProps) {
  const cls = buttonClasses(variant, size, className);
  if (/^(https?:|mailto:)/.test(href)) {
    const external = href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <a href={href} className={cls} {...external} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
