import { createFileRoute, Outlet, Link, useRouter, Navigate } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import {
  LayoutDashboard, Truck, Users, Route as RouteIcon, Wrench, Receipt,
  BarChart3, LogOut, Moon, Sun, Menu, X,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/vehicles", label: "Vehicles", icon: Truck },
  { to: "/drivers", label: "Drivers", icon: Users },
  { to: "/trips", label: "Trips", icon: RouteIcon },
  { to: "/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/expenses", label: "Fuel & Expenses", icon: Receipt },
  { to: "/reports", label: "Reports", icon: BarChart3 },
] as const;

function AppLayout() {
  const user = useStore((s) => s.currentUser);
  const logout = useStore((s) => s.logout);
  const theme = useStore((s) => s.theme);
  const toggleTheme = useStore((s) => s.toggleTheme);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (!user) return <Navigate to="/login" />;

  const currentPath = router.state.location.pathname;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform lg:flex lg:translate-x-0 ${open ? "translate-x-0 flex" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <div className="grid size-8 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Truck className="size-4" />
          </div>
          <span className="font-display text-lg font-bold">Fleetwave</span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((n) => {
            const active = currentPath.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <n.icon className="size-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <div className="rounded-lg bg-sidebar-accent p-3">
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{user.name}</p>
                <p className="truncate text-xs text-sidebar-foreground/60 capitalize">{user.role}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); router.navigate({ to: "/" }); }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-sidebar-border py-1.5 text-xs font-medium text-sidebar-foreground/80 transition hover:bg-sidebar hover:text-sidebar-foreground"
            >
              <LogOut className="size-3.5" /> Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-lg md:px-6">
          <button onClick={() => setOpen(!open)} className="rounded-md p-2 hover:bg-muted lg:hidden">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <h2 className="hidden font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground lg:block">
            {nav.find((n) => currentPath.startsWith(n.to))?.label ?? "Overview"}
          </h2>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="rounded-md p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
        </header>
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
