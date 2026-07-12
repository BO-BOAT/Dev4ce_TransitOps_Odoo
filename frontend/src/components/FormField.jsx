export default function FormField({ label, id, type = 'text', placeholder, value, onChange, options, required }) {
  const baseClasses =
    'w-full px-4 py-2.5 bg-surface-700/50 border border-surface-600 rounded-xl text-sm text-surface-200 placeholder-surface-500 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/50 transition-all';

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-surface-300">
          {label}
          {required && <span className="text-danger-400 ml-1">*</span>}
        </label>
      )}
      {type === 'select' ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={baseClasses}
          required={required}
        >
          <option value="">{placeholder || 'Select...'}</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={3}
          className={baseClasses}
          required={required}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={baseClasses}
          required={required}
        />
      )}
    </div>
  );
}
