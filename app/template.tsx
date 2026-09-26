/**
 * Soft fade-and-rise on every route change. It is plain CSS, so the page is never
 * hidden while scripts load; the wrapper is re-created on each navigation, which replays it.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-enter">{children}</div>;
}
