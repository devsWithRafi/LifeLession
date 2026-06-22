import { TrendingDown, TrendingUp } from 'lucide-react';

const fmt = (n) => n.toLocaleString('en-US');

export default function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  trend,
  positiveIsGood = true,
}) {
  const up = trend >= 0;
  const good = positiveIsGood ? up : !up;
  const TrendIcon = up ? TrendingUp : TrendingDown;
  return (
    <div className="bg-card border rounded-xl p-5">
      <div className="flex items-start justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div
          className={`h-9 w-9 rounded-lg flex items-center justify-center ${accent.bg}`}
        >
          <Icon className={`h-5 w-5 ${accent.text}`} strokeWidth={2} />
        </div>
      </div>
      <div className="mt-4 text-3xl font-semibold tracking-tight text-primary">
        {fmt(value)}
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-xs">
        <span
          className={`inline-flex items-center gap-0.5 font-medium ${
            up ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          <TrendIcon className="h-3.5 w-3.5" />
          {up ? '+' : ''}
          {trend}%
        </span>
        <span className="text-muted-foreground">vs last month</span>
      </div>
    </div>
  );
}
