//#region node_modules/.nitro/vite/services/ssr/assets/api-BRcpnhFT.js
var API_URL = "/api/v1";
async function fetchApi(endpoint, options = {}) {
	const token = localStorage.getItem("access_token");
	const headers = new Headers(options.headers || {});
	if (token) headers.set("Authorization", `Bearer ${token}`);
	if (!headers.has("Content-Type") && !(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
	const response = await fetch(`${API_URL}${endpoint}`, {
		...options,
		headers
	});
	if (!response.ok) {
		if (response.status === 401) localStorage.removeItem("access_token");
		const errorBody = await response.json().catch(() => ({}));
		throw new Error(errorBody.detail || `Request failed with status ${response.status}`);
	}
	if (response.status === 204) return null;
	return response.json();
}
//#endregion
export { fetchApi as t };
