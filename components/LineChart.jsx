export default function LineChart({
  data,
  stroke = "black",
  background = "white",
  width = 300,
  height = 150,
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);

  const stepX = width / (data.length - 1);
  const scaleY = height / (max - min || 1);

  const points = data
    .map((value, index) => {
      const x = index * stepX;
      const y = height - (value - min) * scaleY;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} style={{ background }}>
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      />

      {/* pierwsza wartość – lewy dół */}
      <text x="4" y={height - 4} fontSize="12">
        {data[0]}
      </text>

      {/* ostatnia wartość – prawy górny róg */}
      <text x={width - 24} y="14" fontSize="12">
        {data[data.length - 1]}
      </text>
    </svg>
  );
}