import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useStore, exportCSV } from "@/lib/store";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { Download } from "lucide-react";
import { PageHeader } from "./_app.vehicles";

export const Route = createFileRoute("/_app/reports")({
  component: ReportsPage,
});

function ReportsPage() {
  const { vehicles, trips, expenses, maintenance } = useStore();

  const perVehicle = useMemo(() => {
    return vehicles.map((v) => {
      const fuelExp = expenses.filter((e) => e.vehicleId === v.id && e.kind === "Fuel");
      const totalFuelCost = fuelExp.reduce((s, e) => s + e.amount, 0);
      const totalLiters = fuelExp.reduce((s, e) => s + (e.liters ?? 0), 0);
      const maintCost = maintenance.filter((m) => m.vehicleId === v.id).reduce((s, m) => s + m.cost, 0);
      const completed = trips.filter((t) => t.vehicleId === v.id && t.status === "Completed");
      const distance = completed.reduce((s, t) => s + (t.actualKm ?? 0), 0);
      const revenue = completed.reduce((s, t) => s + (t.revenue ?? 0), 0);
      const fuelEff = totalLiters > 0 ? distance / totalLiters : 0;
      const roi = v.acquisitionCost > 0 ? (revenue - (maintCost + totalFuelCost)) / v.acquisitionCost : 0;
      return {
        veh: v.regNumber, distance, revenue, fuelCost: totalFuelCost, maintCost,
        totalCost: totalFuelCost + maintCost, fuelEff: +fuelEff.toFixed(2), roi: +(roi * 100).toFixed(1),
      };
    });
  }, [vehicles, trips, expenses, maintenance]);

  const active = vehicles.filter((v) => v.status === "On Trip").length;
  const dispatchable = vehicles.filter((v) => v.status !== "Retired").length;
  const utilization = dispatchable ? Math.round((active / dispatchable) * 100) : 0;

  return (
    <div className="space-y-6">
      <PageHeader title="Reports & Analytics" subtitle="Fuel efficiency, utilization, operational cost and ROI per vehicle.">
        <button onClick={() => exportCSV("report_per_vehicle.csv", perVehicle)} className="btn-ghost"><Download className="size-4" /> Export CSV</button>
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Fleet Utilization</h3>
          <div className="mt-4 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ name: "util", value: utilization, fill: "var(--primary)" }]} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={20} />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground font-display" fontSize={32} fontWeight={700}>{utilization}%</text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Fuel efficiency (km/L)</h3>
          <div className="mt-4 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={perVehicle.filter((r) => r.fuelEff > 0)}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="veh" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="fuelEff" fill="var(--accent)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Operational cost vs revenue</h3>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={perVehicle}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="veh" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
              <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Line type="monotone" dataKey="totalCost" stroke="var(--warning)" strokeWidth={2} name="Total Cost" />
              <Line type="monotone" dataKey="revenue" stroke="var(--success)" strokeWidth={2} name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h3 className="font-display font-semibold">Per-vehicle scorecard</h3>
          <p className="text-xs text-muted-foreground">ROI = (Revenue − (Maintenance + Fuel)) ÷ Acquisition Cost</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Vehicle</th>
                <th className="px-4 py-3 text-left font-medium">Distance</th>
                <th className="px-4 py-3 text-left font-medium">Fuel Efficiency</th>
                <th className="px-4 py-3 text-left font-medium">Fuel Cost</th>
                <th className="px-4 py-3 text-left font-medium">Maint. Cost</th>
                <th className="px-4 py-3 text-left font-medium">Revenue</th>
                <th className="px-4 py-3 text-left font-medium">ROI</th>
              </tr>
            </thead>
            <tbody>
              {perVehicle.map((r) => (
                <tr key={r.veh} className="border-t border-border">
                  <td className="px-4 py-3 font-mono text-xs">{r.veh}</td>
                  <td className="px-4 py-3">{r.distance.toLocaleString()} km</td>
                  <td className="px-4 py-3">{r.fuelEff > 0 ? `${r.fuelEff} km/L` : "—"}</td>
                  <td className="px-4 py-3">₹{r.fuelCost.toLocaleString()}</td>
                  <td className="px-4 py-3">₹{r.maintCost.toLocaleString()}</td>
                  <td className="px-4 py-3">₹{r.revenue.toLocaleString()}</td>
                  <td className={`px-4 py-3 font-semibold ${r.roi > 0 ? "text-success" : r.roi < 0 ? "text-destructive" : "text-muted-foreground"}`}>{r.roi}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
