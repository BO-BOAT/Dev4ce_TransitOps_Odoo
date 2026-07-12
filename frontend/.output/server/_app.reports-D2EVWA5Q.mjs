import { i as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { s as useStore, t as exportCSV } from "./_ssr/store-9LEy85iz.mjs";
import { A as FileText, O as IndianRupee, T as MapPin, c as TrendingUp, j as Download, k as Fuel, l as TrendingDown, r as Wrench } from "./_libs/lucide-react.mjs";
import { a as YAxis, c as CartesianGrid, d as Pie, f as PolarAngleAxis, g as Legend, h as Tooltip, i as LineChart, l as Bar, m as ResponsiveContainer, n as PieChart, o as XAxis, p as Cell, r as BarChart, s as Line, t as RadialBarChart, u as RadialBar } from "./_libs/recharts+[...].mjs";
import { i as PageHeader } from "./_app.vehicles-CxddZr4f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.reports-D2EVWA5Q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PIE_COLORS = [
	"var(--primary)",
	"var(--warning)",
	"var(--muted-foreground)"
];
function ReportsPage() {
	const { vehicles, trips, expenses, maintenance } = useStore();
	const perVehicle = (0, import_react.useMemo)(() => {
		return vehicles.map((v) => {
			const fuelExp = expenses.filter((e) => e.vehicleId === v.id && e.kind === "Fuel");
			const totalFuelCost = fuelExp.reduce((s, e) => s + e.amount, 0);
			const totalLiters = fuelExp.reduce((s, e) => s + (e.liters ?? 0), 0);
			const maintCost = maintenance.filter((m) => m.vehicleId === v.id).reduce((s, m) => s + m.cost, 0);
			const otherCost = expenses.filter((e) => e.vehicleId === v.id && e.kind !== "Fuel").reduce((s, e) => s + e.amount, 0);
			const completed = trips.filter((t) => t.vehicleId === v.id && t.status === "Completed");
			const distance = completed.reduce((s, t) => s + (t.actualKm ?? 0), 0);
			const revenue = completed.reduce((s, t) => s + (t.revenue ?? 0), 0);
			const fuelEff = totalLiters > 0 ? distance / totalLiters : 0;
			const totalCost = totalFuelCost + maintCost + otherCost;
			const roi = v.acquisitionCost > 0 ? (revenue - totalCost) / v.acquisitionCost : 0;
			return {
				veh: v.regNumber,
				distance,
				revenue,
				fuelCost: totalFuelCost,
				maintCost,
				otherCost,
				totalCost,
				fuelEff: +fuelEff.toFixed(2),
				roi: +(roi * 100).toFixed(1)
			};
		});
	}, [
		vehicles,
		trips,
		expenses,
		maintenance
	]);
	const summary = (0, import_react.useMemo)(() => {
		const totalRevenue = perVehicle.reduce((s, r) => s + r.revenue, 0);
		const totalCost = perVehicle.reduce((s, r) => s + r.totalCost, 0);
		const totalDistance = perVehicle.reduce((s, r) => s + r.distance, 0);
		const netProfit = totalRevenue - totalCost;
		const overallROI = totalCost > 0 ? (totalRevenue - totalCost) / totalCost * 100 : 0;
		const totalFuelLiters = expenses.filter((e) => e.kind === "Fuel").reduce((s, e) => s + (e.liters ?? 0), 0);
		const avgFuelEff = totalFuelLiters > 0 ? totalDistance / totalFuelLiters : 0;
		return {
			totalRevenue,
			totalCost,
			totalDistance,
			netProfit,
			overallROI: +overallROI.toFixed(1),
			avgFuelEff: +avgFuelEff.toFixed(2)
		};
	}, [perVehicle, expenses]);
	const costDistribution = (0, import_react.useMemo)(() => {
		const totalFuel = expenses.filter((e) => e.kind === "Fuel").reduce((s, e) => s + e.amount, 0);
		const totalMaint = maintenance.reduce((s, m) => s + m.cost, 0);
		const totalOther = expenses.filter((e) => e.kind !== "Fuel").reduce((s, e) => s + e.amount, 0);
		return [
			{
				name: "Fuel",
				value: totalFuel
			},
			{
				name: "Maintenance",
				value: totalMaint
			},
			{
				name: "Other",
				value: totalOther
			}
		].filter((d) => d.value > 0);
	}, [expenses, maintenance]);
	const active = vehicles.filter((v) => v.status === "On Trip").length;
	const dispatchable = vehicles.filter((v) => v.status !== "Retired").length;
	const utilization = dispatchable ? Math.round(active / dispatchable * 100) : 0;
	const handlePrintPDF = () => {
		const printWindow = window.open("", "_blank");
		if (!printWindow) return;
		const scorecardRows = perVehicle.map((r) => `<tr>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;font-family:monospace;font-size:12px">${r.veh}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb">${r.distance.toLocaleString()} km</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb">${r.fuelEff > 0 ? r.fuelEff + " km/L" : "—"}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb">₹${r.fuelCost.toLocaleString()}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb">₹${r.maintCost.toLocaleString()}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb">₹${r.revenue.toLocaleString()}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;font-weight:600;color:${r.roi > 0 ? "#16a34a" : "#dc2626"}">${r.roi}%</td>
        </tr>`).join("");
		printWindow.document.write(`
      <html><head><title>Fleet Reports — TransitOps</title></head>
      <body style="font-family:Inter,sans-serif;padding:40px;color:#1e293b">
        <h1 style="font-size:24px;margin-bottom:4px">Reports &amp; Analytics</h1>
        <p style="color:#64748b;font-size:13px;margin-bottom:24px">Generated ${(/* @__PURE__ */ new Date()).toLocaleDateString()}</p>
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageHeader, {
				title: "Reports & Analytics",
				subtitle: "Fuel efficiency, utilization, operational cost, and ROI per vehicle.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handlePrintPDF,
					className: "btn-ghost",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), " Export PDF"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => exportCSV("report_per_vehicle.csv", perVehicle),
					className: "btn-ghost",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Export CSV"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6",
				children: [
					{
						label: "Revenue",
						value: `₹${summary.totalRevenue.toLocaleString()}`,
						color: "text-success",
						icon: IndianRupee
					},
					{
						label: "Total Cost",
						value: `₹${summary.totalCost.toLocaleString()}`,
						color: "text-foreground",
						icon: Wrench
					},
					{
						label: "Net Profit",
						value: `₹${summary.netProfit.toLocaleString()}`,
						color: summary.netProfit >= 0 ? "text-success" : "text-destructive",
						icon: summary.netProfit >= 0 ? TrendingUp : TrendingDown
					},
					{
						label: "Overall ROI",
						value: `${summary.overallROI}%`,
						color: summary.overallROI >= 0 ? "text-success" : "text-destructive",
						icon: summary.overallROI >= 0 ? TrendingUp : TrendingDown
					},
					{
						label: "Total Distance",
						value: `${summary.totalDistance.toLocaleString()} km`,
						color: "text-primary",
						icon: MapPin
					},
					{
						label: "Avg Fuel Eff.",
						value: `${summary.avgFuelEff} km/L`,
						color: "text-primary",
						icon: Fuel
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "size-3.5" }), s.label]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `mt-1 font-display text-lg font-bold ${s.color}`,
						children: s.value
					})]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Fleet Utilization"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 h-52",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadialBarChart, {
										innerRadius: "70%",
										outerRadius: "100%",
										data: [{
											name: "util",
											value: utilization,
											fill: "var(--primary)"
										}],
										startAngle: 90,
										endAngle: -270,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
												type: "number",
												domain: [0, 100],
												tick: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadialBar, {
												background: true,
												dataKey: "value",
												cornerRadius: 20
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
												x: "50%",
												y: "50%",
												textAnchor: "middle",
												dominantBaseline: "middle",
												className: "fill-foreground font-display",
												fontSize: 32,
												fontWeight: 700,
												children: [utilization, "%"]
											})
										]
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-center text-xs text-muted-foreground",
								children: [
									active,
									" of ",
									dispatchable,
									" vehicles on trip"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Cost Distribution"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-52",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
										data: costDistribution,
										cx: "50%",
										cy: "50%",
										innerRadius: 50,
										outerRadius: 80,
										paddingAngle: 3,
										dataKey: "value",
										children: costDistribution.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: PIE_COLORS[i % PIE_COLORS.length] }, i))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										formatter: (value) => `₹${value.toLocaleString()}`,
										contentStyle: {
											background: "var(--popover)",
											border: "1px solid var(--border)",
											borderRadius: 8,
											color: "#e2e8f0"
										},
										labelStyle: { color: "#e2e8f0" },
										wrapperStyle: { color: "#e2e8f0" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
										iconType: "circle",
										formatter: (value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: value
										})
									})
								] })
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-6 lg:col-span-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Fuel Efficiency (km/L)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-52",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: perVehicle.filter((r) => r.fuelEff > 0),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "var(--border)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "veh",
											tick: {
												fill: "var(--muted-foreground)",
												fontSize: 10
											},
											interval: 0,
											angle: -30,
											textAnchor: "end",
											height: 50
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
											fill: "var(--muted-foreground)",
											fontSize: 11
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
											background: "var(--popover)",
											border: "1px solid var(--border)",
											borderRadius: 8,
											color: "#e2e8f0"
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "fuelEff",
											fill: "var(--accent)",
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
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground",
					children: "Operational Cost vs Revenue"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 h-72",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data: perVehicle,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "var(--border)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "veh",
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
									borderRadius: 8,
									color: "#e2e8f0"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "totalCost",
									stroke: "var(--warning)",
									strokeWidth: 2,
									name: "Total Cost",
									dot: { r: 4 }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "revenue",
									stroke: "var(--success)",
									strokeWidth: 2,
									name: "Revenue",
									dot: { r: 4 }
								})
							]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-xl border border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-border p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display font-semibold",
						children: "Per-Vehicle Scorecard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "ROI = (Revenue − (Maintenance + Fuel + Other)) ÷ Acquisition Cost"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left font-medium",
									children: "Vehicle"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left font-medium",
									children: "Distance"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left font-medium",
									children: "Fuel Efficiency"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left font-medium",
									children: "Fuel Cost"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left font-medium",
									children: "Maint. Cost"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left font-medium",
									children: "Other Cost"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left font-medium",
									children: "Revenue"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left font-medium",
									children: "ROI"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: perVehicle.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border hover:bg-muted/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 font-mono text-xs",
									children: r.veh
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3",
									children: [r.distance.toLocaleString(), " km"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: r.fuelEff > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-primary",
										children: [r.fuelEff, " km/L"]
									}) : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3",
									children: ["₹", r.fuelCost.toLocaleString()]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3",
									children: ["₹", r.maintCost.toLocaleString()]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: ["₹", r.otherCost.toLocaleString()]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3 font-medium text-success",
									children: ["₹", r.revenue.toLocaleString()]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: `px-4 py-3 font-semibold ${r.roi > 0 ? "text-success" : r.roi < 0 ? "text-destructive" : "text-muted-foreground"}`,
									children: [r.roi, "%"]
								})
							]
						}, r.veh)) })]
					})
				})]
			})
		]
	});
}
//#endregion
export { ReportsPage as component };
