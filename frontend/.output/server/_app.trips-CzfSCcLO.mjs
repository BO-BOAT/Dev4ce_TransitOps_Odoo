import { i as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { n as useStore, t as exportCSV } from "./_ssr/store-DJ7oVqbZ.mjs";
import { A as Clock, C as MapPin, E as IndianRupee, M as CircleDot, N as CircleCheck, a as User, b as Package, h as Ruler, j as CircleX, k as Download, o as Truck, p as Send, v as Plus } from "./_libs/lucide-react.mjs";
import { i as PageHeader, n as FilterSelect, o as SearchBox, r as Modal, s as StatusBadge, t as Field, u as Toolbar } from "./_app.vehicles-CqR2UKDW.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.trips-CzfSCcLO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lifecycleSteps = [
	"Draft",
	"Dispatched",
	"Completed"
];
function LifecycleBar({ status }) {
	if (status === "Cancelled") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1.5 text-xs text-destructive",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium",
			children: "Cancelled"
		})]
	});
	const idx = lifecycleSteps.indexOf(status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center gap-1",
		children: lifecycleSteps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${i <= idx ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDot, { className: "size-3" }), step]
			}), i < lifecycleSteps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-px w-4 ${i < idx ? "bg-primary/50" : "bg-border"}` })]
		}, step))
	});
}
function TripsPage() {
	const { trips, vehicles, drivers, createTrip, dispatchTrip, completeTrip, cancelTrip } = useStore();
	const [q, setQ] = (0, import_react.useState)("");
	const [statusF, setStatusF] = (0, import_react.useState)("all");
	const [show, setShow] = (0, import_react.useState)(false);
	const [completing, setCompleting] = (0, import_react.useState)(null);
	const [actualKm, setActualKm] = (0, import_react.useState)(0);
	const [revenue, setRevenue] = (0, import_react.useState)(0);
	const [dispatchConfirm, setDispatchConfirm] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		source: "",
		destination: "",
		vehicleId: "",
		driverId: "",
		cargoKg: 0,
		plannedKm: 0
	});
	const availableVehicles = vehicles.filter((v) => v.status === "Available");
	const availableDrivers = drivers.filter((d) => d.status === "Available" && new Date(d.licenseExpiry) > /* @__PURE__ */ new Date());
	const filtered = trips.filter((t) => statusF === "all" || t.status === statusF).filter((t) => [
		t.source,
		t.destination,
		driverName(t.driverId),
		vehicleName(t.vehicleId)
	].join(" ").toLowerCase().includes(q.toLowerCase()));
	const stats = (0, import_react.useMemo)(() => ({
		total: trips.length,
		draft: trips.filter((t) => t.status === "Draft").length,
		active: trips.filter((t) => t.status === "Dispatched").length,
		completed: trips.filter((t) => t.status === "Completed").length,
		cancelled: trips.filter((t) => t.status === "Cancelled").length
	}), [trips]);
	const submit = (e) => {
		e.preventDefault();
		const res = createTrip(form);
		if (!res.ok) return toast.error(res.error);
		toast.success("Trip drafted");
		setShow(false);
		setForm({
			source: "",
			destination: "",
			vehicleId: "",
			driverId: "",
			cargoKg: 0,
			plannedKm: 0
		});
	};
	const vehicleName = (id) => vehicles.find((v) => v.id === id)?.regNumber ?? "—";
	const driverName = (id) => drivers.find((d) => d.id === id)?.name ?? "—";
	const vehicleModel = (id) => vehicles.find((v) => v.id === id)?.model ?? "";
	const selectedVeh = vehicles.find((v) => v.id === form.vehicleId);
	const overCapacity = selectedVeh ? form.cargoKg > selectedVeh.maxLoadKg : false;
	const doDispatch = (trip) => {
		const r = dispatchTrip(trip.id);
		if (r.ok) toast.success("Trip dispatched — vehicle and driver assigned");
		else toast.error(r.error);
		setDispatchConfirm(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageHeader, {
				title: "Trip Management",
				subtitle: "Dispatch trips with automatic rule enforcement.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => exportCSV("trips.csv", filtered),
					className: "btn-ghost",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Export"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShow(true),
					className: "btn-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New trip"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-5",
				children: [
					{
						label: "Total",
						value: stats.total,
						color: "text-foreground"
					},
					{
						label: "Draft",
						value: stats.draft,
						color: "text-muted-foreground"
					},
					{
						label: "Active",
						value: stats.active,
						color: "text-primary"
					},
					{
						label: "Completed",
						value: stats.completed,
						color: "text-success"
					},
					{
						label: "Cancelled",
						value: stats.cancelled,
						color: "text-destructive"
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: s.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `mt-1 font-display text-2xl font-bold ${s.color}`,
						children: s.value
					})]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Toolbar, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {
				value: q,
				onChange: setQ,
				placeholder: "Search source, destination, driver, vehicle..."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
				value: statusF,
				onChange: (v) => setStatusF(v),
				label: "Status",
				options: [
					"all",
					"Draft",
					"Dispatched",
					"Completed",
					"Cancelled"
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [filtered.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-border bg-card p-5 transition hover:border-primary/40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-10 place-items-center rounded-lg bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 font-display text-base font-semibold",
										children: [
											t.source,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "→"
											}),
											" ",
											t.destination
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-3" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-foreground",
														children: vehicleName(t.vehicleId)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground/60",
														children: vehicleModel(t.vehicleId)
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-foreground",
													children: driverName(t.driverId)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-foreground",
													children: [t.cargoKg.toLocaleString(), " kg"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ruler, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-foreground",
													children: [t.plannedKm.toLocaleString(), " km"]
												})]
											}),
											t.revenue != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium text-success",
													children: t.revenue.toLocaleString()
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifecycleBar, { status: t.status })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground/60",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }),
													"Created ",
													new Date(t.createdAt).toLocaleDateString()
												]
											}),
											t.completedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"Completed",
												" ",
												new Date(t.completedAt).toLocaleDateString()
											] }),
											t.actualKm != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"Actual: ",
												t.actualKm.toLocaleString(),
												" km"
											] })
										]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: t.status }),
								t.status === "Draft" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setActualKm(t.plannedKm);
										setDispatchConfirm(t);
									},
									className: "btn-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), " Dispatch"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										cancelTrip(t.id);
										toast.success("Trip cancelled");
									},
									className: "btn-ghost",
									title: "Cancel trip",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-4" })
								})] }),
								t.status === "Dispatched" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setCompleting(t);
										setActualKm(t.plannedKm);
										setRevenue(0);
									},
									className: "btn-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " Complete"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										cancelTrip(t.id);
										toast.success("Trip cancelled");
									},
									className: "btn-ghost",
									title: "Cancel trip",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-4" })
								})] })
							]
						})]
					})
				}, t.id)), !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground",
					children: "No trips match your filters."
				})]
			}),
			show && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				onClose: () => setShow(false),
				title: "Create new trip",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "grid grid-cols-2 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Source",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: form.source,
								onChange: (e) => setForm({
									...form,
									source: e.target.value
								}),
								className: "input",
								placeholder: "e.g. Mumbai"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Destination",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: form.destination,
								onChange: (e) => setForm({
									...form,
									destination: e.target.value
								}),
								className: "input",
								placeholder: "e.g. Pune"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `Vehicle (${availableVehicles.length} available)`,
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
								}), availableVehicles.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: v.id,
									children: [
										v.regNumber,
										" — ",
										v.model,
										" (",
										v.maxLoadKg.toLocaleString(),
										" ",
										"kg capacity)"
									]
								}, v.id))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `Driver (${availableDrivers.length} eligible)`,
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								required: true,
								value: form.driverId,
								onChange: (e) => setForm({
									...form,
									driverId: e.target.value
								}),
								className: "input",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select driver..."
								}), availableDrivers.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: d.id,
									children: [
										d.name,
										" — Cat ",
										d.licenseCategory,
										" (Score:",
										" ",
										d.safetyScore,
										")"
									]
								}, d.id))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							label: "Cargo weight (kg)",
							required: true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									required: true,
									min: 0,
									value: form.cargoKg,
									onChange: (e) => setForm({
										...form,
										cargoKg: +e.target.value
									}),
									className: "input"
								}),
								overCapacity && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-destructive",
									children: [
										"Exceeds vehicle capacity of",
										" ",
										selectedVeh?.maxLoadKg.toLocaleString(),
										" kg"
									]
								}),
								selectedVeh && !overCapacity && form.cargoKg > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [Math.round(form.cargoKg / selectedVeh.maxLoadKg * 100), "% of capacity used"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Planned distance (km)",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								required: true,
								min: 1,
								value: form.plannedKm,
								onChange: (e) => setForm({
									...form,
									plannedKm: +e.target.value
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
								disabled: overCapacity,
								className: "btn-primary disabled:opacity-50",
								children: "Create trip"
							})]
						})
					]
				})
			}),
			dispatchConfirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				onClose: () => setDispatchConfirm(null),
				title: `Dispatch: ${dispatchConfirm.source} → ${dispatchConfirm.destination}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg border border-border bg-muted/30 p-4 text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Vehicle",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono font-medium",
								children: vehicleName(dispatchConfirm.vehicleId)
							}),
							" ",
							"and driver",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: driverName(dispatchConfirm.driverId)
							}),
							" ",
							"will be set to ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "On Trip" }),
							" and removed from the available pool."
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setDispatchConfirm(null),
							className: "btn-ghost",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => doDispatch(dispatchConfirm),
							className: "btn-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), " Confirm dispatch"]
						})]
					})]
				})
			}),
			completing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				onClose: () => setCompleting(null),
				title: `Complete trip: ${completing.source} → ${completing.destination}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Actual distance (km)",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 0,
								value: actualKm,
								onChange: (e) => setActualKm(+e.target.value),
								className: "input"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Revenue collected (₹)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 0,
								value: revenue,
								onChange: (e) => setRevenue(+e.target.value),
								className: "input"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2 flex justify-end gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setCompleting(null),
								className: "btn-ghost",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									completeTrip(completing.id, actualKm, revenue);
									toast.success("Trip completed — vehicle and driver released");
									setCompleting(null);
								},
								className: "btn-primary",
								children: "Mark complete"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { TripsPage as component };
