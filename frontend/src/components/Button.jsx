const variants = {
  primary:
    'bg-accent-500 hover:bg-accent-600 text-white border-transparent shadow-lg shadow-accent-500/20',
  secondary:
    'bg-surface-700 hover:bg-surface-600 text-surface-200 border-surface-600',
  danger:
    'bg-danger-500/15 hover:bg-danger-500/25 text-danger-400 border-danger-500/25',
  ghost:
    'bg-transparent hover:bg-surface-700/50 text-surface-400 hover:text-surface-200 border-transparent',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-xl border transition-all duration-200
        ${variants[variant]} ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}`}
    >
      {children}
    </button>
  );
}
