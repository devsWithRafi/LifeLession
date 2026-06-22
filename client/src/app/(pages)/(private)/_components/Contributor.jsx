import { cn } from '@/lib/utils';
import Image from 'next/image';

const initials = (name) => {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

export default function Contributors({ data }) {
  const max = Math.max(...data.map((d) => d.lessons), 1);

  return (
    <div className="bg-card border rounded-xl p-5">
      <div className="mb-1">
        <h3 className="text-sm font-semibold text-primary">
          Most active contributors
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Ranked by published public lessons
        </p>
      </div>
      <ul className="mt-2">
        {data.map((c, i) => (
          <li
            key={c.id}
            className="flex items-center gap-4 py-3 border-b last:border-0"
          >
            <span className="w-4 text-sm font-medium text-muted-foreground tabular-nums">
              {i + 1}
            </span>
            <div
              className={cn(
                'h-9 w-9 relative shrink-0 overflow-hidden rounded-full bg-muted flex items-center justify-center text-xs font-semibold',
              )}
            >
              {c.image ? (
                <Image
                  src={c.image}
                  alt=""
                  fill
                  className="w-full h-full object-cover"
                />
              ) : (
                initials(c.name)
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-primary truncate">
                  {c.name}
                </p>
                <p className="text-sm font-semibold text-primary tabular-nums">
                  {c.lessons}
                  <span className="font-normal text-muted-foreground">
                    {' '}
                    lessons
                  </span>
                </p>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-muted-foreground"
                  style={{ width: `${(c.lessons / max) * 100}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
