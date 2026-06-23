export function Sparkline({ data, width = 120, height = 32, stroke = "#3730A3", fill = true }: {
  data: number[]; width?: number; height?: number; stroke?: string; fill?: boolean;
}) {
  if (!data.length) return null;
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1, pad = 2;
  const step = (width - pad * 2) / (data.length - 1 || 1);
  const points = data.map((v, i) => [pad + i * step, height - pad - ((v - min) / range) * (height - pad * 2)] as const);
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");
  const area = `${line} L${points[points.length-1][0].toFixed(2)},${height} L${points[0][0].toFixed(2)},${height} Z`;
  const gid = `spark-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      {fill && (
        <><defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.14" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient></defs><path d={area} fill={`url(#${gid})`} /></>
      )}
      <path d={line} fill="none" stroke={stroke} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={points[points.length-1][0]} cy={points[points.length-1][1]} r="2" fill={stroke} />
    </svg>
  );
}
