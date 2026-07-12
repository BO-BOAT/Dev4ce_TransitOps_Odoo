import { i as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { s as useStore, t as exportCSV } from "./_ssr/store-9LEy85iz.mjs";
import { b as Plus, j as Download, s as TriangleAlert, u as Trash2, x as PenLine } from "./_libs/lucide-react.mjs";
import { c as Td, i as PageHeader, l as Th, n as FilterSelect, o as SearchBox, r as Modal, s as StatusBadge, t as Field, u as Toolbar } from "./_app.vehicles-CxddZr4f.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.drivers-D6Ny2b0I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = {
	name: "",
	licenseNumber: "",
	licenseCategory: "C",
	licenseExpiry: new Date(Date.now() + 365 * 864e5).toISOString().slice(0, 10),
	contact: "",
	safetyScore: 85,
	status: "Available"
};
function DriversPage() {
	const { drivers, addDriver, updateDriver, deleteDriver } = useStore();
	const [q, setQ] = (0, import_react.useState)("");
	const [statusF, setStatusF] = (0, import_react.useState)("all");
	const [show, setShow] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(empty);
	const filtered = drivers.filter((d) => statusF === "all" || d.status === statusF).filter((d) => [
		d.name,
		d.licenseNumber,
		d.contact
	].join(" ").toLowerCase().includes(q.toLowerCase()));
	const openNew = () => {
		setEditing(null);
		setForm(empty);
		setShow(true);
	};
	const openEdit = (d) => {
		setEditing(d);
		setForm(d);
		setShow(true);
	};
	const submit = (e) => {
		e.preventDefault();
		if (editing) {
			updateDriver(editing.id, form);
			toast.success("Driver updated");
		} else {
			addDriver(form);
			toast.success("Driver added");
		}
		setShow(false);
	};
	const isExpired = (iso) => new Date(iso) < /* @__PURE__ */ new Date();
	const isExpiringSoon = (iso) => {
		const d = (new Date(iso).getTime() - Date.now()) / 864e5;
		return d > 0 && d < 180;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageHeader, {
				title: "Driver Management",
				subtitle: "Profiles, licenses, safety scores.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => exportCSV("drivers.csv", filtered),
					className: "btn-ghost",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Export"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: openNew,
					className: "btn-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add driver"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Toolbar, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {
				value: q,
				onChange: setQ,
				placeholder: "Search name, license, phone..."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
				value: statusF,
				onChange: (v) => setStatusF(v),
				label: "Status",
				options: [
					"all",
					"Available",
					"On Trip",
					"Off Duty",
					"Suspended"
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-xl border border-border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Name" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "License" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Cat" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Expiry" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Contact" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Safety" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [filtered.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border hover:bg-muted/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
									className: "font-medium",
									children: d.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
									className: "font-mono text-xs",
									children: d.licenseNumber
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: d.licenseCategory }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
									className: isExpired(d.licenseExpiry) ? "text-destructive" : isExpiringSoon(d.licenseExpiry) ? "text-warning" : "",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [(isExpired(d.licenseExpiry) || isExpiringSoon(d.licenseExpiry)) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5" }), d.licenseExpiry.slice(0, 10)]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
									className: "text-xs",
									children: d.contact
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1.5 w-16 overflow-hidden rounded-full bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-gradient-to-r from-primary to-accent",
											style: { width: `${d.safetyScore}%` }
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs",
										children: d.safetyScore
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: d.status }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => openEdit(d),
										className: "rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											if (confirm("Delete driver?")) {
												deleteDriver(d.id);
												toast.success("Deleted");
											}
										},
										className: "rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})]
								}) })
							]
						}, d.id)), !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 8,
							className: "p-8 text-center text-sm text-muted-foreground",
							children: "No drivers match your filters."
						}) })] })]
					})
				})
			}),
			show && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				onClose: () => setShow(false),
				title: editing ? "Edit driver" : "Add driver",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "grid grid-cols-2 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: form.name,
								onChange: (e) => setForm({
									...form,
									name: e.target.value
								}),
								className: "input"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "License Number",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: form.licenseNumber,
								onChange: (e) => setForm({
									...form,
									licenseNumber: e.target.value
								}),
								className: "input"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "License Category",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.licenseCategory,
								onChange: (e) => setForm({
									...form,
									licenseCategory: e.target.value
								}),
								className: "input",
								children: [
									"A",
									"B",
									"C",
									"D",
									"E"
								].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "License Expiry",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								required: true,
								value: form.licenseExpiry.slice(0, 10),
								onChange: (e) => setForm({
									...form,
									licenseExpiry: e.target.value
								}),
								className: "input"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Contact",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: form.contact,
								onChange: (e) => setForm({
									...form,
									contact: e.target.value
								}),
								className: "input"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Safety Score",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 0,
								max: 100,
								required: true,
								value: form.safetyScore,
								onChange: (e) => setForm({
									...form,
									safetyScore: +e.target.value
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
									"Off Duty",
									"Suspended"
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
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
								children: editing ? "Save" : "Add driver"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { DriversPage as component };
