import { i as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { n as useStore, t as exportCSV } from "./_ssr/store-DJ7oVqbZ.mjs";
import { D as Fuel, E as IndianRupee, _ as Receipt, c as TrendingUp, k as Download, m as Search, r as Wrench, v as Plus } from "./_libs/lucide-react.mjs";
import { c as Td, i as PageHeader, l as Th, n as FilterSelect, r as Modal, t as Field } from "./_app.vehicles-CqR2UKDW.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.expenses-Ch2XbDB5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExpensesPage() {
	const { expenses, vehicles, maintenance, trips, addExpense } = useStore();
	const [kindF, setKindF] = (0, import_react.useState)("all");
	const [q, setQ] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		vehicleId: "",
		kind: "Fuel",
		amount: 0,
		liters: 0,
		date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		note: ""
	});
	const rows = (0, import_react.useMemo)(() => expenses.filter((e) => kindF === "all" || e.kind === kindF).filter((e) => {
		if (!q) return true;
		const veh = vehicles.find((v) => v.id === e.vehicleId);
		return [
			veh?.regNumber,
			veh?.model,
			e.kind,
			e.note
		].join(" ").toLowerCase().includes(q.toLowerCase());
	}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((e) => ({
		...e,
		vehicle: vehicles.find((v) => v.id === e.vehicleId)?.regNumber ?? "—"
	})), [
		expenses,
		vehicles,
		kindF,
		q
	]);
	const costByVehicle = (0, import_react.useMemo)(() => {
		return vehicles.map((v) => {
			const fuelExp = expenses.filter((e) => e.vehicleId === v.id && e.kind === "Fuel");
			const fuel = fuelExp.reduce((s, e) => s + e.amount, 0);
			const liters = fuelExp.reduce((s, e) => s + (e.liters ?? 0), 0);
			const other = expenses.filter((e) => e.vehicleId === v.id && e.kind !== "Fuel").reduce((s, e) => s + e.amount, 0);
			const maint = maintenance.filter((m) => m.vehicleId === v.id).reduce((s, m) => s + m.cost, 0);
			const distance = trips.filter((t) => t.vehicleId === v.id && t.status === "Completed").reduce((s, t) => s + (t.actualKm ?? 0), 0);
			const fuelEff = liters > 0 ? +(distance / liters).toFixed(2) : 0;
			return {
				veh: v.regNumber,
				fuel,
				liters,
				maint,
				other,
				total: fuel + maint + other,
				distance,
				fuelEff
			};
		});
	}, [
		vehicles,
		expenses,
		maintenance,
		trips
	]);
	const summary = (0, import_react.useMemo)(() => {
		const totalFuel = expenses.filter((e) => e.kind === "Fuel").reduce((s, e) => s + e.amount, 0);
		const totalOther = expenses.filter((e) => e.kind !== "Fuel").reduce((s, e) => s + e.amount, 0);
		const totalMaint = maintenance.reduce((s, m) => s + m.cost, 0);
		return {
			totalFuel,
			totalOther,
			totalMaint,
			grandTotal: totalFuel + totalOther + totalMaint
		};
	}, [expenses, maintenance]);
	const submit = (e) => {
		e.preventDefault();
		if (!form.vehicleId) return toast.error("Choose a vehicle");
		addExpense({
			vehicleId: form.vehicleId,
			kind: form.kind,
			amount: form.amount,
			liters: form.kind === "Fuel" ? form.liters : void 0,
			date: new Date(form.date).toISOString(),
			note: form.note
		});
		toast.success("Expense recorded");
		setShow(false);
		setForm({
			vehicleId: "",
			kind: "Fuel",
			amount: 0,
			liters: 0,
			date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			note: ""
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageHeader, {
				title: "Fuel & Expense Management",
				subtitle: "Record fuel logs, tolls, and other expenses. Operational cost totals per vehicle update automatically.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => exportCSV("expenses.csv", rows),
					className: "btn-ghost",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Export"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShow(true),
					className: "btn-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add expense"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					{
						label: "Total Fuel",
						value: `₹${summary.totalFuel.toLocaleString()}`,
						color: "text-primary",
						icon: Fuel
					},
					{
						label: "Other Expenses",
						value: `₹${summary.totalOther.toLocaleString()}`,
						color: "text-muted-foreground",
						icon: Receipt
					},
					{
						label: "Maintenance",
						value: `₹${summary.totalMaint.toLocaleString()}`,
						color: "text-warning",
						icon: Wrench
					},
					{
						label: "Operational Total",
						value: `₹${summary.grandTotal.toLocaleString()}`,
						color: "text-foreground",
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-xl border border-border bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-between border-b border-border p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "size-4 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display font-semibold",
										children: "Expense Log"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground",
										children: rows.length
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-b border-border px-4 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: q,
										onChange: (e) => setQ(e.target.value),
										placeholder: "Search vehicle, type, note...",
										className: "w-full rounded-lg border border-border bg-background py-1.5 pl-8 pr-3 text-xs outline-none focus:border-primary"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
									value: kindF,
									onChange: (v) => setKindF(v),
									label: "Kind",
									options: [
										"all",
										"Fuel",
										"Toll",
										"Parking",
										"Other"
									]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-[420px] overflow-y-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "sticky top-0 bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Date" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Vehicle" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Kind" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Amount" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Litres" })
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-border hover:bg-muted/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
											className: "text-xs text-muted-foreground",
											children: e.date.slice(0, 10)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
											className: "font-mono text-xs",
											children: e.vehicle
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: e.kind === "Fuel" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fuel, { className: "size-3" }), " Fuel"]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: e.kind
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, {
											className: "font-medium",
											children: ["₹", e.amount.toLocaleString()]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: e.liters ? `${e.liters} L` : "—" })
									]
								}, e.id)), !rows.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 5,
									className: "p-6 text-center text-xs text-muted-foreground",
									children: "No expenses match your filters."
								}) })] })]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-xl border border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display font-semibold",
								children: "Operational Cost per Vehicle"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: "Fuel + Maintenance + Other expenses, with fuel efficiency"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-h-[420px] overflow-y-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "sticky top-0 bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Vehicle" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Fuel" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Maint." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Other" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Fuel Eff." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Total" })
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: costByVehicle.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border hover:bg-muted/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
										className: "font-mono text-xs",
										children: r.veh
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: ["₹", r.fuel.toLocaleString()] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: ["₹", r.maint.toLocaleString()] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: ["₹", r.other.toLocaleString()] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: r.fuelEff > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-primary",
										children: [r.fuelEff, " km/L"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "—"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, {
										className: "font-semibold text-primary",
										children: ["₹", r.total.toLocaleString()]
									})
								]
							}, r.veh)) })]
						})
					})]
				})]
			}),
			show && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				onClose: () => setShow(false),
				title: "Record expense",
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
								}), vehicles.filter((v) => v.status !== "Retired").map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: v.id,
									children: [
										v.regNumber,
										" — ",
										v.model
									]
								}, v.id))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Expense Type",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.kind,
								onChange: (e) => setForm({
									...form,
									kind: e.target.value
								}),
								className: "input",
								children: [
									"Fuel",
									"Toll",
									"Parking",
									"Other"
								].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: k }, k))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Amount (₹)",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								required: true,
								min: 0,
								value: form.amount,
								onChange: (e) => setForm({
									...form,
									amount: +e.target.value
								}),
								className: "input"
							})
						}),
						form.kind === "Fuel" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Litres",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 0,
								value: form.liters,
								onChange: (e) => setForm({
									...form,
									liters: +e.target.value
								}),
								className: "input",
								placeholder: "Fuel volume"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Date",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: form.date,
								onChange: (e) => setForm({
									...form,
									date: e.target.value
								}),
								className: "input"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Note",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.note,
									onChange: (e) => setForm({
										...form,
										note: e.target.value
									}),
									className: "input",
									placeholder: "Optional description..."
								})
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
								children: "Record expense"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { ExpensesPage as component };
