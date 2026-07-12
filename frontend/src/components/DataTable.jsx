import StatusBadge from './StatusBadge';

export default function DataTable({ columns, data, onRowClick }) {
  return (
    <div className="bg-surface-800 border border-surface-700 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-700">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-5 py-3.5 text-xs font-semibold text-surface-400 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-700/50">
            {data.map((row, i) => (
              <tr
                key={row.id || i}
                className="hover:bg-surface-700/30 transition-colors cursor-pointer"
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-3.5 text-surface-300">
                    {col.key === 'status' ? (
                      <StatusBadge status={row[col.key]} />
                    ) : col.render ? (
                      col.render(row[col.key], row)
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length === 0 && (
        <div className="text-center py-12 text-surface-500">
          No records found.
        </div>
      )}
    </div>
  );
}
