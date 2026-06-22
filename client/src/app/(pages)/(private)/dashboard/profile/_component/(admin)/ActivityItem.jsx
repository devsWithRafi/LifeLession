const ActivityItem = ({ action, time, type }) => {
  const colors = {
    approve: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    publish: 'bg-blue-500/10 text-blue-500',
    remove: 'bg-red-500/10 text-red-500',
    edit: 'bg-amber-500/10 text-amber-500',
  };
  const labels = {
    approve: 'Approved',
    publish: 'Published',
    remove: 'Removed',
    edit: 'Edited',
  };
  return (
    <div className="flex items-start gap-3 py-3">
      <span
        className={`mt-0.5 px-2 py-0.5 rounded-md text-xs font-medium shrink-0 ${colors[type]}`}
      >
        {labels[type]}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground truncate">{action}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{time}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
