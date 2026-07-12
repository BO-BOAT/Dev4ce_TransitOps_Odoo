import { i as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { s as useStore, t as exportCSV } from "./_ssr/store-9LEy85iz.mjs";
import { b as Plus, j as Download, m as Search, u as Trash2, x as PenLine } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.vehicles-CkPZ7UQt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = {
	regNumber: "",
	model: "",
	type: "Truck",
	maxLoadKg: 1e4,
	odometer: 0,
	acquisitionCost: 0,
	status: "Available",
	region: "North"
};
function VehiclesPage() {
	const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useStore();
	const [q, setQ] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)("regNumber");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [showForm, setShowForm] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(empty);
	const filtered = vehicles.filter((v) => statusFilter === "all" || v.status === statusFilter).filter((v) => [
		v.regNumber,
		v.model,
		v.region
	].join(" ").toLowerCase().includes(q.toLowerCase())).sort((a, b) => String(a[sort]).localeCompare(String(b[sort])));
	const openNew = () => {
		setEditing(null);
		setForm(empty);
		setShowForm(true);
	};
	const openEdit = (v) => {
		setEditing(v);
		setForm(v);
		setShowForm(true);
	};
	const submit = (e) => {
		e.preventDefault();
		if (editing) {
			if (vehicles.some((x) => x.id !== editing.id && x.regNumber.toLowerCase() === form.regNumber.toLowerCase())) return toast.error("Registration number must be unique");
			updateVehicle(editing.id, form);
			toast.success("Vehicle updated");
		} else {
			const res = addVehicle(form);
			if (!res.ok) return toast.error(res.error);
			toast.success("Vehicle added");
		}
		setShowForm(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageHeader, {
				title: "Vehicle Registry",
				subtitle: "Master list of vehicles with unique registration numbers.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => exportCSV("vehicles.csv", filtered),
					className: "btn-ghost",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Export"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: openNew,
					className: "btn-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add vehicle"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Toolbar, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {
					value: q,
					onChange: setQ,
					placeholder: "Search by reg, model, region..."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
					value: statusFilter,
					onChange: (v) => setStatusFilter(v),
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
					value: sort,
					onChange: (v) => setSort(v),
					label: "Sort",
					options: [
						"regNumber",
						"model",
						"odometer",
						"acquisitionCost"
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-xl border border-border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Reg No." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Model" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Type" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Region" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Max Load" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Odometer" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Cost" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [filtered.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border hover:bg-muted/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
									className: "font-mono text-xs",
									children: v.regNumber
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
									className: "font-medium",
									children: v.model
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: v.type }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: v.region }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: [v.maxLoadKg.toLocaleString(), " kg"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: [v.odometer.toLocaleString(), " km"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: ["₹", v.acquisitionCost.toLocaleString()] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: v.status }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => openEdit(v),
										className: "rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											if (confirm("Delete vehicle?")) {
												deleteVehicle(v.id);
												toast.success("Deleted");
											}
										},
										className: "rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})]
								}) })
							]
						}, v.id)), !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 9,
							className: "p-8 text-center text-sm text-muted-foreground",
							children: "No vehicles match your filters."
						}) })] })]
					})
				})
			}),
			showForm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				onClose: () => setShowForm(false),
				title: editing ? "Edit vehicle" : "Add vehicle",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "grid grid-cols-2 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Registration No.",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: form.regNumber,
								onChange: (e) => setForm({
									...form,
									regNumber: e.target.value
								}),
								className: "input"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Model",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: form.model,
								onChange: (e) => setForm({
									...form,
									model: e.target.value
								}),
								className: "input"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Type",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.type,
								onChange: (e) => setForm({
									...form,
									type: e.target.value
								}),
								className: "input",
								children: [
									"Truck",
									"Van",
									"Tanker",
									"Trailer",
									"Pickup"
								].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Region",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.region,
								onChange: (e) => setForm({
									...form,
									region: e.target.value
								}),
								className: "input",
								children: [
									"North",
									"South",
									"East",
									"West"
								].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: r }, r))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Max Load (kg)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								required: true,
								value: form.maxLoadKg,
								onChange: (e) => setForm({
									...form,
									maxLoadKg: +e.target.value
								}),
								className: "input"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Odometer (km)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								required: true,
								value: form.odometer,
								onChange: (e) => setForm({
									...form,
									odometer: +e.target.value
								}),
								className: "input"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Acquisition Cost (₹)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								required: true,
								value: form.acquisitionCost,
								onChange: (e) => setForm({
									...form,
									acquisitionCost: +e.target.value
								}),
								className: "input"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Status",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.status,
								onChange: (e) => setForm({
									...form,
									status: e.target.value
								}),
								className: "input",
								children: [
									"Available",
									"On Trip",
									"In Shop",
									"Retired"
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2 flex justify-end gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowForm(false),
								className: "btn-ghost",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "btn-primary",
								children: editing ? "Save" : "Add vehicle"
							})]
						})
					]
				})
			})
		]
	});
}
function PageHeader({ title, subtitle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col justify-between gap-4 md:flex-row md:items-end",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold",
			children: title
		}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: subtitle
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children
		})]
	});
}
function Toolbar({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap items-center gap-2",
		children
	});
}
function SearchBox({ value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex-1 min-w-[240px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: "w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none ring-ring/20 transition focus:border-primary focus:ring-4"
		})]
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
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${{
			Available: "bg-success/15 text-success ring-success/30",
			"On Trip": "bg-primary/15 text-primary ring-primary/30",
			"In Shop": "bg-warning/15 text-warning ring-warning/30",
			Retired: "bg-muted text-muted-foreground ring-border",
			"Off Duty": "bg-muted text-muted-foreground ring-border",
			Suspended: "bg-destructive/15 text-destructive ring-destructive/30",
			Draft: "bg-muted text-muted-foreground ring-border",
			Dispatched: "bg-primary/15 text-primary ring-primary/30",
			Completed: "bg-success/15 text-success ring-success/30",
			Cancelled: "bg-destructive/15 text-destructive ring-destructive/30"
		}[status] ?? ""}`,
		children: status
	});
}
function Th({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		className: "px-4 py-3 text-left font-medium",
		children
	});
}
function Td({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		className: `px-4 py-3 ${className}`,
		children
	});
}
function Modal({ title, onClose, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-elevated",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 font-display text-xl font-semibold",
				children: title
			}), children]
		})
	});
}
function Field({ label, children, required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
			children: [label, required && " *"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1",
			children
		})]
	});
}
//#endregion
export { Field, FilterSelect, Modal, PageHeader, SearchBox, StatusBadge, Td, Th, Toolbar, VehiclesPage as component };
