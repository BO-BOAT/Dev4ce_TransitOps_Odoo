import { i as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { n as useStore, t as exportCSV } from "./_ssr/store-DJ7oVqbZ.mjs";
import { A as Clock, E as IndianRupee, N as CircleCheck, k as Download, r as Wrench, v as Plus } from "./_libs/lucide-react.mjs";
import { i as PageHeader, n as FilterSelect, o as SearchBox, r as Modal, t as Field, u as Toolbar } from "./_app.vehicles-CqR2UKDW.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.maintenance-CMdAA7o5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MaintenancePage() {
	const { maintenance, vehicles, openMaintenance, closeMaintenance } = useStore();
	const [show, setShow] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const [statusF, setStatusF] = (0, import_react.useState)("all");
	const [form, setForm] = (0, import_react.useState)({
		vehicleId: "",
		description: "",
		cost: 0,
		startDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
	});
	const rows = (0, import_react.useMemo)(() => maintenance.map((m) => {
		const veh = vehicles.find((v) => v.id === m.vehicleId);
		return {
			...m,
			vehicle: veh?.regNumber ?? "—",
			model: veh?.model ?? "",
			active: !m.endDate,
			daysOpen: m.endDate ? 0 : Math.ceil((Date.now() - new Date(m.startDate).getTime()) / 864e5)
		};
	}), [maintenance, vehicles]);
	const filtered = rows.filter((r) => {
		if (statusF === "Active") return r.active;
		if (statusF === "Closed") return !r.active;
		return true;
	}).filter((r) => [
		r.vehicle,
		r.model,
		r.description
	].join(" ").toLowerCase().includes(q.toLowerCase()));
	const stats = (0, import_react.useMemo)(() => ({
		active: rows.filter((r) => r.active).length,
		closed: rows.filter((r) => !r.active).length,
		totalCost: rows.reduce((s, r) => s + r.cost, 0),
		avgCost: rows.length ? Math.round(rows.reduce((s, r) => s + r.cost, 0) / rows.length) : 0
	}), [rows]);
	const submit = (e) => {
		e.preventDefault();
		if (!form.vehicleId) return toast.error("Choose a vehicle");
		openMaintenance({
			...form,
			startDate: new Date(form.startDate).toISOString()
		});
		toast.success("Maintenance opened — vehicle set to In Shop");
		setShow(false);
		setForm({
			vehicleId: "",
			description: "",
			cost: 0,
			startDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		});
	};
	const eligibleVehicles = vehicles.filter((v) => v.status !== "Retired");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageHeader, {
				title: "Maintenance Log",
				subtitle: "Log service jobs. Opening one flips the vehicle to In Shop automatically, removing it from dispatch.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => exportCSV("maintenance.csv", rows),
					className: "btn-ghost",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Export"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShow(true),
					className: "btn-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New record"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					{
						label: "Active Jobs",
						value: stats.active,
						color: "text-warning",
						icon: Wrench
					},
					{
						label: "Completed",
						value: stats.closed,
						color: "text-success",
						icon: CircleCheck
					},
					{
						label: "Total Cost",
						value: `₹${stats.totalCost.toLocaleString()}`,
						color: "text-foreground",
						icon: IndianRupee
					},
					{
						label: "Avg. Cost",
						value: `₹${stats.avgCost.toLocaleString()}`,
						color: "text-muted-foreground",
						icon: IndianRupee
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "size-3.5" }), s.label]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `mt-1 font-display text-2xl font-bold ${s.color}`,
						children: s.value
					})]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Toolbar, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {
				value: q,
				onChange: setQ,
				placeholder: "Search vehicle, description..."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
				value: statusF,
				onChange: (v) => setStatusF(v),
				label: "Status",
				options: [
					"all",
					"Active",
					"Closed"
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [filtered.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `rounded-xl border p-5 transition ${m.active ? "border-warning/40 bg-warning/5" : "border-border bg-card"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `grid size-10 place-items-center rounded-lg ${m.active ? "bg-warning/20 text-warning" : "bg-muted text-muted-foreground"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display font-semibold",
											children: m.vehicle
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: m.model
										}),
										m.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-md bg-warning/15 px-1.5 py-0.5 text-[10px] font-medium text-warning ring-1 ring-inset ring-warning/30",
											children: "In Shop"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-sm text-muted-foreground",
									children: m.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1.5 flex flex-wrap gap-3 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }),
												"Started: ",
												m.startDate.slice(0, 10)
											]
										}),
										m.endDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Closed: ", m.endDate.slice(0, 10)] }),
										m.active && m.daysOpen > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-warning",
											children: [
												m.daysOpen,
												" day",
												m.daysOpen !== 1 ? "s" : "",
												" in shop"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground",
												children: m.cost.toLocaleString()
											})]
										})
									]
								})
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: m.active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									closeMaintenance(m.id);
									toast.success("Closed — vehicle restored to Available");
								},
								className: "btn-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " Close job"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-md bg-success/15 px-2 py-0.5 text-xs font-medium text-success ring-1 ring-inset ring-success/30",
								children: "Closed"
							})
						})]
					})
				}, m.id)), !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground",
					children: "No maintenance records match your filters."
				})]
			}),
			show && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				onClose: () => setShow(false),
				title: "Open maintenance record",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "grid grid-cols-2 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Vehicle",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								required: true,
								value: form.vehicleId,
								onChange: (e) => setForm({
									...form,
									vehicleId: e.target.value
								}),
								className: "input",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select vehicle..."
								}), eligibleVehicles.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: v.id,
									children: [
										v.regNumber,
										" — ",
										v.model,
										" (",
										v.status,
										")"
									]
								}, v.id))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Start date",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: form.startDate,
								onChange: (e) => setForm({
									...form,
									startDate: e.target.value
								}),
								className: "input"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Description",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									value: form.description,
									onChange: (e) => setForm({
										...form,
										description: e.target.value
									}),
									className: "input",
									placeholder: "e.g. Engine overhaul, brake replacement..."
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Estimated cost (₹)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 0,
								value: form.cost,
								onChange: (e) => setForm({
									...form,
									cost: +e.target.value
								}),
								className: "input"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2 flex justify-end gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShow(false),
								className: "btn-ghost",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "btn-primary",
								children: "Open record"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { MaintenancePage as component };
