type IconProps = { className?: string };

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function StackOverflowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 20.56v-6.19h2.07v8.25H4.47v-8.25h2.06v6.19h10.94ZM8.6 17.47h6.8v-2.06H8.6v2.06Zm.32-4.13 6.66 1.41.44-2.02-6.66-1.4-.44 2.01Zm1.18-3.62 6.09 2.84.87-1.87-6.09-2.85-.87 1.88Zm1.96-2.97 5.19 4.38 1.34-1.6-5.19-4.37-1.34 1.59Zm3.03-1.88 4.22 5.63 1.66-1.25-4.22-5.63-1.66 1.25Z" />
    </svg>
  );
}
