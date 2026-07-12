import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { Truck, Users, Route as RouteIcon, Wrench, TrendingUp, Fuel, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { vehicles, drivers, trips, maintenance, expenses } = useStore();
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [region, setRegion] = useState("all");

  const filtered = vehicles.filter(
    (v) =>
      (type === "all" || v.type === type) &&
      (status === "all" || v.status === status) &&
      (region === "all" || v.region === region),
  );

  const active = filtered.filter((v) => v.status === "On Trip").length;
  const available = filtered.filter((v) => v.status === "Available").length;
  const inShop = filtered.filter((v) => v.status === "In Shop").length;
  const activeTrips = trips.filter((t) => t.status === "Dispatched").length;
  const pendingTrips = trips.filter((t) => t.status === "Draft").length;
  const onDuty = drivers.filter((d) => d.status === "On Trip" || d.status === "Available").length;
  const utilization = filtered.length ? Math.round((active / filtered.length) * 100) : 0;

  const expiringSoon = drivers.filter((d) => {
    const days = (new Date(d.licenseExpiry).getTime() - Date.now()) / 86400000;
    return days < 180;
  });

  const statusData = useMemo(
    () => [
      { name: "Available", value: filtered.filter((v) => v.status === "Available").length, color: "var(--success)" },
      { name: "On Trip", value: active, color: "var(--primary)" },
      { name: "In Shop", value: inShop, color: "var(--warning)" },
      { name: "Retired", value: filtered.filter((v) => v.status === "Retired").length, color: "var(--muted-foreground)" },
    ],
    [filtered, active, inShop],
  );

  const spendByVehicle = useMemo(() => {
    const map: Record<string, number> = {};
    for (const v of vehicles) map[v.regNumber] = 0;
    for (const e of expenses) {
      const veh = vehicles.find((v) => v.id === e.vehicleId);
      if (veh) map[veh.regNumber] += e.amount;
    }
    for (const m of maintenance) {
      const veh = vehicles.find((v) => v.id === m.vehicleId);
      if (veh) map[veh.regNumber] = (map[veh.regNumber] ?? 0) + m.cost;
    }
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [vehicles, expenses, maintenance]);

  const kpis = [
    { label: "Active Vehicles", value: active, icon: Truck, tone: "primary" },
    { label: "Available Vehicles", value: available, icon: Truck, tone: "success" },
    { label: "In Maintenance", value: inShop, icon: Wrench, tone: "warning" },
    { label: "Active Trips", value: activeTrips, icon: RouteIcon, tone: "info" },
    { label: "Pending Trips", value: pendingTrips, icon: RouteIcon, tone: "muted" },
    { label: "Drivers On Duty", value: onDuty, icon: Users, tone: "primary" },
    { label: "Fleet Utilization", value: `${utilization}%`, icon: TrendingUp, tone: "accent" },
    { label: "License Alerts", value: expiringSoon.length, icon: AlertTriangle, tone: "warning" },
  ];

  const toneMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning",
    info: "bg-info/10 text-info",
    muted: "bg-muted text-muted-foreground",
    accent: "bg-accent/15 text-accent",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="font-display text-3xl font-bold">Operations Dashboard</h1>
          <p className="text-sm text-muted-foreground">Live snapshot across your fleet, drivers and trips.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterSelect value={type} onChange={setType} label="Type" options={["all", "Truck", "Van", "Tanker", "Trailer", "Pickup"]} />
          <FilterSelect value={status} onChange={setStatus} label="Status" options={["all", "Available", "On Trip", "In Shop", "Retired"]} />
          <FilterSelect value={region} onChange={setRegion} label="Region" options={["all", "North", "South", "East", "West"]} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition hover:shadow-elevated">
            <div className={`absolute -right-6 -top-6 size-24 rounded-full ${toneMap[k.tone]} opacity-20 blur-xl transition group-hover:opacity-40`} />
            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{k.label}</p>
                <div className={`grid size-9 place-items-center rounded-lg ${toneMap[k.tone]}`}>
                  <k.icon className="size-4" />
                </div>
              </div>
              <p className="mt-3 font-display text-3xl font-bold tracking-tight">{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
          <h3 className="font-display text-lg font-semibold">Operational spend by vehicle</h3>
          <p className="text-xs text-muted-foreground">Fuel + maintenance + other expenses (₹)</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendByVehicle}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="value" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold">Fleet status</h3>
          <p className="text-xs text-muted-foreground">Distribution across states</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {statusData.map((s) => <Cell key={s.name} fill={s.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {expiringSoon.length > 0 && (
        <div className="rounded-xl border border-warning/40 bg-warning/5 p-5">
          <div className="flex items-center gap-2 text-warning">
            <Fuel className="size-4" />
            <h3 className="font-display font-semibold">Licenses expiring within 6 months</h3>
          </div>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {expiringSoon.map((d) => (
              <div key={d.id} className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm">
                <span>{d.name}</span>
                <span className="font-mono text-xs text-muted-foreground">exp {d.licenseExpiry}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FilterSelect({ value, onChange, label, options }: { value: string; onChange: (v: string) => void; label: string; options: string[] }) {
  return (
    <label className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-transparent text-sm outline-none">
        {options.map((o) => <option key={o} value={o} className="bg-background">{o === "all" ? "All" : o}</option>)}
      </select>
    </label>
  );
}
