import { i as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { s as useStore } from "./_ssr/store-9LEy85iz.mjs";
import { _ as Route, c as TrendingUp, i as Users, k as Fuel, o as Truck, r as Wrench, s as TriangleAlert } from "./_libs/lucide-react.mjs";
import { a as YAxis, c as CartesianGrid, d as Pie, g as Legend, h as Tooltip, l as Bar, m as ResponsiveContainer, n as PieChart, o as XAxis, p as Cell, r as BarChart } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.dashboard-Dt92ahbh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { vehicles, drivers, trips, maintenance, expenses } = useStore();
	const [type, setType] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [region, setRegion] = (0, import_react.useState)("all");
	const filtered = vehicles.filter((v) => (type === "all" || v.type === type) && (status === "all" || v.status === status) && (region === "all" || v.region === region));
	const active = filtered.filter((v) => v.status === "On Trip").length;
	const available = filtered.filter((v) => v.status === "Available").length;
	const inShop = filtered.filter((v) => v.status === "In Shop").length;
	const activeTrips = trips.filter((t) => t.status === "Dispatched").length;
	const pendingTrips = trips.filter((t) => t.status === "Draft").length;
	const onDuty = drivers.filter((d) => d.status === "On Trip" || d.status === "Available").length;
	const utilization = filtered.length ? Math.round(active / filtered.length * 100) : 0;
	const expiringSoon = drivers.filter((d) => {
		return (new Date(d.licenseExpiry).getTime() - Date.now()) / 864e5 < 180;
	});
	const statusData = (0, import_react.useMemo)(() => [
		{
			name: "Available",
			value: filtered.filter((v) => v.status === "Available").length,
			color: "var(--success)"
		},
		{
			name: "On Trip",
			value: active,
			color: "var(--primary)"
		},
		{
			name: "In Shop",
			value: inShop,
			color: "var(--warning)"
		},
		{
			name: "Retired",
			value: filtered.filter((v) => v.status === "Retired").length,
			color: "var(--muted-foreground)"
		}
	], [
		filtered,
		active,
		inShop
	]);
	const spendByVehicle = (0, import_react.useMemo)(() => {
		const map = {};
		for (const v of vehicles) map[v.regNumber] = 0;
		for (const e of expenses) {
			const veh = vehicles.find((v) => v.id === e.vehicleId);
			if (veh) map[veh.regNumber] += e.amount;
		}
		for (const m of maintenance) {
			const veh = vehicles.find((v) => v.id === m.vehicleId);
			if (veh) map[veh.regNumber] = (map[veh.regNumber] ?? 0) + m.cost;
		}
		return Object.entries(map).map(([name, value]) => ({
			name,
			value
		}));
	}, [
		vehicles,
		expenses,
		maintenance
	]);
	const kpis = [
		{
			label: "Active Vehicles",
			value: active,
			icon: Truck,
			tone: "primary"
		},
		{
			label: "Available Vehicles",
			value: available,
			icon: Truck,
			tone: "success"
		},
		{
			label: "In Maintenance",
			value: inShop,
			icon: Wrench,
			tone: "warning"
		},
		{
			label: "Active Trips",
			value: activeTrips,
			icon: Route,
			tone: "info"
		},
		{
			label: "Pending Trips",
			value: pendingTrips,
			icon: Route,
			tone: "muted"
		},
		{
			label: "Drivers On Duty",
			value: onDuty,
			icon: Users,
			tone: "primary"
		},
		{
			label: "Fleet Utilization",
			value: `${utilization}%`,
			icon: TrendingUp,
			tone: "accent"
		},
		{
			label: "License Alerts",
			value: expiringSoon.length,
			icon: TriangleAlert,
			tone: "warning"
		}
	];
	const toneMap = {
		primary: "bg-primary/10 text-primary",
		success: "bg-success/10 text-success",
		warning: "bg-warning/15 text-warning",
		info: "bg-info/10 text-info",
		muted: "bg-muted text-muted-foreground",
		accent: "bg-accent/15 text-accent"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-between gap-4 md:flex-row md:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold",
					children: "Operations Dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Live snapshot across your fleet, drivers and trips."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
							value: type,
							onChange: setType,
							label: "Type",
							options: [
								"all",
								"Truck",
								"Van",
								"Tanker",
								"Trailer",
								"Pickup"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
							value: status,
							onChange: setStatus,
							label: "Status",
							options: [
								"all",
								"Available",
								"On Trip",
								"In Shop",
								"Retired"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
							value: region,
							onChange: setRegion,
							label: "Region",
							options: [
								"all",
								"North",
								"South",
								"East",
								"West"
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: kpis.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition hover:shadow-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute -right-6 -top-6 size-24 rounded-full ${toneMap[k.tone]} opacity-20 blur-xl transition group-hover:opacity-40` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
								children: k.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `grid size-9 place-items-center rounded-lg ${toneMap[k.tone]}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(k.icon, { className: "size-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-3xl font-bold tracking-tight",
							children: k.value
						})]
					})]
				}, k.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-6 lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-semibold",
							children: "Operational spend by vehicle"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Fuel + maintenance + other expenses (₹)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-72",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: spendByVehicle,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "var(--border)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "name",
											tick: {
												fill: "var(--muted-foreground)",
												fontSize: 11
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
											fill: "var(--muted-foreground)",
											fontSize: 11
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
											background: "var(--popover)",
											border: "1px solid var(--border)",
											borderRadius: 8
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "value",
											fill: "var(--primary)",
											radius: [
												6,
												6,
												0,
												0
											]
										})
									]
								})
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-semibold",
							children: "Fleet status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Distribution across states"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-72",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
										data: statusData,
										dataKey: "value",
										nameKey: "name",
										innerRadius: 55,
										outerRadius: 90,
										paddingAngle: 3,
										children: statusData.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: s.color }, s.name))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										background: "var(--popover)",
										border: "1px solid var(--border)",
										borderRadius: 8
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } })
								] })
							})
						})
					]
				})]
			}),
			expiringSoon.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-warning/40 bg-warning/5 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-warning",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fuel, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display font-semibold",
						children: "Licenses expiring within 6 months"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-2 md:grid-cols-2",
					children: expiringSoon.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: d.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs text-muted-foreground",
							children: ["exp ", d.licenseExpiry]
						})]
					}, d.id))
				})]
			})
		]
	});
}
function FilterSelect({ value, onChange, label, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "bg-transparent text-sm outline-none",
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: o,
				className: "bg-background",
				children: o === "all" ? "All" : o
			}, o))
		})]
	});
}
//#endregion
export { Dashboard as component };
