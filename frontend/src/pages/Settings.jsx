import { Shield, Users, Bell, Palette, Database, Globe } from 'lucide-react';
import PageShell from '../components/PageShell';

const settingSections = [
  {
    icon: Users,
    title: 'User Management',
    description: 'Add, edit, and remove users. Manage team access and invitations.',
    items: ['3 Admins', '8 Dispatchers', '4 Mechanics'],
  },
  {
    icon: Shield,
    title: 'Roles & Permissions',
    description: 'Configure role-based access control (RBAC) for modules and actions.',
    items: ['Admin', 'Dispatcher', 'Mechanic', 'Viewer'],
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Configure alert preferences, email notifications, and push settings.',
    items: ['Email alerts: On', 'Push notifications: On', 'SMS alerts: Off'],
  },
  {
    icon: Globe,
    title: 'Organization',
    description: 'Company name, timezone, locale, and branding settings.',
    items: ['TransitOps Inc.', 'UTC-05:00', 'English (US)'],
  },
  {
    icon: Database,
    title: 'Data & Integrations',
    description: 'API keys, third-party integrations, and data export settings.',
    items: ['GPS Provider: Connected', 'Fuel API: Connected', 'ERP: Not configured'],
  },
  {
    icon: Palette,
    title: 'Appearance',
    description: 'Theme, layout density, and display preferences.',
    items: ['Theme: Dark', 'Density: Comfortable', 'Sidebar: Expanded'],
  },
];

export default function Settings() {
  return (
    <PageShell
      title="Settings & RBAC"
      description="System configuration, user management, and access control"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingSections.map((section) => (
          <div
            key={section.title}
            className="bg-surface-800 border border-surface-700 rounded-2xl p-5 hover:border-surface-600 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-surface-700 border border-surface-600 flex items-center justify-center shrink-0">
                <section.icon className="w-5 h-5 text-surface-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-white mb-1">{section.title}</h3>
                <p className="text-surface-400 text-sm mb-3">{section.description}</p>
                <div className="flex flex-wrap gap-2">
                  {section.items.map((item) => (
                    <span
                      key={item}
                      className="inline-block px-2.5 py-1 bg-surface-700/50 border border-surface-600 rounded-lg text-xs text-surface-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
