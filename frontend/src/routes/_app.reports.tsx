import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useStore, exportCSV } from "@/lib/store";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Legend,
} from "recharts";
import {
  Download,
  FileText,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Fuel,
  Wrench,
  MapPin,
} from "lucide-react";
import { PageHeader } from "./_app.vehicles";

export const Route = createFileRoute("/_app/reports")({
  component: ReportsPage,
});

const PIE_COLORS = [
  "var(--primary)",
  "var(--warning)",
  "var(--muted-foreground)",
];

function ReportsPage() {
  const { vehicles, trips, expenses, maintenance } = useStore();

  const perVehicle = useMemo(() => {
    return vehicles.map((v) => {
      const fuelExp = expenses.filter(
        (e) => e.vehicleId === v.id && e.kind === "Fuel",
      );
      const totalFuelCost = fuelExp.reduce((s, e) => s + e.amount, 0);
      const totalLiters = fuelExp.reduce((s, e) => s + (e.liters ?? 0), 0);
      const maintCost = maintenance
        .filter((m) => m.vehicleId === v.id)
        .reduce((s, m) => s + m.cost, 0);
      const otherCost = expenses
        .filter((e) => e.vehicleId === v.id && e.kind !== "Fuel")
        .reduce((s, e) => s + e.amount, 0);
      const completed = trips.filter(
        (t) => t.vehicleId === v.id && t.status === "Completed",
      );
      const distance = completed.reduce((s, t) => s + (t.actualKm ?? 0), 0);
      const revenue = completed.reduce((s, t) => s + (t.revenue ?? 0), 0);
      const fuelEff = totalLiters > 0 ? distance / totalLiters : 0;
      const totalCost = totalFuelCost + maintCost + otherCost;
      const roi =
        v.acquisitionCost > 0 ? (revenue - totalCost) / v.acquisitionCost : 0;
      return {
        veh: v.regNumber,
        distance,
        revenue,
        fuelCost: totalFuelCost,
        maintCost,
        otherCost,
        totalCost,
        fuelEff: +fuelEff.toFixed(2),
        roi: +(roi * 100).toFixed(1),
      };
    });
  }, [vehicles, trips, expenses, maintenance]);

  const summary = useMemo(() => {
    const totalRevenue = perVehicle.reduce((s, r) => s + r.revenue, 0);
    const totalCost = perVehicle.reduce((s, r) => s + r.totalCost, 0);
    const totalDistance = perVehicle.reduce((s, r) => s + r.distance, 0);
    const netProfit = totalRevenue - totalCost;
    const overallROI =
      totalCost > 0 ? ((totalRevenue - totalCost) / totalCost) * 100 : 0;
    const totalFuelLiters = expenses
      .filter((e) => e.kind === "Fuel")
      .reduce((s, e) => s + (e.liters ?? 0), 0);
    const avgFuelEff =
      totalFuelLiters > 0 ? totalDistance / totalFuelLiters : 0;
    return {
      totalRevenue,
      totalCost,
      totalDistance,
      netProfit,
      overallROI: +overallROI.toFixed(1),
      avgFuelEff: +avgFuelEff.toFixed(2),
    };
  }, [perVehicle, expenses]);

  const costDistribution = useMemo(() => {
    const totalFuel = expenses
      .filter((e) => e.kind === "Fuel")
      .reduce((s, e) => s + e.amount, 0);
    const totalMaint = maintenance.reduce((s, m) => s + m.cost, 0);
    const totalOther = expenses
      .filter((e) => e.kind !== "Fuel")
      .reduce((s, e) => s + e.amount, 0);
    return [
      { name: "Fuel", value: totalFuel },
      { name: "Maintenance", value: totalMaint },
      { name: "Other", value: totalOther },
    ].filter((d) => d.value > 0);
  }, [expenses, maintenance]);

  const active = vehicles.filter((v) => v.status === "On Trip").length;
  const dispatchable = vehicles.filter((v) => v.status !== "Retired").length;
  const utilization = dispatchable
    ? Math.round((active / dispatchable) * 100)
    : 0;

  const handlePrintPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    const scorecardRows = perVehicle
      .map(
        (r) => `<tr>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;font-family:monospace;font-size:12px">${r.veh}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb">${r.distance.toLocaleString()} km</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb">${r.fuelEff > 0 ? r.fuelEff + " km/L" : "—"}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb">₹${r.fuelCost.toLocaleString()}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb">₹${r.maintCost.toLocaleString()}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb">₹${r.revenue.toLocaleString()}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;font-weight:600;color:${r.roi > 0 ? "#16a34a" : "#dc2626"}">${r.roi}%</td>
        </tr>`,
      )
      .join("");
    printWindow.document.write(`
      <html><head><title>Fleet Reports — TransitOps</title></head>
      <body style="font-family:Inter,sans-serif;padding:40px;color:#1e293b">
        <h1 style="font-size:24px;margin-bottom:4px">Reports &amp; Analytics</h1>
        <p style="color:#64748b;font-size:13px;margin-bottom:24px">Generated ${new Date().toLocaleDateString()}</p>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px">
          <div style="border:1px solid #e5e7eb;border-radius:8px;padding:16px">
            <div style="font-size:12px;color:#64748b">Total Revenue</div>
            <div style="font-size:20px;font-weight:700">₹${summary.totalRevenue.toLocaleString()}</div>
          </div>
          <div style="border:1px solid #e5e7eb;border-radius:8px;padding:16px">
            <div style="font-size:12px;color:#64748b">Total Cost</div>
            <div style="font-size:20px;font-weight:700">₹${summary.totalCost.toLocaleString()}</div>
          </div>
          <div style="border:1px solid #e5e7eb;border-radius:8px;padding:16px">
            <div style="font-size:12px;color:#64748b">Net Profit</div>
            <div style="font-size:20px;font-weight:700;color:${summary.netProfit >= 0 ? "#16a34a" : "#dc2626"}">₹${summary.netProfit.toLocaleString()}</div>
          </div>
          <div style="border:1px solid #e5e7eb;border-radius:8px;padding:16px">
            <div style="font-size:12px;color:#64748b">Overall ROI</div>
            <div style="font-size:20px;font-weight:700;color:${summary.overallROI >= 0 ? "#16a34a" : "#dc2626"}">${summary.overallROI}%</div>
          </div>
        </div>
        <h2 style="font-size:16px;margin-bottom:12px">Per-Vehicle Scorecard</h2>
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead><tr style="background:#f1f5f9;text-align:left">
            <th style="padding:8px;border-bottom:2px solid #e5e7eb">Vehicle</th>
            <th style="padding:8px;border-bottom:2px solid #e5e7eb">Distance</th>
            <th style="padding:8px;border-bottom:2px solid #e5e7eb">Fuel Eff.</th>
            <th style="padding:8px;border-bottom:2px solid #e5e7eb">Fuel Cost</th>
            <th style="padding:8px;border-bottom:2px solid #e5e7eb">Maint. Cost</th>
            <th style="padding:8px;border-bottom:2px solid #e5e7eb">Revenue</th>
            <th style="padding:8px;border-bottom:2px solid #e5e7eb">ROI</th>
          </tr></thead>
          <tbody>${scorecardRows}</tbody>
        </table>
        <p style="margin-top:24px;font-size:11px;color:#94a3b8">TransitOps Fleet Management — Confidential</p>
      </body></html>`);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Fuel efficiency, utilization, operational cost, and ROI per vehicle."
      >
        <button onClick={handlePrintPDF} className="btn-ghost">
          <FileText className="size-4" /> Export PDF
        </button>
        <button
          onClick={() => exportCSV("report_per_vehicle.csv", perVehicle)}
          className="btn-ghost"
        >
          <Download className="size-4" /> Export CSV
        </button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {[
          {
            label: "Revenue",
            value: `₹${summary.totalRevenue.toLocaleString()}`,
            color: "text-success",
            icon: IndianRupee,
          },
          {
            label: "Total Cost",
            value: `₹${summary.totalCost.toLocaleString()}`,
            color: "text-foreground",
            icon: Wrench,
          },
          {
            label: "Net Profit",
            value: `₹${summary.netProfit.toLocaleString()}`,
            color: summary.netProfit >= 0 ? "text-success" : "text-destructive",
            icon: summary.netProfit >= 0 ? TrendingUp : TrendingDown,
          },
          {
            label: "Overall ROI",
            value: `${summary.overallROI}%`,
            color:
              summary.overallROI >= 0 ? "text-success" : "text-destructive",
            icon: summary.overallROI >= 0 ? TrendingUp : TrendingDown,
          },
          {
            label: "Total Distance",
            value: `${summary.totalDistance.toLocaleString()} km`,
            color: "text-primary",
            icon: MapPin,
          },
          {
            label: "Avg Fuel Eff.",
            value: `${summary.avgFuelEff} km/L`,
            color: "text-primary",
            icon: Fuel,
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <s.icon className="size-3.5" />
              {s.label}
            </div>
            <div className={`mt-1 font-display text-lg font-bold ${s.color}`}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Fleet Utilization
          </h3>
          <div className="mt-4 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={[
                  { name: "util", value: utilization, fill: "var(--primary)" },
                ]}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={20} />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground font-display"
                  fontSize={32}
                  fontWeight={700}
                >
                  {utilization}%
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            {active} of {dispatchable} vehicles on trip
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Cost Distribution
          </h3>
          <div className="mt-4 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {costDistribution.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `₹${value.toLocaleString()}`}
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    color: "#e2e8f0",
                  }}
                  labelStyle={{ color: "#e2e8f0" }}
                  wrapperStyle={{ color: "#e2e8f0" }}
                />
                <Legend
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-xs text-muted-foreground">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 lg:col-span-1">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Fuel Efficiency (km/L)
          </h3>
          <div className="mt-4 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={perVehicle.filter((r) => r.fuelEff > 0)}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="veh"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                  interval={0}
                  angle={-30}
                  textAnchor="end"
                  height={50}
                />
                <YAxis
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    color: "#e2e8f0",
                  }}
                />
                <Bar
                  dataKey="fuelEff"
                  fill="var(--accent)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Operational Cost vs Revenue
        </h3>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={perVehicle}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="veh"
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              />
              <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "#e2e8f0",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalCost"
                stroke="var(--warning)"
                strokeWidth={2}
                name="Total Cost"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--success)"
                strokeWidth={2}
                name="Revenue"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h3 className="font-display font-semibold">Per-Vehicle Scorecard</h3>
          <p className="text-xs text-muted-foreground">
            ROI = (Revenue − (Maintenance + Fuel + Other)) ÷ Acquisition Cost
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Vehicle</th>
                <th className="px-4 py-3 text-left font-medium">Distance</th>
                <th className="px-4 py-3 text-left font-medium">
                  Fuel Efficiency
                </th>
                <th className="px-4 py-3 text-left font-medium">Fuel Cost</th>
                <th className="px-4 py-3 text-left font-medium">Maint. Cost</th>
                <th className="px-4 py-3 text-left font-medium">Other Cost</th>
                <th className="px-4 py-3 text-left font-medium">Revenue</th>
                <th className="px-4 py-3 text-left font-medium">ROI</th>
              </tr>
            </thead>
            <tbody>
              {perVehicle.map((r) => (
                <tr
                  key={r.veh}
                  className="border-t border-border hover:bg-muted/30"
                >
                  <td className="px-4 py-3 font-mono text-xs">{r.veh}</td>
                  <td className="px-4 py-3">
                    {r.distance.toLocaleString()} km
                  </td>
                  <td className="px-4 py-3">
                    {r.fuelEff > 0 ? (
                      <span className="text-primary">{r.fuelEff} km/L</span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3">₹{r.fuelCost.toLocaleString()}</td>
                  <td className="px-4 py-3">₹{r.maintCost.toLocaleString()}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    ₹{r.otherCost.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-medium text-success">
                    ₹{r.revenue.toLocaleString()}
                  </td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      r.roi > 0
                        ? "text-success"
                        : r.roi < 0
                          ? "text-destructive"
                          : "text-muted-foreground"
                    }`}
                  >
                    {r.roi}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
