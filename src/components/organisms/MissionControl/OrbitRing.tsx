interface OrbitRingProps {
  radius: number;
  color: string;
  label?: string;
}

export function OrbitRing({ radius, color, label }: OrbitRingProps) {
  return (
    <g>
      {/* Main orbit circle */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="0.3"
        strokeDasharray="2 1"
      />

      {/* Label on the ring */}
      {label && (
        <text
          x={50 + radius - 2}
          y="50"
          fill={color}
          fontSize="2"
          fontFamily="monospace"
          textAnchor="end"
          dominantBaseline="middle"
          opacity="0.6"
        >
          {label}
        </text>
      )}
    </g>
  );
}
