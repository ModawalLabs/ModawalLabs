import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Seconds before this block starts, for cascading a group. */
  delay?: number;
  /** Distance it rises from, in px. */
  y?: number;
  /** Adds a slight focus pull. */
  blur?: boolean;
};

/**
 * Entrance for content that is on screen at load. It runs in CSS from the first paint,
 * so it never waits for JavaScript; use Reveal for content further down the page.
 */
export default function Enter({ children, className = "", delay = 0, y = 18, blur = false }: Props) {
  const style = {
    "--enter-delay": `${delay}s`,
    "--enter-y": `${y}px`,
    "--enter-blur": blur ? "6px" : "0px",
  } as CSSProperties;

  return (
    <div className={`enter ${className}`} style={style}>
      {children}
    </div>
  );
}
