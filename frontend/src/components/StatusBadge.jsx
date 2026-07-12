const statusColorMap = {
  active: 'bg-success-500/15 text-success-400 border-success-500/25',
  online: 'bg-success-500/15 text-success-400 border-success-500/25',
  completed: 'bg-success-500/15 text-success-400 border-success-500/25',
  approved: 'bg-success-500/15 text-success-400 border-success-500/25',
  warning: 'bg-warning-500/15 text-warning-400 border-warning-500/25',
  pending: 'bg-warning-500/15 text-warning-400 border-warning-500/25',
  'in-progress': 'bg-info-500/15 text-info-400 border-info-500/25',
  scheduled: 'bg-info-500/15 text-info-400 border-info-500/25',
  'en-route': 'bg-info-500/15 text-info-400 border-info-500/25',
  inactive: 'bg-surface-500/15 text-surface-400 border-surface-500/25',
  offline: 'bg-surface-500/15 text-surface-400 border-surface-500/25',
  critical: 'bg-danger-500/15 text-danger-400 border-danger-500/25',
  overdue: 'bg-danger-500/15 text-danger-400 border-danger-500/25',
  cancelled: 'bg-danger-500/15 text-danger-400 border-danger-500/25',
};

export default function StatusBadge({ status }) {
  const key = status.toLowerCase();
  const classes = statusColorMap[key] || statusColorMap.inactive;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium border ${classes}`}>
      {status}
    </span>
  );
}
