export default function IgntDotsIcon({ className }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? ""}
    >
      <circle cx="15" cy="20" r="1.5" fill="black" />
      <circle cx="20" cy="20" r="1.5" fill="black" />
      <circle cx="25" cy="20" r="1.5" fill="black" />
    </svg>
  );
}
