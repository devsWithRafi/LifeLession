const AdminTooltip = ({ children, label }) => (
  <div className="relative group">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
      <div className="bg-popover text-popover-foreground text-xs rounded-lg px-2 py-1 whitespace-nowrap shadow-md border border-border">
        {label}
      </div>
    </div>
  </div>
);

export default AdminTooltip;
