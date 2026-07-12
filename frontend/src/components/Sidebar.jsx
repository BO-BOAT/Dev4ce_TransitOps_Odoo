import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Bus,
  Users,
  MapPin,
  Wrench,
  Fuel,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/vehicles', icon: Bus, label: 'Vehicles' },
  { to: '/drivers', icon: Users, label: 'Drivers' },
  { to: '/trips', icon: MapPin, label: 'Trip Dispatch' },
  { to: '/maintenance', icon: Wrench, label: 'Maintenance' },
  { to: '/fuel', icon: Fuel, label: 'Fuel & Expenses' },
  { to: '/reports', icon: BarChart3, label: 'Reports' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-surface-800 border-r border-surface-700 flex flex-col transition-all duration-300 z-30
        ${collapsed ? 'w-20' : 'w-64'}`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-surface-700 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-accent-500/20 border border-accent-500/30 flex items-center justify-center shrink-0">
            <Bus className="w-5 h-5 text-accent-400" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-white whitespace-nowrap">
              TransitOps
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? 'bg-accent-500/15 text-accent-400 border border-accent-500/20'
                  : 'text-surface-400 hover:text-surface-200 hover:bg-surface-700/50 border border-transparent'
              }
              ${collapsed ? 'justify-center' : ''}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-surface-700 shrink-0">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-surface-400 hover:text-surface-200 hover:bg-surface-700/50 text-sm transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
