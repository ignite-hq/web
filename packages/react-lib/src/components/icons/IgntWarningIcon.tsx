export default function IgntWarningIcon({ className }: { className?: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? ""}
      style={{ width: "1em", height: "1em" }}
    >
      <path
        d="M24 36.5C24.5523 36.5 25 36.0523 25 35.5C25 34.9477 24.5523 34.5 24 34.5C23.4477 34.5 23 34.9477 23 35.5C23 36.0523 23.4477 36.5 24 36.5Z"
        fill="currentColor"
      />
      <path
        d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 12V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M24 36.5C24.5523 36.5 25 36.0523 25 35.5C25 34.9477 24.5523 34.5 24 34.5C23.4477 34.5 23 34.9477 23 35.5C23 36.0523 23.4477 36.5 24 36.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
