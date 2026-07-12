globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/chart-column-Blfh_5KT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-8fFBYWEv+SkAMD9iw41LIRW1iQE\"",
		"mtime": "2026-07-12T09:10:28.870Z",
		"size": 251,
		"path": "../public/assets/chart-column-Blfh_5KT.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-07-12T08:42:50.509Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/clock-KVpqqz0c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"126-ttZA6rb6iD3mSq8YqbM8xyBdIgk\"",
		"mtime": "2026-07-12T09:10:28.870Z",
		"size": 294,
		"path": "../public/assets/clock-KVpqqz0c.js"
	},
	"/assets/createLucideIcon-Cx-0z4yO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"499b-3b6SOqb9nl4/ki8taRBcg1R+EXg\"",
		"mtime": "2026-07-12T09:10:28.871Z",
		"size": 18843,
		"path": "../public/assets/createLucideIcon-Cx-0z4yO.js"
	},
	"/assets/download-BRjsXG2-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8-vBrEtjz0J2Mq05qvmEcUojmFCG4\"",
		"mtime": "2026-07-12T09:10:28.872Z",
		"size": 232,
		"path": "../public/assets/download-BRjsXG2-.js"
	},
	"/assets/indian-rupee-DPa8mZCz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"123-0UmwbNqKX2+3YkdxQtq6pQBLkkQ\"",
		"mtime": "2026-07-12T09:10:28.872Z",
		"size": 291,
		"path": "../public/assets/indian-rupee-DPa8mZCz.js"
	},
	"/assets/link-D08prCYd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c39-T90TrFyarvUIbPx8LppiBjqSMk0\"",
		"mtime": "2026-07-12T09:10:28.873Z",
		"size": 23609,
		"path": "../public/assets/link-D08prCYd.js"
	},
	"/assets/login-0REani5R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e94-/RluhvQuiYc/o5WacqqoFIfiqJM\"",
		"mtime": "2026-07-12T09:10:28.873Z",
		"size": 3732,
		"path": "../public/assets/login-0REani5R.js"
	},
	"/assets/map-pin-nJXhVgQQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-vCXeSdGi07kFzPrPjgG/CB+di8I\"",
		"mtime": "2026-07-12T09:10:28.873Z",
		"size": 259,
		"path": "../public/assets/map-pin-nJXhVgQQ.js"
	},
	"/assets/plus-Ci9bYOix.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-Yz8moTferGrLvCwdiEZtnjDa/3k\"",
		"mtime": "2026-07-12T09:10:28.874Z",
		"size": 153,
		"path": "../public/assets/plus-Ci9bYOix.js"
	},
	"/assets/receipt-DerAsOgW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"124-bd0Fh8D488S+pEBjYu51eemil5I\"",
		"mtime": "2026-07-12T09:10:28.875Z",
		"size": 292,
		"path": "../public/assets/receipt-DerAsOgW.js"
	},
	"/assets/route-CH6KMrm0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe-1OUOEd2elWKfSvqNp6PNXXShlUY\"",
		"mtime": "2026-07-12T09:10:28.875Z",
		"size": 254,
		"path": "../public/assets/route-CH6KMrm0.js"
	},
	"/assets/routes-RwUi5Pem.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1349-dRWVFC6lgGd/eYO+PPQ9wAxnwh8\"",
		"mtime": "2026-07-12T09:10:28.876Z",
		"size": 4937,
		"path": "../public/assets/routes-RwUi5Pem.js"
	},
	"/assets/trash-2-DihOB85l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"228-58FZJEiPp648yHAkUTmHQHNPPls\"",
		"mtime": "2026-07-12T09:10:28.877Z",
		"size": 552,
		"path": "../public/assets/trash-2-DihOB85l.js"
	},
	"/assets/styles-CaFJcBo7.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"16955-OzQrhsZwGSdSsMjlHsLhEgxdF9w\"",
		"mtime": "2026-07-12T09:10:28.880Z",
		"size": 92501,
		"path": "../public/assets/styles-CaFJcBo7.css"
	},
	"/assets/react-dom-DCHkHaTk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ddf-xZw9pG/3EsMsRIeaM+h7Jvgb/gg\"",
		"mtime": "2026-07-12T09:10:28.874Z",
		"size": 3551,
		"path": "../public/assets/react-dom-DCHkHaTk.js"
	},
	"/assets/trending-up-DOVUOW9O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ba-gqIGCNXPXfDQaLNgkvbjzJoUxy0\"",
		"mtime": "2026-07-12T09:10:28.878Z",
		"size": 442,
		"path": "../public/assets/trending-up-DOVUOW9O.js"
	},
	"/assets/triangle-alert-CSXUyQdf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-JR+9a7zBUkA1ruQPFoLv3IGBAzg\"",
		"mtime": "2026-07-12T09:10:28.878Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-CSXUyQdf.js"
	},
	"/assets/index-VIDoPG0_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54f40-1cg/uOwCcm3xJBVazeVeaSxI7qI\"",
		"mtime": "2026-07-12T09:10:28.861Z",
		"size": 347968,
		"path": "../public/assets/index-VIDoPG0_.js"
	},
	"/assets/wrench-CNiE58Hv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f-H2Cl1l0ZI7yngLInKMoJJm3iO9A\"",
		"mtime": "2026-07-12T09:10:28.880Z",
		"size": 303,
		"path": "../public/assets/wrench-CNiE58Hv.js"
	},
	"/assets/users-CaSbORNL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-oOnfvX//MjRRqjowXGvDboC9x7I\"",
		"mtime": "2026-07-12T09:10:28.879Z",
		"size": 306,
		"path": "../public/assets/users-CaSbORNL.js"
	},
	"/assets/_app-CVmOxX5U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c1c-cZpw2tNHrJ8z4gX7RDxVTDxpqZY\"",
		"mtime": "2026-07-12T09:10:28.863Z",
		"size": 7196,
		"path": "../public/assets/_app-CVmOxX5U.js"
	},
	"/assets/truck-DUEarzen.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196-2Jqht5D7RNuA+FIp6YUD2V+KyIE\"",
		"mtime": "2026-07-12T09:10:28.879Z",
		"size": 406,
		"path": "../public/assets/truck-DUEarzen.js"
	},
	"/assets/_app.dashboard-CquXcN-C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ab6-210WIKLXOjdAP9/cGYTvtuHSJIE\"",
		"mtime": "2026-07-12T09:10:28.867Z",
		"size": 6838,
		"path": "../public/assets/_app.dashboard-CquXcN-C.js"
	},
	"/assets/PieChart-DGqHCq-w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"609ce-7A/FYNQYGC+ZURt+7Fm5Gg81DHY\"",
		"mtime": "2026-07-12T09:10:28.862Z",
		"size": 395726,
		"path": "../public/assets/PieChart-DGqHCq-w.js"
	},
	"/assets/_app.drivers-DFkFcfjD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1701-D8aVFuvxjLAvOLe6ImP3eIJqFyk\"",
		"mtime": "2026-07-12T09:10:28.867Z",
		"size": 5889,
		"path": "../public/assets/_app.drivers-DFkFcfjD.js"
	},
	"/assets/_app.expenses-Bqm53TM9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24ba-pCF5rbeOTDodnfhHyKz7dGozbEo\"",
		"mtime": "2026-07-12T09:10:28.867Z",
		"size": 9402,
		"path": "../public/assets/_app.expenses-Bqm53TM9.js"
	},
	"/assets/_app.maintenance-CpO1NKXY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a4b-/fCj6O82VZ94ghNNe31hx437F0M\"",
		"mtime": "2026-07-12T09:10:28.868Z",
		"size": 6731,
		"path": "../public/assets/_app.maintenance-CpO1NKXY.js"
	},
	"/assets/_app.trips-DPWCBYOJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3143-MIYfweWrbRI+m7+poG1PHMp4joo\"",
		"mtime": "2026-07-12T09:10:28.869Z",
		"size": 12611,
		"path": "../public/assets/_app.trips-DPWCBYOJ.js"
	},
	"/assets/_app.reports-GUSpNKFV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8699-JPEBM6P0rl5LUPY6YmZNIAydO6g\"",
		"mtime": "2026-07-12T09:10:28.869Z",
		"size": 34457,
		"path": "../public/assets/_app.reports-GUSpNKFV.js"
	},
	"/assets/_app.vehicles-CP6rjHt2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22e1-K9HbvX6N2It5G0z2oE9aTE2ZZug\"",
		"mtime": "2026-07-12T09:10:28.870Z",
		"size": 8929,
		"path": "../public/assets/_app.vehicles-CP6rjHt2.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_akI5kQ = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_akI5kQ
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
