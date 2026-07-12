import { Outlet } from 'react-router-dom';
import { Bus } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-surface-900 flex items-center justify-center p-4">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-accent-600/10 via-surface-900 to-surface-900 pointer-events-none" />
      
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent-500/20 border border-accent-500/30 mb-4">
            <Bus className="w-7 h-7 text-accent-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">TransitOps</h1>
          <p className="text-surface-400 mt-1 text-sm">Transit Operations Management</p>
        </div>

        {/* Card */}
        <div className="bg-surface-800 border border-surface-700 rounded-2xl p-8 shadow-2xl shadow-black/20">
          <Outlet />
        </div>

        <p className="text-center text-surface-500 text-xs mt-6">
          © 2026 TransitOps. All rights reserved.
        </p>
      </div>
    </div>
  );
}
