import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="140"
      height="40"
      viewBox="0 0 140 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
    >
      <path
        d="M24 16C24 11.5817 20.4183 8 16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24C18.4484 24 20.6381 23.0454 22.2033 21.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M2 16H18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <text
        x="32"
        y="18"
        fontFamily="sans-serif"
        fontSize="20"
        fontWeight="bold"
        fill="hsl(var(--sidebar-foreground))"
      >
        KIMO
      </text>
      <text
        x="32"
        y="32"
        fontFamily="sans-serif"
        fontSize="8"
        fontWeight="normal"
        fill="hsl(var(--sidebar-foreground))"
        letterSpacing="0.5"
      >
        COMMUNICATION
      </text>
    </svg>
  );
}
