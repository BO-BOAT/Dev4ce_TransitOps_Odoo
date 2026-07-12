import Button from './Button';

export default function PageShell({ title, description, actionLabel, onAction, children }) {
  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {description && (
            <p className="text-surface-400 mt-1 text-sm">{description}</p>
          )}
        </div>
        {actionLabel && (
          <Button onClick={onAction}>{actionLabel}</Button>
        )}
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
