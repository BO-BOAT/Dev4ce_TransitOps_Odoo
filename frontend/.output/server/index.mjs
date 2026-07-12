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
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"7d26-0RmbZHHyzaAyzwBnBbW5+/2P0ho\"",
		"mtime": "2026-07-12T10:27:23.291Z",
		"size": 32038,
		"path": "../public/favicon.ico"
	},
	"/assets/chart-column-BAwLiOZo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-elf5jYqyy2+5RWeREJnkjRYrFJ0\"",
		"mtime": "2026-07-12T10:47:59.852Z",
		"size": 251,
		"path": "../public/assets/chart-column-BAwLiOZo.js"
	},
	"/assets/api-B8oyeK_v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"349-OJ2AQzEta6F6MXnn4ebfIZebTZU\"",
		"mtime": "2026-07-12T10:47:59.852Z",
		"size": 841,
		"path": "../public/assets/api-B8oyeK_v.js"
	},
	"/assets/clock-4UpTKafj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"126-d/EKdArFhEOGfzBFgScUegqVtP4\"",
		"mtime": "2026-07-12T10:47:59.853Z",
		"size": 294,
		"path": "../public/assets/clock-4UpTKafj.js"
	},
	"/assets/createLucideIcon-C-9SBUDi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25c1-u8pDACObOCY3zdU5N2ZfyDMenj4\"",
		"mtime": "2026-07-12T10:47:59.854Z",
		"size": 9665,
		"path": "../public/assets/createLucideIcon-C-9SBUDi.js"
	},
	"/assets/indian-rupee-CG-Gwmtc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"123-hgX/31ltIIwKPJpw4Ce+k4L645g\"",
		"mtime": "2026-07-12T10:47:59.855Z",
		"size": 291,
		"path": "../public/assets/indian-rupee-CG-Gwmtc.js"
	},
	"/assets/login-fMmwsbsV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f39-mZCofmy0L+7c5PAqubbEyBkDVYw\"",
		"mtime": "2026-07-12T10:47:59.856Z",
		"size": 3897,
		"path": "../public/assets/login-fMmwsbsV.js"
	},
	"/assets/download-F6q5QeFw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8-Egy+1zCPpnHxYyx16WQzAjPeS5E\"",
		"mtime": "2026-07-12T10:47:59.854Z",
		"size": 232,
		"path": "../public/assets/download-F6q5QeFw.js"
	},
	"/assets/pen-line-BkkxPQ_G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"115-nD2diKyOjVMPp14JOR0Nc9z9Nco\"",
		"mtime": "2026-07-12T10:47:59.857Z",
		"size": 277,
		"path": "../public/assets/pen-line-BkkxPQ_G.js"
	},
	"/assets/map-pin-aORjQSmd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-LhqI+VdmcvQsDDaUizA8U97atGM\"",
		"mtime": "2026-07-12T10:47:59.857Z",
		"size": 259,
		"path": "../public/assets/map-pin-aORjQSmd.js"
	},
	"/assets/link-BeXvY_zC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b4c-QUDEDdjCDDYnnqd98/rbhYjGR30\"",
		"mtime": "2026-07-12T10:47:59.855Z",
		"size": 23372,
		"path": "../public/assets/link-BeXvY_zC.js"
	},
	"/assets/react-dom-0y-RqM7w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ddf-aEt+cEEd+057OShdpqiw5nLSrwA\"",
		"mtime": "2026-07-12T10:47:59.859Z",
		"size": 3551,
		"path": "../public/assets/react-dom-0y-RqM7w.js"
	},
	"/assets/plus-DrmuZ21c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-lleqsdnWSyLXJffA6mEhnDclKt0\"",
		"mtime": "2026-07-12T10:47:59.859Z",
		"size": 153,
		"path": "../public/assets/plus-DrmuZ21c.js"
	},
	"/assets/route-w1HtMzYh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe-nNuQthLH54tjdVfzEr7UK/vHMVc\"",
		"mtime": "2026-07-12T10:47:59.860Z",
		"size": 254,
		"path": "../public/assets/route-w1HtMzYh.js"
	},
	"/assets/receipt-DDreuILz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"124-6CRJKh9JBu0udKPNs1NCrvCjYAg\"",
		"mtime": "2026-07-12T10:47:59.860Z",
		"size": 292,
		"path": "../public/assets/receipt-DDreuILz.js"
	},
	"/assets/index-smlyGl4I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"575cc-zU7AjuOGVj4ekr9L54q2I2NmGNc\"",
		"mtime": "2026-07-12T10:47:59.844Z",
		"size": 357836,
		"path": "../public/assets/index-smlyGl4I.js"
	},
	"/assets/trash-2-C4m2XmZs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-JoFuN/GVTAKxVbygwWQuFiOb+DY\"",
		"mtime": "2026-07-12T10:47:59.862Z",
		"size": 328,
		"path": "../public/assets/trash-2-C4m2XmZs.js"
	},
	"/assets/routes-DxYRfSnf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1307-akJ8DfuxRKvCMWLKr49JM83Ahss\"",
		"mtime": "2026-07-12T10:47:59.861Z",
		"size": 4871,
		"path": "../public/assets/routes-DxYRfSnf.js"
	},
	"/assets/triangle-alert-BaMAvUgh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-8cm18HNtZTKRTqhS9hAxwwPfUDo\"",
		"mtime": "2026-07-12T10:47:59.864Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-BaMAvUgh.js"
	},
	"/assets/trending-up-BAadGm0t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ba-1untRakELvpQpNnDaL5WlsbKC0c\"",
		"mtime": "2026-07-12T10:47:59.863Z",
		"size": 442,
		"path": "../public/assets/trending-up-BAadGm0t.js"
	},
	"/assets/truck-CKPuiWZ6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196-L7Vy232DnguX/mJq6kO9rmL3YFc\"",
		"mtime": "2026-07-12T10:47:59.864Z",
		"size": 406,
		"path": "../public/assets/truck-CKPuiWZ6.js"
	},
	"/assets/users-BtBK4AuU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-B5MF+2/FVkBirIZZLFbZwmSi3jU\"",
		"mtime": "2026-07-12T10:47:59.865Z",
		"size": 306,
		"path": "../public/assets/users-BtBK4AuU.js"
	},
	"/assets/styles-Dmr_g-uK.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"16bdc-B52QW/qvohhGn4flc7GEjmnza2M\"",
		"mtime": "2026-07-12T10:47:59.866Z",
		"size": 93148,
		"path": "../public/assets/styles-Dmr_g-uK.css"
	},
	"/assets/wrench-BMAg-Wwc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f-EvTNh+xD76UbNaZdccXVDeiZvwo\"",
		"mtime": "2026-07-12T10:47:59.865Z",
		"size": 303,
		"path": "../public/assets/wrench-BMAg-Wwc.js"
	},
	"/assets/PieChart-DKQxjuCJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"609c9-4he7qJM9O/pILcdE5a+eFxectck\"",
		"mtime": "2026-07-12T10:47:59.845Z",
		"size": 395721,
		"path": "../public/assets/PieChart-DKQxjuCJ.js"
	},
	"/assets/_app-DL6mHpDQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1adf-TrBhRIcmzAoj0ngJ1m/uAQwVofQ\"",
		"mtime": "2026-07-12T10:47:59.846Z",
		"size": 6879,
		"path": "../public/assets/_app-DL6mHpDQ.js"
	},
	"/assets/_app.dashboard-B_b_82Kw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1adc-bWqSGm8JKF0KSf5EmPSELAOWxb0\"",
		"mtime": "2026-07-12T10:47:59.847Z",
		"size": 6876,
		"path": "../public/assets/_app.dashboard-B_b_82Kw.js"
	},
	"/assets/_app.drivers-B9JRfPC7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1720-33aOKhPiWPpYbG9pB2eNvPXVoEU\"",
		"mtime": "2026-07-12T10:47:59.847Z",
		"size": 5920,
		"path": "../public/assets/_app.drivers-B9JRfPC7.js"
	},
	"/assets/_app.expenses-N6VjpVbx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24ba-cLH7o86Y+AmtoY3gpOSDUs1lK7U\"",
		"mtime": "2026-07-12T10:47:59.848Z",
		"size": 9402,
		"path": "../public/assets/_app.expenses-N6VjpVbx.js"
	},
	"/assets/_app.maintenance-BxOGQLnc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a46-U1+EPCosGtjCqA14smrHcmafVRI\"",
		"mtime": "2026-07-12T10:47:59.848Z",
		"size": 6726,
		"path": "../public/assets/_app.maintenance-BxOGQLnc.js"
	},
	"/assets/_app.mongodb-demo-CF1aipj6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d3-FFxYK+EOhP/ffqMF0TFVF2z/LSU\"",
		"mtime": "2026-07-12T10:47:59.849Z",
		"size": 6099,
		"path": "../public/assets/_app.mongodb-demo-CF1aipj6.js"
	},
	"/assets/_app.reports-BSPcaF2n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8700-KRE9C+o/mlVdvxb7ZMfkIG1A3Jk\"",
		"mtime": "2026-07-12T10:47:59.850Z",
		"size": 34560,
		"path": "../public/assets/_app.reports-BSPcaF2n.js"
	},
	"/assets/_app.trips-BzxteXRw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"313a-RGoCEyV4GSGus+bej5SnyHcUJe4\"",
		"mtime": "2026-07-12T10:47:59.850Z",
		"size": 12602,
		"path": "../public/assets/_app.trips-BzxteXRw.js"
	},
	"/assets/_app.vehicles-Co4_HGqO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"230a-ce+JMtjs0cZCsfqFtekAomxhhTc\"",
		"mtime": "2026-07-12T10:47:59.851Z",
		"size": 8970,
		"path": "../public/assets/_app.vehicles-Co4_HGqO.js"
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
