import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function ChartTooltip({ active, payload, label, suffix }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-lg border bg-card px-3 py-2 shadow-sm">
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-primary">
        {fmt(payload[0].value)}
        <span className="font-normal text-muted-foreground"> {suffix}</span>
      </p>
    </div>
  );
}

const fmt = (n) => n.toLocaleString('en-US');
const compact = (n) =>
  n >= 1000 ? (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'k' : '' + n;

export default function GrowthChart({
  title,
  subtitle,
  data,
  dataKey,
  color,
  gradId,
  suffix,
  total,
}) {
  return (
    <div className="bg-card border rounded-xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-primary">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold tracking-tight text-primary">
            {fmt(total)}
          </div>
          <div className="text-xs text-muted-foreground">total</div>
        </div>
      </div>
      <div className="h-60 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.22} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f4f4f5" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#a1a1aa' }}
              dy={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={36}
              tick={{ fontSize: 12, fill: '#a1a1aa' }}
              tickFormatter={compact}
            />
            <Tooltip
              cursor={{ stroke: '#e4e4e7', strokeWidth: 1 }}
              content={<ChartTooltip suffix={suffix} />}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fill={`url(#${gradId})`}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
