import { Search, Bell, User } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="h-16 bg-surface-800/80 backdrop-blur-sm border-b border-surface-700 flex items-center justify-between px-6 shrink-0 sticky top-0 z-20">
      {/* Search */}
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
        <input
          type="text"
          placeholder="Search vehicles, drivers, trips..."
          className="w-full pl-10 pr-4 py-2 bg-surface-700/50 border border-surface-600 rounded-xl text-sm text-surface-200 placeholder-surface-500 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/50 transition-all"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-surface-400 hover:text-surface-200 hover:bg-surface-700/50 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full" />
        </button>

        {/* User avatar */}
        <button className="flex items-center gap-3 pl-3 pr-1 py-1 rounded-xl hover:bg-surface-700/50 transition-colors">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-surface-200">Admin User</p>
            <p className="text-xs text-surface-500">admin@transitops.io</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-accent-500/20 border border-accent-500/30 flex items-center justify-center">
            <User className="w-4 h-4 text-accent-400" />
          </div>
        </button>
      </div>
    </header>
  );
}
