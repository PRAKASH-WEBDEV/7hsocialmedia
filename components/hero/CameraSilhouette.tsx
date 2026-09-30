/** Cinema-camera-on-tripod silhouette. Decorative. */
export default function CameraSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 240"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* body */}
      <rect x="34" y="56" width="104" height="64" rx="8" />
      {/* top handle */}
      <rect x="58" y="40" width="58" height="12" rx="5" />
      {/* matte box + lens */}
      <rect x="138" y="66" width="20" height="44" rx="4" />
      <rect x="158" y="60" width="26" height="56" rx="5" />
      {/* viewfinder + side monitor */}
      <rect x="14" y="66" width="20" height="30" rx="4" />
      <rect x="44" y="120" width="60" height="6" />
      {/* head + tripod */}
      <rect x="84" y="126" width="14" height="30" rx="3" />
      <path d="M91 156 L48 232 H56 L94 172 L130 232 H138 Z" />
      <rect x="86" y="170" width="10" height="62" />
    </svg>
  );
}
