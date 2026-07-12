import { i as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { t as fetchApi } from "./_ssr/api-BRcpnhFT.mjs";
import { M as Database, b as Plus, h as Save, n as X, u as Trash2, v as RefreshCw } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.mongodb-demo-C4kjSJWC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MongoDemoPage() {
	const [vehicles, setVehicles] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [editForm, setEditForm] = (0, import_react.useState)({});
	const loadData = async () => {
		setLoading(true);
		try {
			const data = await fetchApi("/vehicles");
			setVehicles(data || []);
		} catch (err) {
			toast.error("Failed to fetch data from MongoDB");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	const handleAdd = async () => {
		const newVehicle = {
			registration_number: `DEMO-${Math.floor(Math.random() * 1e4)}`,
			make: "DemoMake",
			model: "DemoModel",
			year: 2024,
			capacity: 5e3,
			mileage: 0,
			depot: "HQ"
		};
		try {
			await fetchApi("/vehicles", {
				method: "POST",
				body: JSON.stringify(newVehicle)
			});
			toast.success("Row added to MongoDB");
			loadData();
		} catch (err) {
			toast.error(err.message || "Error adding row");
		}
	};
	const handleDelete = async (id) => {
		try {
			await fetchApi(`/vehicles/${id}`, { method: "DELETE" });
			toast.success("Row deleted from MongoDB");
			loadData();
		} catch (err) {
			toast.error(err.message || "Error deleting row");
		}
	};
	const handleEdit = (v) => {
		setEditingId(v._id || v.id);
		setEditForm({
			registration_number: v.registration_number || v.regNumber || "",
			capacity: v.capacity || v.maxLoadKg || 0,
			mileage: v.mileage || v.odometer || 0,
			depot: v.depot || v.region || ""
		});
	};
	const handleSave = async (id) => {
		try {
			await fetchApi(`/vehicles/${id}`, {
				method: "PUT",
				body: JSON.stringify(editForm)
			});
			toast.success("Row updated in MongoDB");
			setEditingId(null);
			loadData();
		} catch (err) {
			toast.error(err.message || "Error updating row");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "flex items-center gap-2 font-display text-2xl font-bold tracking-tight",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-6 text-primary" }), "MongoDB Operations Sheet"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Directly view and edit raw records in the backend database."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: loadData,
					className: "flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), " Refresh"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleAdd,
					className: "flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 shadow-glow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add Row"]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl border border-border bg-card shadow-sm overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-border bg-muted/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "ID (_id)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Registration"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Capacity (kg)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Mileage (km)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Depot"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium text-right",
								children: "Actions"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 6,
							className: "px-4 py-8 text-center text-muted-foreground",
							children: "Loading from MongoDB..."
						}) }) : vehicles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 6,
							className: "px-4 py-8 text-center text-muted-foreground",
							children: "No records found in MongoDB."
						}) }) : vehicles.map((v) => {
							const id = v._id || v.id;
							const isEditing = editingId === id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/30 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 font-mono text-xs text-muted-foreground",
										children: id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											className: "w-full rounded border border-input px-2 py-1 bg-background",
											value: editForm.registration_number,
											onChange: (e) => setEditForm({
												...editForm,
												registration_number: e.target.value
											})
										}) : v.registration_number || v.regNumber || "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											className: "w-full rounded border border-input px-2 py-1 bg-background",
											value: editForm.capacity,
											onChange: (e) => setEditForm({
												...editForm,
												capacity: Number(e.target.value)
											})
										}) : v.capacity || v.maxLoadKg || 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											className: "w-full rounded border border-input px-2 py-1 bg-background",
											value: editForm.mileage,
											onChange: (e) => setEditForm({
												...editForm,
												mileage: Number(e.target.value)
											})
										}) : v.mileage || v.odometer || 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											className: "w-full rounded border border-input px-2 py-1 bg-background",
											value: editForm.depot,
											onChange: (e) => setEditForm({
												...editForm,
												depot: e.target.value
											})
										}) : v.depot || v.region || "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-end gap-2",
											children: [isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleSave(id),
												className: "rounded bg-primary/10 p-1.5 text-primary hover:bg-primary/20",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setEditingId(null),
												className: "rounded bg-muted p-1.5 hover:bg-muted/80",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
											})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleEdit(v),
												className: "text-xs font-medium text-primary hover:underline",
												children: "Edit"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleDelete(id),
												className: "rounded p-1.5 text-destructive hover:bg-destructive/10",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
											})]
										})
									})
								]
							}, id);
						})
					})]
				})
			})
		})]
	});
}
//#endregion
export { MongoDemoPage as component };
